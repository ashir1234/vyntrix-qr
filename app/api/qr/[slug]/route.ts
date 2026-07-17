import { NextResponse } from "next/server";
import {
  deleteQrCode,
  getQrCode,
  renameQrCode,
  slugExists,
  updateQrCode,
} from "@/lib/db";
import { getUserPlan } from "@/lib/billing";
import { PLAN_LIMITS } from "@/lib/plans";
import { normalizeSlug, validateCustomSlug } from "@/lib/slug";
import { getBaseUrl } from "@/lib/baseUrl";
import { sanitizeDesign } from "@/lib/qr/design";
import { getUserId } from "@/lib/authServer";
import {
  parseWifiPayloadJson,
  sanitizeWifiPayload,
  wifiPayloadToJson,
  WIFI_DESTINATION_SENTINEL,
} from "@/lib/qr/wifiPayload";

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

export async function GET(req: Request, { params }: Ctx) {
  const { slug } = await params;
  const row = await getQrCode(slug);
  if (!row) {
    return NextResponse.json({ error: "Not found." }, { status: 404 });
  }

  const token = new URL(req.url).searchParams.get("token");
  const userId = await getUserId();
  const canManage =
    (token && token === row.edit_token) ||
    (userId && row.user_id && userId === row.user_id);

  if (!canManage) {
    return NextResponse.json({
      slug: row.slug,
      destination: row.destination,
      title: row.title,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
    });
  }

  const base = getBaseUrl(req);
  return NextResponse.json({
    slug: row.slug,
    destination: row.destination,
    title: row.title,
    editToken: row.edit_token,
    design: row.design,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    shortUrl: `${base}/r/${row.slug}`,
    manageUrl: `${base}/manage/${row.slug}?token=${row.edit_token}`,
  });
}

export async function PATCH(req: Request, { params }: Ctx) {
  const { slug } = await params;
  let body: {
    destination?: string;
    title?: string;
    editToken?: string;
    customSlug?: string;
    design?: unknown;
    wifi?: unknown;
  };
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

  const isWifi = row.content_type === "wifi";
  let destination = row.destination;
  let payload: string | null | undefined = undefined;

  if (isWifi) {
    destination = WIFI_DESTINATION_SENTINEL;
    if (body.wifi !== undefined) {
      const wifi = sanitizeWifiPayload(body.wifi);
      if (!wifi) {
        return NextResponse.json(
          { error: "Valid WiFi SSID and password are required." },
          { status: 400 },
        );
      }
      payload = wifiPayloadToJson(wifi);
    }
  } else {
    destination =
      body.destination !== undefined
        ? body.destination.trim()
        : row.destination;
    if (!isValidHttpUrl(destination)) {
      return NextResponse.json(
        { error: "Destination must be a valid http(s) URL." },
        { status: 400 },
      );
    }
  }

  const title =
    body.title !== undefined
      ? body.title.trim().slice(0, 120) || null
      : row.title;

  const design =
    body.design !== undefined ? sanitizeDesign(body.design) : undefined;

  await updateQrCode(slug, destination, title, design, payload);

  let finalSlug = slug;
  const wantsRename =
    body.customSlug !== undefined &&
    normalizeSlug(body.customSlug) !== slug.toLowerCase() &&
    Boolean(body.customSlug.trim());

  if (wantsRename) {
    const plan = await getUserPlan(row.user_id);
    if (!PLAN_LIMITS[plan].customSlug) {
      return NextResponse.json(
        {
          error: "Custom short-link slugs are a Pro feature.",
          code: "upgrade_required",
        },
        { status: 402 },
      );
    }
    const validationError = validateCustomSlug(body.customSlug ?? "");
    if (validationError) {
      return NextResponse.json({ error: validationError }, { status: 400 });
    }
    const nextSlug = normalizeSlug(body.customSlug ?? "");
    if (await slugExists(nextSlug)) {
      return NextResponse.json(
        { error: "That short link is already taken. Try another." },
        { status: 409 },
      );
    }
    try {
      await renameQrCode(slug, nextSlug);
      finalSlug = nextSlug;
    } catch (e) {
      const message = e instanceof Error ? e.message : "Rename failed.";
      return NextResponse.json({ error: message }, { status: 400 });
    }
  }

  const base = getBaseUrl(req);
  const updated = await getQrCode(finalSlug);
  return NextResponse.json({
    slug: finalSlug,
    destination,
    title,
    contentType: updated?.content_type ?? row.content_type,
    wifi: parseWifiPayloadJson(updated?.payload ?? row.payload),
    design: updated?.design ?? design ?? row.design,
    shortUrl: `${base}/r/${finalSlug}`,
    manageUrl: `${base}/manage/${finalSlug}?token=${body.editToken}`,
    landingUrl:
      (updated?.content_type ?? row.content_type) === "wifi"
        ? `${base}/wifi/${finalSlug}`
        : undefined,
  });
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
