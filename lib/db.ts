import Database from "better-sqlite3";
import { existsSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";

/**
 * SQLite-backed store for dynamic QR codes and scan analytics.
 *
 * Local/self-hosted: uses a file at `data/vyntrix.db` (override with DATABASE_PATH).
 * Note: serverless platforms (e.g. Vercel) have an ephemeral filesystem — point
 * DATABASE_PATH at a persistent volume, or swap this module for Turso/libSQL.
 */

let db: Database.Database | null = null;

export function getDb(): Database.Database {
  if (db) return db;

  const path =
    process.env.DATABASE_PATH ?? join(process.cwd(), "data", "vyntrix.db");
  const dir = dirname(path);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });

  db = new Database(path);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");

  db.exec(`
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
      country  TEXT,
      FOREIGN KEY (slug) REFERENCES qr_codes(slug) ON DELETE CASCADE
    );

    CREATE INDEX IF NOT EXISTS idx_scans_slug ON scans(slug);
    CREATE INDEX IF NOT EXISTS idx_scans_ts ON scans(ts);
  `);

  return db;
}

export interface QrCodeRow {
  slug: string;
  destination: string;
  title: string | null;
  edit_token: string;
  created_at: number;
  updated_at: number;
}

export interface ScanRow {
  id: number;
  slug: string;
  ts: number;
  device: string | null;
  os: string | null;
  browser: string | null;
  referer: string | null;
  country: string | null;
}
