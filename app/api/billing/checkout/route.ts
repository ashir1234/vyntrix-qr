import { NextResponse } from "next/server";
import { getUserId, getUserEmail } from "@/lib/authServer";
import { billingConfigured, createProCheckout } from "@/lib/billing";
import { getBaseUrl } from "@/lib/baseUrl";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  if (!billingConfigured) {
    return NextResponse.json(
      { error: "Billing is not configured." },
      { status: 503 },
    );
  }

  const userId = await getUserId();
  if (!userId) {
    return NextResponse.json({ error: "Sign in required." }, { status: 401 });
  }

  const email = await getUserEmail();
  const base = getBaseUrl(req);

  try {
    const url = await createProCheckout({
      userId,
      email,
      redirectUrl: `${base}/dashboard?upgraded=1`,
    });
    return NextResponse.json({ url });
  } catch (e) {
    const message = e instanceof Error ? e.message : "Checkout failed.";
    return NextResponse.json({ error: message }, { status: 502 });
  }
}
