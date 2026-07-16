import { NextResponse } from "next/server";
import { countQrCodesByUser, createQrCode, slugExists } from "@/lib/db";
import { generateEditToken, generateSlug } from "@/lib/ids";
import { getBaseUrl } from "@/lib/baseUrl";
import { getClientIp, rateLimit } from "@/lib/ratelimit";
import { authEnabled } from "@/lib/authFlags";
import { getUserId } from "@/lib/authServer";
import { getUserPlan } from "@/lib/billing";
import { canCreateDynamic, PLAN_LIMITS } from "@/lib/plans";

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

  // When accounts are enabled, dynamic codes belong to a signed-in user and are
  // subject to per-plan quotas. Without Clerk configured, creation stays
  // anonymous (the original free behavior).
  const userId = await getUserId();
  if (authEnabled && !userId) {
    return NextResponse.json(
      { error: "Please sign in to create a dynamic QR code.", code: "auth_required" },
      { status: 401 },
    );
  }

  if (userId) {
    const plan = await getUserPlan(userId);
    const count = await countQrCodesByUser(userId);
    if (!canCreateDynamic(plan, count)) {
      const limit = PLAN_LIMITS[plan].maxDynamicCodes;
      return NextResponse.json(
        {
          error: `You've reached your plan limit of ${limit} dynamic QR codes. Upgrade to Pro for unlimited codes.`,
          code: "quota_exceeded",
          plan,
          limit,
        },
        { status: 402 },
      );
    }
  }

  const editToken = generateEditToken();
  let slug = generateSlug();
  for (let attempt = 0; attempt < 5; attempt++) {
    if (!(await slugExists(slug))) break;
    slug = generateSlug();
  }

  await createQrCode({ slug, destination, title, editToken, userId });

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
