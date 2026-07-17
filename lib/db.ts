import { createClient, type Client, type InValue } from "@libsql/client";
import { existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";
import {
  designToJson,
  parseDesignJson,
  type SavedQrDesign,
} from "@/lib/qr/design";

/**
 * libSQL-backed store for dynamic QR codes and scan analytics.
 *
 * - Local / self-hosted: set nothing (or DATABASE_PATH) → uses a SQLite file.
 * - Serverless (Vercel): set TURSO_DATABASE_URL + TURSO_AUTH_TOKEN → hosted Turso.
 *
 * Same SQL either way; only the connection differs.
 */

let client: Client | null = null;
let schemaReady: Promise<void> | null = null;

function buildClient(): Client {
  const tursoUrl = process.env.TURSO_DATABASE_URL;
  if (tursoUrl) {
    return createClient({
      url: tursoUrl,
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }

  // Local file mode.
  const path = process.env.DATABASE_PATH ?? "data/vyntrix.db";
  const dir = dirname(path);
  if (dir && dir !== "." && !existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  const fileUrl = path.startsWith("file:")
    ? path
    : `file:${path.replace(/\\/g, "/")}`;
  return createClient({ url: fileUrl });
}

async function initSchema(c: Client): Promise<void> {
  // Run statements individually so a single failure doesn't hide the rest
  // (Turso/libSQL executeMultiple can be finicky across cold starts).
  const statements = [
    `CREATE TABLE IF NOT EXISTS qr_codes (
      slug         TEXT PRIMARY KEY,
      destination  TEXT NOT NULL,
      title        TEXT,
      edit_token   TEXT NOT NULL,
      user_id      TEXT,
      design       TEXT,
      created_at   INTEGER NOT NULL,
      updated_at   INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS scans (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      slug     TEXT NOT NULL,
      ts       INTEGER NOT NULL,
      device   TEXT,
      os       TEXT,
      browser  TEXT,
      referer  TEXT,
      country  TEXT
    )`,
    `CREATE TABLE IF NOT EXISTS subscriptions (
      user_id             TEXT PRIMARY KEY,
      email               TEXT,
      ls_customer_id      TEXT,
      ls_subscription_id  TEXT,
      variant_id          TEXT,
      status              TEXT NOT NULL,
      renews_at           INTEGER,
      ends_at             INTEGER,
      customer_portal_url TEXT,
      updated_at          INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS users (
      id            TEXT PRIMARY KEY,
      email         TEXT,
      name          TEXT,
      image_url     TEXT,
      studio_state  TEXT,
      studio_updated_at INTEGER,
      created_at    INTEGER NOT NULL,
      last_seen_at  INTEGER NOT NULL
    )`,
    `CREATE TABLE IF NOT EXISTS projects (
      id            TEXT PRIMARY KEY,
      user_id       TEXT NOT NULL,
      name          TEXT NOT NULL,
      kind          TEXT NOT NULL DEFAULT 'folder',
      content_type  TEXT NOT NULL DEFAULT 'folder',
      fields_json   TEXT NOT NULL DEFAULT '{}',
      design_json   TEXT NOT NULL DEFAULT '{}',
      dynamic_slug  TEXT,
      created_at    INTEGER NOT NULL,
      updated_at    INTEGER NOT NULL
    )`,
    `CREATE INDEX IF NOT EXISTS idx_scans_slug ON scans(slug)`,
    `CREATE INDEX IF NOT EXISTS idx_scans_ts ON scans(ts)`,
    `CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)`,
    `CREATE INDEX IF NOT EXISTS idx_projects_user ON projects(user_id)`,
  ];

  for (const sql of statements) {
    await c.execute(sql);
  }

  // Existing Turso DBs were created before user_id / design / project_id existed.
  // CREATE TABLE IF NOT EXISTS does not add columns to an existing table.
  await ensureColumn(c, "qr_codes", "user_id", "TEXT");
  await ensureColumn(c, "qr_codes", "design", "TEXT");
  await ensureColumn(c, "qr_codes", "project_id", "TEXT");
  await ensureColumn(c, "qr_codes", "content_type", "TEXT");
  await ensureColumn(c, "qr_codes", "payload", "TEXT");
  await ensureColumn(c, "users", "studio_state", "TEXT");
  await ensureColumn(c, "users", "studio_updated_at", "INTEGER");
  await c.execute(
    "CREATE INDEX IF NOT EXISTS idx_qr_user ON qr_codes(user_id)",
  );
  await c.execute(
    "CREATE INDEX IF NOT EXISTS idx_qr_project ON qr_codes(project_id)",
  );
  await c.execute(
    "CREATE INDEX IF NOT EXISTS idx_users_email ON users(email)",
  );
  await c.execute(
    "CREATE INDEX IF NOT EXISTS idx_projects_user ON projects(user_id)",
  );
}

/** Add a column if missing. Ignores "duplicate column" errors (already present). */
async function ensureColumn(
  c: Client,
  table: string,
  column: string,
  type: string,
): Promise<void> {
  try {
    const cols = await c.execute(`PRAGMA table_info(${table})`);
    const exists = cols.rows.some(
      (r) => String(r.name).toLowerCase() === column.toLowerCase(),
    );
    if (exists) return;
  } catch {
    // If PRAGMA fails, fall through and try ALTER anyway.
  }

  try {
    await c.execute(`ALTER TABLE ${table} ADD COLUMN ${column} ${type}`);
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    // Already migrated on a parallel cold start.
    if (/duplicate column|already exists/i.test(msg)) return;
    throw e;
  }
}

async function getClient(): Promise<Client> {
  if (!client) client = buildClient();
  if (!schemaReady) {
    schemaReady = initSchema(client).catch((err) => {
      // Allow the next request to retry schema setup after a transient failure.
      schemaReady = null;
      throw err;
    });
  }
  await schemaReady;
  return client;
}

export interface QrCodeRow {
  slug: string;
  destination: string;
  title: string | null;
  edit_token: string;
  user_id: string | null;
  /** Studio look snapshot (pattern, colors, frame, etc.). Null for legacy rows. */
  design: SavedQrDesign | null;
  /** Optional project folder this code belongs to. */
  project_id: string | null;
  /** `url` (redirect) or `wifi` (landing page). */
  content_type: "url" | "wifi";
  /** JSON payload for non-URL types (e.g. WiFi credentials). */
  payload: string | null;
  created_at: number;
  updated_at: number;
}

export interface CreateQrInput {
  slug: string;
  destination: string;
  title: string | null;
  editToken: string;
  userId?: string | null;
  design?: SavedQrDesign | null;
  projectId?: string | null;
  contentType?: "url" | "wifi";
  payload?: string | null;
}

export interface SubscriptionRow {
  user_id: string;
  email: string | null;
  ls_customer_id: string | null;
  ls_subscription_id: string | null;
  variant_id: string | null;
  status: string;
  renews_at: number | null;
  ends_at: number | null;
  customer_portal_url: string | null;
  updated_at: number;
}

export interface ScanInput {
  slug: string;
  ts: number;
  device: string | null;
  os: string | null;
  browser: string | null;
  referer: string | null;
  country: string | null;
}

type Bucket = { name: string; count: number };

export interface Analytics {
  total: number;
  byDay: { date: string; count: number }[];
  byDevice: Bucket[];
  byBrowser: Bucket[];
  byOs: Bucket[];
  recent: {
    ts: number;
    device: string | null;
    os: string | null;
    browser: string | null;
    country: string | null;
  }[];
}

const num = (v: unknown): number => Number(v ?? 0);
const str = (v: unknown): string | null => (v == null ? null : String(v));

export async function slugExists(slug: string): Promise<boolean> {
  const db = await getClient();
  const res = await db.execute({
    sql: "SELECT 1 FROM qr_codes WHERE slug = ? LIMIT 1",
    args: [slug],
  });
  return res.rows.length > 0;
}

export async function createQrCode(input: CreateQrInput): Promise<void> {
  const db = await getClient();
  const now = Date.now();
  await db.execute({
    sql: `INSERT INTO qr_codes (slug, destination, title, edit_token, user_id, design, project_id, content_type, payload, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      input.slug,
      input.destination,
      input.title,
      input.editToken,
      input.userId ?? null,
      designToJson(input.design ?? null),
      input.projectId ?? null,
      input.contentType ?? "url",
      input.payload ?? null,
      now,
      now,
    ],
  });
}

function mapQrRow(r: Record<string, unknown>): QrCodeRow {
  return {
    slug: String(r.slug),
    destination: String(r.destination),
    title: str(r.title),
    edit_token: String(r.edit_token),
    user_id: str(r.user_id),
    design: parseDesignJson(str(r.design)),
    project_id: str(r.project_id),
    content_type: r.content_type === "wifi" ? "wifi" : "url",
    payload: str(r.payload),
    created_at: num(r.created_at),
    updated_at: num(r.updated_at),
  };
}

export async function getQrCode(slug: string): Promise<QrCodeRow | null> {
  const db = await getClient();
  const res = await db.execute({
    sql: "SELECT * FROM qr_codes WHERE slug = ?",
    args: [slug],
  });
  const r = res.rows[0];
  if (!r) return null;
  return mapQrRow(r as unknown as Record<string, unknown>);
}

/** All dynamic codes owned by a user, newest first. */
export async function listQrCodesByUser(userId: string): Promise<QrCodeRow[]> {
  const db = await getClient();
  const res = await db.execute({
    sql: "SELECT * FROM qr_codes WHERE user_id = ? ORDER BY created_at DESC",
    args: [userId],
  });
  return res.rows.map((r) => mapQrRow(r as unknown as Record<string, unknown>));
}

/** Number of dynamic codes a user currently owns (for quota checks). */
export async function countQrCodesByUser(userId: string): Promise<number> {
  const db = await getClient();
  const res = await db.execute({
    sql: "SELECT COUNT(*) c FROM qr_codes WHERE user_id = ?",
    args: [userId],
  });
  return num(res.rows[0]?.c);
}

/** Assign ownership of an (unowned) code to a user. Returns true if claimed. */
export async function setQrOwner(
  slug: string,
  editToken: string,
  userId: string,
): Promise<boolean> {
  const db = await getClient();
  const res = await db.execute({
    sql: `UPDATE qr_codes SET user_id = ?, updated_at = ?
          WHERE slug = ? AND edit_token = ? AND (user_id IS NULL OR user_id = ?)`,
    args: [userId, Date.now(), slug, editToken, userId],
  });
  return res.rowsAffected > 0;
}

export async function updateQrCode(
  slug: string,
  destination: string,
  title: string | null,
  design?: SavedQrDesign | null,
  payload?: string | null,
): Promise<void> {
  const db = await getClient();
  const now = Date.now();
  if (design !== undefined && payload !== undefined) {
    await db.execute({
      sql: "UPDATE qr_codes SET destination = ?, title = ?, design = ?, payload = ?, updated_at = ? WHERE slug = ?",
      args: [destination, title, designToJson(design), payload, now, slug],
    });
    return;
  }
  if (design !== undefined) {
    await db.execute({
      sql: "UPDATE qr_codes SET destination = ?, title = ?, design = ?, updated_at = ? WHERE slug = ?",
      args: [destination, title, designToJson(design), now, slug],
    });
    return;
  }
  if (payload !== undefined) {
    await db.execute({
      sql: "UPDATE qr_codes SET destination = ?, title = ?, payload = ?, updated_at = ? WHERE slug = ?",
      args: [destination, title, payload, now, slug],
    });
    return;
  }
  await db.execute({
    sql: "UPDATE qr_codes SET destination = ?, title = ?, updated_at = ? WHERE slug = ?",
    args: [destination, title, now, slug],
  });
}

/**
 * Rename a dynamic code's short slug. Updates the primary key and all related
 * scan rows so analytics history follows the new link.
 */
export async function renameQrCode(
  oldSlug: string,
  newSlug: string,
): Promise<void> {
  const db = await getClient();
  const now = Date.now();
  // Insert a copy under the new slug, move scans, then delete the old row.
  // Works across libSQL/Turso without relying on FK cascade.
  const existing = await getQrCode(oldSlug);
  if (!existing) throw new Error("Not found.");
  if (await slugExists(newSlug)) throw new Error("Slug taken.");

  await db.execute({
    sql: `INSERT INTO qr_codes (slug, destination, title, edit_token, user_id, design, project_id, content_type, payload, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      newSlug,
      existing.destination,
      existing.title,
      existing.edit_token,
      existing.user_id,
      designToJson(existing.design),
      existing.project_id,
      existing.content_type,
      existing.payload,
      existing.created_at,
      now,
    ],
  });
  await db.execute({
    sql: "UPDATE scans SET slug = ? WHERE slug = ?",
    args: [newSlug, oldSlug],
  });
  await db.execute({
    sql: "DELETE FROM qr_codes WHERE slug = ?",
    args: [oldSlug],
  });
}

export async function deleteQrCode(slug: string): Promise<void> {
  const db = await getClient();
  await db.execute({ sql: "DELETE FROM qr_codes WHERE slug = ?", args: [slug] });
  await db.execute({ sql: "DELETE FROM scans WHERE slug = ?", args: [slug] });
}

export async function insertScan(input: ScanInput): Promise<void> {
  const db = await getClient();
  const args: InValue[] = [
    input.slug,
    input.ts,
    input.device,
    input.os,
    input.browser,
    input.referer,
    input.country,
  ];
  await db.execute({
    sql: `INSERT INTO scans (slug, ts, device, os, browser, referer, country)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args,
  });
}

/**
 * Scan analytics for a code. When `windowDays` is set (free plan), only scans
 * within that trailing window are counted and the daily chart spans that range.
 */
export async function getAnalytics(
  slug: string,
  windowDays?: number,
): Promise<Analytics> {
  const db = await getClient();

  const days = windowDays && windowDays > 0 ? windowDays : 30;
  const cutoff =
    windowDays && windowDays > 0 ? Date.now() - windowDays * 86_400_000 : 0;
  const tsFilter = cutoff > 0 ? " AND ts >= ?" : "";
  const withCutoff = (extra: InValue[] = []): InValue[] =>
    cutoff > 0 ? [slug, cutoff, ...extra] : [slug, ...extra];

  const totalRes = await db.execute({
    sql: `SELECT COUNT(*) c FROM scans WHERE slug = ?${tsFilter}`,
    args: withCutoff(),
  });
  const total = num(totalRes.rows[0]?.c);

  const daysRes = await db.execute({
    sql: `SELECT date(ts / 1000, 'unixepoch') d, COUNT(*) c
          FROM scans WHERE slug = ?${tsFilter} GROUP BY d ORDER BY d`,
    args: withCutoff(),
  });
  const dayMap = new Map(
    daysRes.rows.map((r) => [String(r.d), num(r.c)] as const),
  );
  const byDay: { date: string; count: number }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    byDay.push({ date: key, count: dayMap.get(key) ?? 0 });
  }

  const group = async (col: string): Promise<Bucket[]> => {
    const res = await db.execute({
      sql: `SELECT COALESCE(${col}, 'Unknown') name, COUNT(*) count
            FROM scans WHERE slug = ?${tsFilter} GROUP BY name ORDER BY count DESC`,
      args: withCutoff(),
    });
    return res.rows.map((r) => ({ name: String(r.name), count: num(r.count) }));
  };

  const [byDevice, byBrowser, byOs] = await Promise.all([
    group("device"),
    group("browser"),
    group("os"),
  ]);

  const recentRes = await db.execute({
    sql: `SELECT ts, device, os, browser, country
          FROM scans WHERE slug = ?${tsFilter} ORDER BY ts DESC LIMIT 25`,
    args: withCutoff(),
  });
  const recent = recentRes.rows.map((r) => ({
    ts: num(r.ts),
    device: str(r.device),
    os: str(r.os),
    browser: str(r.browser),
    country: str(r.country),
  }));

  return { total, byDay, byDevice, byBrowser, byOs, recent };
}

/** All scan rows for a code (Pro CSV export). */
export async function getAllScans(slug: string): Promise<ScanInput[]> {
  const db = await getClient();
  const res = await db.execute({
    sql: `SELECT slug, ts, device, os, browser, referer, country
          FROM scans WHERE slug = ? ORDER BY ts DESC`,
    args: [slug],
  });
  return res.rows.map((r) => ({
    slug: String(r.slug),
    ts: num(r.ts),
    device: str(r.device),
    os: str(r.os),
    browser: str(r.browser),
    referer: str(r.referer),
    country: str(r.country),
  }));
}

/* -------------------------------------------------------------------------- */
/* Users (signed-in accounts — record keeping)                                */
/* -------------------------------------------------------------------------- */

export interface AppUserRow {
  id: string;
  email: string | null;
  name: string | null;
  image_url: string | null;
  studio_state: string | null;
  studio_updated_at: number | null;
  created_at: number;
  last_seen_at: number;
}

export interface UpsertAppUserInput {
  id: string;
  email?: string | null;
  name?: string | null;
  imageUrl?: string | null;
}

/** Insert or refresh a signed-in user. Always bumps last_seen_at. */
export async function upsertAppUser(
  input: UpsertAppUserInput,
): Promise<AppUserRow> {
  const db = await getClient();
  const now = Date.now();
  await db.execute({
    sql: `INSERT INTO users (id, email, name, image_url, created_at, last_seen_at)
          VALUES (?, ?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            email = COALESCE(excluded.email, users.email),
            name = COALESCE(excluded.name, users.name),
            image_url = COALESCE(excluded.image_url, users.image_url),
            last_seen_at = excluded.last_seen_at`,
    args: [
      input.id,
      input.email ?? null,
      input.name ?? null,
      input.imageUrl ?? null,
      now,
      now,
    ],
  });
  const row = await getAppUser(input.id);
  if (!row) throw new Error("Failed to upsert user.");
  return row;
}

export async function getAppUser(id: string): Promise<AppUserRow | null> {
  const db = await getClient();
  const res = await db.execute({
    sql: "SELECT * FROM users WHERE id = ?",
    args: [id],
  });
  const r = res.rows[0];
  if (!r) return null;
  return {
    id: String(r.id),
    email: str(r.email),
    name: str(r.name),
    image_url: str(r.image_url),
    studio_state: str(r.studio_state),
    studio_updated_at:
      r.studio_updated_at == null ? null : num(r.studio_updated_at),
    created_at: num(r.created_at),
    last_seen_at: num(r.last_seen_at),
  };
}

export async function saveUserStudioState(
  userId: string,
  stateJson: string,
  updatedAt: number,
): Promise<void> {
  const db = await getClient();
  // Ensure a users row exists (webhook/sign-in may have created it already).
  await db.execute({
    sql: `INSERT INTO users (id, created_at, last_seen_at, studio_state, studio_updated_at)
          VALUES (?, ?, ?, ?, ?)
          ON CONFLICT(id) DO UPDATE SET
            studio_state = excluded.studio_state,
            studio_updated_at = excluded.studio_updated_at,
            last_seen_at = excluded.last_seen_at`,
    args: [userId, updatedAt, updatedAt, stateJson, updatedAt],
  });
}

/* -------------------------------------------------------------------------- */
/* Projects (folders that group dynamic QR codes)                             */
/* -------------------------------------------------------------------------- */

export interface ProjectRow {
  id: string;
  user_id: string;
  name: string;
  created_at: number;
  updated_at: number;
}

export interface CreateProjectInput {
  id: string;
  userId: string;
  name: string;
}

export async function createProject(
  input: CreateProjectInput,
): Promise<ProjectRow> {
  const db = await getClient();
  const now = Date.now();
  // Legacy columns (kind/content/…) stay for older Turso schemas; new rows
  // are plain folders.
  await db.execute({
    sql: `INSERT INTO projects
            (id, user_id, name, kind, content_type, fields_json, design_json,
             dynamic_slug, created_at, updated_at)
          VALUES (?, ?, ?, 'folder', 'folder', '{}', '{}', NULL, ?, ?)`,
    args: [input.id, input.userId, input.name.slice(0, 80), now, now],
  });
  const row = await getProject(input.id);
  if (!row) throw new Error("Failed to create project.");
  return row;
}

export async function renameProject(
  id: string,
  userId: string,
  name: string,
): Promise<ProjectRow | null> {
  const existing = await getProject(id);
  if (!existing || existing.user_id !== userId) return null;
  const db = await getClient();
  await db.execute({
    sql: "UPDATE projects SET name = ?, updated_at = ? WHERE id = ? AND user_id = ?",
    args: [name.slice(0, 80), Date.now(), id, userId],
  });
  return getProject(id);
}

export async function touchProject(id: string): Promise<void> {
  const db = await getClient();
  await db.execute({
    sql: "UPDATE projects SET updated_at = ? WHERE id = ?",
    args: [Date.now(), id],
  });
}

export async function getProject(id: string): Promise<ProjectRow | null> {
  const db = await getClient();
  const res = await db.execute({
    sql: "SELECT * FROM projects WHERE id = ?",
    args: [id],
  });
  const r = res.rows[0];
  if (!r) return null;
  return mapProject(r as unknown as Record<string, unknown>);
}

export async function listProjectsByUser(
  userId: string,
): Promise<ProjectRow[]> {
  const db = await getClient();
  // One-time soft migration: old snapshot projects stored a single dynamic_slug.
  await migrateLegacyProjectSlugs(userId);
  const res = await db.execute({
    sql: "SELECT * FROM projects WHERE user_id = ? ORDER BY updated_at DESC",
    args: [userId],
  });
  return res.rows.map((r) =>
    mapProject(r as unknown as Record<string, unknown>),
  );
}

/** Move codes from legacy project.dynamic_slug into qr_codes.project_id. */
async function migrateLegacyProjectSlugs(userId: string): Promise<void> {
  const db = await getClient();
  let res;
  try {
    res = await db.execute({
      sql: `SELECT id, dynamic_slug FROM projects
            WHERE user_id = ? AND dynamic_slug IS NOT NULL AND dynamic_slug != ''`,
      args: [userId],
    });
  } catch {
    return;
  }
  for (const r of res.rows) {
    const projectId = String(r.id);
    const slug = String(r.dynamic_slug);
    await db.execute({
      sql: `UPDATE qr_codes SET project_id = ?, updated_at = ?
            WHERE slug = ? AND user_id = ? AND (project_id IS NULL OR project_id = '')`,
      args: [projectId, Date.now(), slug, userId],
    });
    await db.execute({
      sql: "UPDATE projects SET dynamic_slug = NULL, kind = 'folder', updated_at = ? WHERE id = ?",
      args: [Date.now(), projectId],
    });
  }
}

export async function countProjectsByUser(userId: string): Promise<number> {
  const db = await getClient();
  const res = await db.execute({
    sql: "SELECT COUNT(*) c FROM projects WHERE user_id = ?",
    args: [userId],
  });
  return num(res.rows[0]?.c);
}

/** Delete folder only — codes are unassigned, not deleted. */
export async function deleteProject(
  id: string,
  userId: string,
): Promise<boolean> {
  const db = await getClient();
  await db.execute({
    sql: "UPDATE qr_codes SET project_id = NULL, updated_at = ? WHERE project_id = ? AND user_id = ?",
    args: [Date.now(), id, userId],
  });
  const res = await db.execute({
    sql: "DELETE FROM projects WHERE id = ? AND user_id = ?",
    args: [id, userId],
  });
  return res.rowsAffected > 0;
}

export async function listQrCodesByProject(
  projectId: string,
): Promise<QrCodeRow[]> {
  const db = await getClient();
  const res = await db.execute({
    sql: "SELECT * FROM qr_codes WHERE project_id = ? ORDER BY created_at DESC",
    args: [projectId],
  });
  return res.rows.map((r) => mapQrRow(r as unknown as Record<string, unknown>));
}

/**
 * Assign (or unassign) a dynamic code to a project folder.
 * Verifies the code and project belong to the same user.
 */
export async function setQrProject(
  slug: string,
  userId: string,
  projectId: string | null,
): Promise<boolean> {
  const code = await getQrCode(slug);
  if (!code || code.user_id !== userId) return false;

  if (projectId) {
    const project = await getProject(projectId);
    if (!project || project.user_id !== userId) return false;
  }

  const db = await getClient();
  const res = await db.execute({
    sql: "UPDATE qr_codes SET project_id = ?, updated_at = ? WHERE slug = ? AND user_id = ?",
    args: [projectId, Date.now(), slug, userId],
  });
  if (projectId) await touchProject(projectId);
  return res.rowsAffected > 0;
}

function mapProject(r: Record<string, unknown>): ProjectRow {
  return {
    id: String(r.id),
    user_id: String(r.user_id),
    name: String(r.name),
    created_at: num(r.created_at),
    updated_at: num(r.updated_at),
  };
}

/* -------------------------------------------------------------------------- */
/* Subscriptions                                                              */
/* -------------------------------------------------------------------------- */

export async function getSubscription(
  userId: string,
): Promise<SubscriptionRow | null> {
  const db = await getClient();
  const res = await db.execute({
    sql: "SELECT * FROM subscriptions WHERE user_id = ?",
    args: [userId],
  });
  const r = res.rows[0];
  if (!r) return null;
  return {
    user_id: String(r.user_id),
    email: str(r.email),
    ls_customer_id: str(r.ls_customer_id),
    ls_subscription_id: str(r.ls_subscription_id),
    variant_id: str(r.variant_id),
    status: String(r.status),
    renews_at: r.renews_at == null ? null : num(r.renews_at),
    ends_at: r.ends_at == null ? null : num(r.ends_at),
    customer_portal_url: str(r.customer_portal_url),
    updated_at: num(r.updated_at),
  };
}

export interface UpsertSubscriptionInput {
  userId: string;
  email?: string | null;
  lsCustomerId?: string | null;
  lsSubscriptionId?: string | null;
  variantId?: string | null;
  status: string;
  renewsAt?: number | null;
  endsAt?: number | null;
  customerPortalUrl?: string | null;
}

export async function upsertSubscription(
  input: UpsertSubscriptionInput,
): Promise<void> {
  const db = await getClient();
  await db.execute({
    sql: `INSERT INTO subscriptions
            (user_id, email, ls_customer_id, ls_subscription_id, variant_id,
             status, renews_at, ends_at, customer_portal_url, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
          ON CONFLICT(user_id) DO UPDATE SET
            email = COALESCE(excluded.email, subscriptions.email),
            ls_customer_id = COALESCE(excluded.ls_customer_id, subscriptions.ls_customer_id),
            ls_subscription_id = COALESCE(excluded.ls_subscription_id, subscriptions.ls_subscription_id),
            variant_id = COALESCE(excluded.variant_id, subscriptions.variant_id),
            status = excluded.status,
            renews_at = excluded.renews_at,
            ends_at = excluded.ends_at,
            customer_portal_url = COALESCE(excluded.customer_portal_url, subscriptions.customer_portal_url),
            updated_at = excluded.updated_at`,
    args: [
      input.userId,
      input.email ?? null,
      input.lsCustomerId ?? null,
      input.lsSubscriptionId ?? null,
      input.variantId ?? null,
      input.status,
      input.renewsAt ?? null,
      input.endsAt ?? null,
      input.customerPortalUrl ?? null,
      Date.now(),
    ],
  });
}
