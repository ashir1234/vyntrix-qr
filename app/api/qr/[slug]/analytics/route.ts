import { NextResponse } from "next/server";
import { getAnalytics, getQrCode } from "@/lib/db";
import { getUserPlan } from "@/lib/billing";
import { PLAN_LIMITS } from "@/lib/plans";

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

  // Analytics retention depends on the owning account's plan. Anonymous/legacy
  // codes (no owner) fall back to the free window.
  const plan = await getUserPlan(row.user_id);
  const windowDays = PLAN_LIMITS[plan].analyticsWindowDays ?? undefined;
  const analytics = await getAnalytics(slug, windowDays);

  return NextResponse.json({
    slug: row.slug,
    title: row.title,
    destination: row.destination,
    createdAt: row.created_at,
    plan,
    analyticsWindowDays: PLAN_LIMITS[plan].analyticsWindowDays,
    csvExport: PLAN_LIMITS[plan].csvExport,
    customSlug: PLAN_LIMITS[plan].customSlug,
    ...analytics,
  });
}
