import { NextResponse } from "next/server";
import { getDb, type QrCodeRow } from "@/lib/db";
import { parseUa } from "@/lib/ua";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(req: Request, { params }: Ctx) {
  const { slug } = await params;
  const db = getDb();

  const row = db
    .prepare("SELECT * FROM qr_codes WHERE slug = ?")
    .get(slug) as QrCodeRow | undefined;

  if (!row) {
    return NextResponse.redirect(new URL("/", req.url), { status: 307 });
  }

  const ua = req.headers.get("user-agent");
  const { device, os, browser } = parseUa(ua);
  const referer = req.headers.get("referer");
  const country =
    req.headers.get("x-vercel-ip-country") ??
    req.headers.get("cf-ipcountry") ??
    null;

  try {
    db.prepare(
      `INSERT INTO scans (slug, ts, device, os, browser, referer, country)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
    ).run(slug, Date.now(), device, os, browser, referer, country);
  } catch {
    /* never block the redirect on a logging failure */
  }

  return NextResponse.redirect(row.destination, { status: 307 });
}
