import { NextResponse } from "next/server";
import { getUserId } from "@/lib/authServer";
import { getUserPlan, billingConfigured } from "@/lib/billing";
import { getSubscription } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const userId = await getUserId();
  const plan = await getUserPlan(userId);
  const sub = userId ? await getSubscription(userId) : null;

  return NextResponse.json({
    plan,
    signedIn: Boolean(userId),
    billingConfigured,
    status: sub?.status ?? null,
    renewsAt: sub?.renews_at ?? null,
    endsAt: sub?.ends_at ?? null,
    customerPortalUrl: sub?.customer_portal_url ?? null,
  });
}
