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

async function getClient(): Promise<Client> {
  if (!client) client = buildClient();
  if (!schemaReady) {
    schemaReady = client.executeMultiple(`
      CREATE TABLE IF NOT EXISTS qr_codes (
        slug         TEXT PRIMARY KEY,
        destination  TEXT NOT NULL,
        title        TEXT,
        edit_token   TEXT NOT NULL,
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
      CREATE INDEX IF NOT EXISTS idx_scans_slug ON scans(slug);
      CREATE INDEX IF NOT EXISTS idx_scans_ts ON scans(ts);
    `);
  }
  await schemaReady;
  return client;
}

export interface QrCodeRow {
  slug: string;
  destination: string;
  title: string | null;
  edit_token: string;
  created_at: number;
  updated_at: number;
}

export interface CreateQrInput {
  slug: string;
  destination: string;
  title: string | null;
  editToken: string;
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
    sql: `INSERT INTO qr_codes (slug, destination, title, edit_token, created_at, updated_at)
          VALUES (?, ?, ?, ?, ?, ?)`,
    args: [input.slug, input.destination, input.title, input.editToken, now, now],
  });
}

export async function getQrCode(slug: string): Promise<QrCodeRow | null> {
  const db = await getClient();
  const res = await db.execute({
    sql: "SELECT * FROM qr_codes WHERE slug = ?",
    args: [slug],
  });
  const r = res.rows[0];
  if (!r) return null;
  return {
    slug: String(r.slug),
    destination: String(r.destination),
    title: str(r.title),
    edit_token: String(r.edit_token),
    created_at: num(r.created_at),
    updated_at: num(r.updated_at),
  };
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

export async function getAnalytics(slug: string): Promise<Analytics> {
  const db = await getClient();

  const totalRes = await db.execute({
    sql: "SELECT COUNT(*) c FROM scans WHERE slug = ?",
    args: [slug],
  });
  const total = num(totalRes.rows[0]?.c);

  const daysRes = await db.execute({
    sql: `SELECT date(ts / 1000, 'unixepoch') d, COUNT(*) c
          FROM scans WHERE slug = ? GROUP BY d ORDER BY d`,
    args: [slug],
  });
  const dayMap = new Map(
    daysRes.rows.map((r) => [String(r.d), num(r.c)] as const),
  );
  const byDay: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    byDay.push({ date: key, count: dayMap.get(key) ?? 0 });
  }

  const group = async (col: string): Promise<Bucket[]> => {
    const res = await db.execute({
      sql: `SELECT COALESCE(${col}, 'Unknown') name, COUNT(*) count
            FROM scans WHERE slug = ? GROUP BY name ORDER BY count DESC`,
      args: [slug],
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
          FROM scans WHERE slug = ? ORDER BY ts DESC LIMIT 25`,
    args: [slug],
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
