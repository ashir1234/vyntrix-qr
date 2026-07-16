import { NextResponse } from "next/server";
import { getDb, type QrCodeRow } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };
type Bucket = { name: string; count: number };

export async function GET(req: Request, { params }: Ctx) {
  const { slug } = await params;
  const token = new URL(req.url).searchParams.get("token");

  const db = getDb();
  const row = db
    .prepare("SELECT * FROM qr_codes WHERE slug = ?")
    .get(slug) as QrCodeRow | undefined;

  if (!row) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  if (!token || token !== row.edit_token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const total = (
    db.prepare("SELECT COUNT(*) c FROM scans WHERE slug = ?").get(slug) as {
      c: number;
    }
  ).c;

  const rawDays = db
    .prepare(
      `SELECT date(ts / 1000, 'unixepoch') d, COUNT(*) c
       FROM scans WHERE slug = ?
       GROUP BY d ORDER BY d`,
    )
    .all(slug) as { d: string; c: number }[];

  // Fill the last 30 days so the chart has a continuous x-axis.
  const dayMap = new Map(rawDays.map((r) => [r.d, r.c]));
  const byDay: { date: string; count: number }[] = [];
  for (let i = 29; i >= 0; i--) {
    const d = new Date();
    d.setUTCDate(d.getUTCDate() - i);
    const key = d.toISOString().slice(0, 10);
    byDay.push({ date: key, count: dayMap.get(key) ?? 0 });
  }

  const group = (col: string): Bucket[] =>
    db
      .prepare(
        `SELECT COALESCE(${col}, 'Unknown') name, COUNT(*) count
         FROM scans WHERE slug = ? GROUP BY name ORDER BY count DESC`,
      )
      .all(slug) as Bucket[];

  const recent = db
    .prepare(
      `SELECT ts, device, os, browser, country
       FROM scans WHERE slug = ? ORDER BY ts DESC LIMIT 25`,
    )
    .all(slug);

  return NextResponse.json({
    slug: row.slug,
    title: row.title,
    destination: row.destination,
    createdAt: row.created_at,
    total,
    byDay,
    byDevice: group("device"),
    byBrowser: group("browser"),
    byOs: group("os"),
    recent,
  });
}
