import { createClient, type Client, type InValue } from "@libsql/client";
import { existsSync, mkdirSync } from "node:fs";
import { dirname } from "node:path";

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
  await c.executeMultiple(`
    CREATE TABLE IF NOT EXISTS qr_codes (
      slug         TEXT PRIMARY KEY,
      destination  TEXT NOT NULL,
      title        TEXT,
      edit_token   TEXT NOT NULL,
      user_id      TEXT,
      created_at   INTEGER NOT NULL,
      updated_at   INTEGER NOT NULL
    );
    CREATE TABLE IF NOT EXISTS scans (
      id       INTEGER PRIMARY KEY AUTOINCREMENT,
      slug     TEXT NOT NULL,
      ts       INTEGER NOT NULL,
      device   TEXT,
      os       TEXT,
      browser  TEXT,
      referer  TEXT,
      country  TEXT
    );
    CREATE TABLE IF NOT EXISTS subscriptions (
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
    );
    CREATE INDEX IF NOT EXISTS idx_scans_slug ON scans(slug);
    CREATE INDEX IF NOT EXISTS idx_scans_ts ON scans(ts);
    CREATE INDEX IF NOT EXISTS idx_qr_user ON qr_codes(user_id);
  `);

  // Migration for databases created before the user_id column existed.
  const cols = await c.execute("PRAGMA table_info(qr_codes)");
  const hasUserId = cols.rows.some((r) => String(r.name) === "user_id");
  if (!hasUserId) {
    await c.execute("ALTER TABLE qr_codes ADD COLUMN user_id TEXT");
    await c.execute(
      "CREATE INDEX IF NOT EXISTS idx_qr_user ON qr_codes(user_id)",
    );
  }
}

async function getClient(): Promise<Client> {
  if (!client) client = buildClient();
  if (!schemaReady) schemaReady = initSchema(client);
  await schemaReady;
  return client;
}

export interface QrCodeRow {
  slug: string;
  destination: string;
  title: string | null;
  edit_token: string;
  user_id: string | null;
  created_at: number;
  updated_at: number;
}

export interface CreateQrInput {
  slug: string;
  destination: string;
  title: string | null;
  editToken: string;
  userId?: string | null;
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
    sql: `INSERT INTO qr_codes (slug, destination, title, edit_token, user_id, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?, ?)`,
    args: [
      input.slug,
      input.destination,
      input.title,
      input.editToken,
      input.userId ?? null,
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
): Promise<void> {
  const db = await getClient();
  await db.execute({
    sql: "UPDATE qr_codes SET destination = ?, title = ?, updated_at = ? WHERE slug = ?",
    args: [destination, title, Date.now(), slug],
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
