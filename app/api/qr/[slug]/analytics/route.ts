import { NextResponse } from "next/server";
import { getAnalytics, getQrCode } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(req: Request, { params }: Ctx) {
  const { slug } = await params;
  const token = new URL(req.url).searchParams.get("token");

  const row = await getQrCode(slug);
  if (!row) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }
  if (!token || token !== row.edit_token) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const analytics = await getAnalytics(slug);

  return NextResponse.json({
    slug: row.slug,
    title: row.title,
    destination: row.destination,
    createdAt: row.created_at,
    ...analytics,
  });
}
