import { NextResponse } from "next/server";
import { getDb } from "@/lib/db";
import { generateEditToken, generateSlug } from "@/lib/ids";
import { getBaseUrl } from "@/lib/baseUrl";
import { getClientIp, rateLimit } from "@/lib/ratelimit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isValidHttpUrl(value: string): boolean {
  try {
    const u = new URL(value);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
}

export async function POST(req: Request) {
  const ip = getClientIp(req);
  const rl = rateLimit(`create:${ip}`, 20, 60_000);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Too many requests. Please slow down." },
      { status: 429 },
    );
  }

  let body: { destination?: string; title?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const destination = (body.destination ?? "").trim();
  const title = (body.title ?? "").trim().slice(0, 120) || null;

  if (!isValidHttpUrl(destination)) {
    return NextResponse.json(
      { error: "Destination must be a valid http(s) URL." },
      { status: 400 },
    );
  }

  const db = getDb();
  const editToken = generateEditToken();
  const now = Date.now();

  let slug = generateSlug();
  for (let attempt = 0; attempt < 5; attempt++) {
    const exists = db
      .prepare("SELECT 1 FROM qr_codes WHERE slug = ?")
      .get(slug);
    if (!exists) break;
    slug = generateSlug();
  }

  db.prepare(
    `INSERT INTO qr_codes (slug, destination, title, edit_token, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?)`,
  ).run(slug, destination, title, editToken, now, now);

  const base = getBaseUrl(req);
  return NextResponse.json(
    {
      slug,
      destination,
      title,
      editToken,
      shortUrl: `${base}/r/${slug}`,
      manageUrl: `${base}/manage/${slug}?token=${editToken}`,
    },
    { status: 201 },
  );
}
