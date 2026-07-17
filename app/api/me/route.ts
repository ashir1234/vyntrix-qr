import { NextResponse } from "next/server";
import { syncSignedInUser } from "@/lib/authServer";
import { getUserPlan, billingConfigured } from "@/lib/billing";
import { getSubscription } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/** Upsert the signed-in user into Turso and return account summary. */
export async function GET() {
  const user = await syncSignedInUser();
  if (!user) {
    return NextResponse.json({ signedIn: false }, { status: 401 });
  }

  const [plan, sub] = await Promise.all([
    getUserPlan(user.id),
    getSubscription(user.id),
  ]);

  return NextResponse.json({
    signedIn: true,
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.created_at,
      lastSeenAt: user.last_seen_at,
    },
    plan,
    billingConfigured,
    status: sub?.status ?? null,
  });
}

/** Same as GET — used by the client sync beacon after sign-in. */
export async function POST() {
  return GET();
}
