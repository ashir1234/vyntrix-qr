import { NextResponse } from "next/server";
import { getQrCode, insertScan } from "@/lib/db";
import { parseUa } from "@/lib/ua";
import { isWifiDestination } from "@/lib/qr/wifiPayload";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type Ctx = { params: Promise<{ slug: string }> };

export async function GET(req: Request, { params }: Ctx) {
  const { slug } = await params;
  const row = await getQrCode(slug);

  if (!row) {
    return NextResponse.redirect(new URL("/", req.url), { status: 307 });
  }

  const { device, os, browser } = parseUa(req.headers.get("user-agent"));
  const referer = req.headers.get("referer");
  const country =
    req.headers.get("x-vercel-ip-country") ??
    req.headers.get("cf-ipcountry") ??
    null;

  try {
    await insertScan({
      slug,
      ts: Date.now(),
      device,
      os,
      browser,
      referer,
      country,
    });
  } catch {
    /* never block the redirect on a logging failure */
  }

  const isWifi =
    row.content_type === "wifi" || isWifiDestination(row.destination);

  if (isWifi) {
    return NextResponse.redirect(new URL(`/wifi/${slug}`, req.url), {
      status: 307,
    });
  }

  return NextResponse.redirect(row.destination, { status: 307 });
}
