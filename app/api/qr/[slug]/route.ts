import { NextResponse } from "next/server";
import { deleteQrCode, getQrCode, updateQrCode } from "@/lib/db";

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

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(_req: Request, { params }: Ctx) {
  const { slug } = await params;
  const row = await getQrCode(slug);
  if (!row) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  return NextResponse.json({
    slug: row.slug,
    destination: row.destination,
    title: row.title,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  });
}

export async function PATCH(req: Request, { params }: Ctx) {
  const { slug } = await params;
  let body: { destination?: string; title?: string; editToken?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const row = await getQrCode(slug);
  if (!row) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  if (!body.editToken || body.editToken !== row.edit_token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const destination =
    body.destination !== undefined ? body.destination.trim() : row.destination;
  if (!isValidHttpUrl(destination)) {
    return NextResponse.json(
      { error: "Destination must be a valid http(s) URL." },
      { status: 400 },
    );
  }
  const title =
    body.title !== undefined
      ? body.title.trim().slice(0, 120) || null
      : row.title;

  await updateQrCode(slug, destination, title);
  return NextResponse.json({ slug, destination, title });
}

export async function DELETE(req: Request, { params }: Ctx) {
  const { slug } = await params;
  const token = new URL(req.url).searchParams.get("token");
  const row = await getQrCode(slug);
  if (!row) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  if (!token || token !== row.edit_token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }
  await deleteQrCode(slug);
  return NextResponse.json({ ok: true });
}
