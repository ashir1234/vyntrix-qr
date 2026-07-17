import { NextResponse } from "next/server";
import { getUserId, syncSignedInUser } from "@/lib/authServer";
import { getBaseUrl } from "@/lib/baseUrl";
import { getUserPlan } from "@/lib/billing";
import {
  countQrCodesByUser,
  createQrCode,
  slugExists,
} from "@/lib/db";
import { generateEditToken, generateSlug } from "@/lib/ids";
import { canCreateDynamic, PLAN_LIMITS } from "@/lib/plans";
import { sanitizeDesign } from "@/lib/qr/design";
import { normalizeSlug, validateCustomSlug } from "@/lib/slug";

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

type BulkRow = {
  destination?: string;
  title?: string;
  customSlug?: string;
};

export async function POST(req: Request) {
  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const plan = await getUserPlan(userId);
  const limits = PLAN_LIMITS[plan];
  if (!limits.bulkCreate) {
    return NextResponse.json(
      { error: "Bulk create is a Pro feature.", code: "upgrade_required" },
      { status: 402 },
    );
  }

  let body: { rows?: BulkRow[]; design?: unknown };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON." }, { status: 400 });
  }

  const rows = Array.isArray(body.rows) ? body.rows : [];
  if (rows.length === 0) {
    return NextResponse.json({ error: "No rows provided." }, { status: 400 });
  }
  if (rows.length > limits.maxBulkRows) {
    return NextResponse.json(
      {
        error: `Max ${limits.maxBulkRows} rows per bulk job.`,
        code: "quota_exceeded",
      },
      { status: 400 },
    );
  }

  const design = sanitizeDesign(body.design);
  const existingCount = await countQrCodesByUser(userId);
  if (!canCreateDynamic(plan, existingCount + rows.length - 1)) {
    // Check if adding all would exceed; for unlimited pro this always passes.
    const max = limits.maxDynamicCodes;
    if (max !== null && existingCount + rows.length > max) {
      return NextResponse.json(
        {
          error: `This batch would exceed your limit of ${max} dynamic codes.`,
          code: "quota_exceeded",
        },
        { status: 402 },
      );
    }
  }

  await syncSignedInUser();
  const base = getBaseUrl(req);
  const created: {
    slug: string;
    title: string | null;
    destination: string;
    shortUrl: string;
    manageUrl: string;
    editToken: string;
  }[] = [];
  const errors: { index: number; error: string }[] = [];

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];
    const destination = (row.destination ?? "").trim();
    const title = (row.title ?? "").trim().slice(0, 120) || null;

    if (!isValidHttpUrl(destination)) {
      errors.push({ index: i, error: "Invalid destination URL." });
      continue;
    }

    const countNow = await countQrCodesByUser(userId);
    if (!canCreateDynamic(plan, countNow)) {
      errors.push({ index: i, error: "Dynamic QR quota reached." });
      continue;
    }

    let slug = generateSlug();
    if (row.customSlug?.trim()) {
      if (!limits.customSlug) {
        errors.push({ index: i, error: "Custom slugs require Pro." });
        continue;
      }
      const validationError = validateCustomSlug(row.customSlug);
      if (validationError) {
        errors.push({ index: i, error: validationError });
        continue;
      }
      slug = normalizeSlug(row.customSlug);
      if (await slugExists(slug)) {
        errors.push({ index: i, error: "Slug already taken." });
        continue;
      }
    } else {
      for (let attempt = 0; attempt < 5; attempt++) {
        if (!(await slugExists(slug))) break;
        slug = generateSlug();
      }
    }

    const editToken = generateEditToken();
    try {
      await createQrCode({
        slug,
        destination,
        title,
        editToken,
        userId,
        design,
      });
      created.push({
        slug,
        title,
        destination,
        editToken,
        shortUrl: `${base}/r/${slug}`,
        manageUrl: `${base}/manage/${slug}?token=${editToken}`,
      });
    } catch (e) {
      errors.push({
        index: i,
        error: e instanceof Error ? e.message : "Create failed.",
      });
    }
  }

  return NextResponse.json(
    { created, errors, createdCount: created.length },
    { status: created.length > 0 ? 201 : 400 },
  );
}
