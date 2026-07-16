import { NextResponse } from "next/server";
import { setQrOwner } from "@/lib/db";
import { getUserId } from "@/lib/authServer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Claim ownership of dynamic codes that were created anonymously (stored in the
 * browser's localStorage before the user signed in). Each entry must include the
 * secret edit token as proof of ownership.
 */
export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  let body: { codes?: { slug?: string; editToken?: string }[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const codes = Array.isArray(body.codes) ? body.codes.slice(0, 100) : [];
  let claimed = 0;
  for (const c of codes) {
    if (!c.slug || !c.editToken) continue;
    const ok = await setQrOwner(c.slug, c.editToken, userId);
    if (ok) claimed++;
  }

  return NextResponse.json({ ok: true, claimed });
}
