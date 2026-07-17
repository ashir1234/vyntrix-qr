import crypto from "node:crypto";
import { NextResponse } from "next/server";
import { upsertAppUser, upsertSubscription } from "@/lib/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type LemonWebhook = {
  meta?: {
    event_name?: string;
    custom_data?: { user_id?: string | number };
  };
  data?: {
    type?: string;
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

/**
 * Only these events carry a *subscription* object with status like
 * active / cancelled. Events such as `subscription_payment_success` are
 * invoices (`status: "paid"`) — writing that over the subscription row
 * incorrectly drops the user back to Free.
 */
const SUBSCRIPTION_EVENTS = new Set([
  "subscription_created",
  "subscription_updated",
  "subscription_cancelled",
  "subscription_resumed",
  "subscription_expired",
  "subscription_paused",
  "subscription_unpaused",
]);

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

  if (
    hmac.length !== signature.length ||
    !crypto.timingSafeEqual(hmac, signature)
  ) {
    return NextResponse.json("Invalid signature.", { status: 401 });
  }

  let payload: LemonWebhook;
  try {
    payload = JSON.parse(rawBody) as LemonWebhook;
  } catch {
    return NextResponse.json("Invalid JSON.", { status: 400 });
  }

  const eventName = payload.meta?.event_name ?? "";
  const rawUserId = payload.meta?.custom_data?.user_id;
  const userId =
    rawUserId == null || rawUserId === "" ? null : String(rawUserId);

  if (!SUBSCRIPTION_EVENTS.has(eventName)) {
    return NextResponse.json({ ok: true, ignored: eventName });
  }
  if (!userId) {
    return NextResponse.json({ ok: true, ignored: "missing user_id" });
  }

  // Extra guard: payment events can share the subscription_ prefix historically;
  // only trust payloads that look like subscription resources.
  if (payload.data?.type && payload.data.type !== "subscriptions") {
    return NextResponse.json({
      ok: true,
      ignored: `unexpected_type:${payload.data.type}`,
    });
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

  // Keep a users row even if they never opened the dashboard after checkout.
  await upsertAppUser({
    id: userId,
    email: attrs.user_email ?? null,
  }).catch(() => {
    /* non-fatal */
  });

  return NextResponse.json({ ok: true, event: eventName, status });
}
