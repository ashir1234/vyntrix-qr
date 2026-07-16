import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { upsertSubscription } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LemonWebhook = {
  meta?: {
    event_name?: string;
    custom_data?: { user_id?: string };
  };
  data?: {
    id?: string;
    attributes?: {
      customer_id?: number | string;
      variant_id?: number | string;
      user_email?: string;
      status?: string;
      renews_at?: string | null;
      ends_at?: string | null;
      urls?: { customer_portal?: string };
    };
  };
};

const toMs = (v: string | null | undefined): number | null =>
  v ? new Date(v).getTime() : null;

export async function POST(request: Request) {
  const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET;
  if (!secret) {
    return NextResponse.json("Webhook secret not set.", { status: 500 });
  }

  const rawBody = await request.text();
  const signature = Buffer.from(
    request.headers.get("X-Signature") ?? "",
    "hex",
  );

  if (signature.length === 0 || rawBody.length === 0) {
    return NextResponse.json("Invalid request.", { status: 400 });
  }

  const hmac = Buffer.from(
    crypto.createHmac("sha256", secret).update(rawBody).digest("hex"),
    "hex",
  );

  if (hmac.length !== signature.length || !crypto.timingSafeEqual(hmac, signature)) {
    return NextResponse.json("Invalid signature.", { status: 401 });
  }

  let payload: LemonWebhook;
  try {
    payload = JSON.parse(rawBody) as LemonWebhook;
  } catch {
    return NextResponse.json("Invalid JSON.", { status: 400 });
  }

  const eventName = payload.meta?.event_name ?? "";
  const userId = payload.meta?.custom_data?.user_id;

  // We only care about subscription lifecycle events tied to a known user.
  if (!eventName.startsWith("subscription_")) {
    return NextResponse.json({ ok: true, ignored: eventName });
  }
  if (!userId) {
    return NextResponse.json({ ok: true, ignored: "missing user_id" });
  }

  const attrs = payload.data?.attributes ?? {};
  const status = attrs.status ?? "active";

  await upsertSubscription({
    userId,
    email: attrs.user_email ?? null,
    lsCustomerId: attrs.customer_id != null ? String(attrs.customer_id) : null,
    lsSubscriptionId: payload.data?.id ?? null,
    variantId: attrs.variant_id != null ? String(attrs.variant_id) : null,
    status,
    renewsAt: toMs(attrs.renews_at),
    endsAt: toMs(attrs.ends_at),
    customerPortalUrl: attrs.urls?.customer_portal ?? null,
  });

  return NextResponse.json({ ok: true });
}
