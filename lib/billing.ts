import { getSubscription } from "./db";
import type { PlanId } from "./plans";

/**
 * Lemon Squeezy billing. Merchant-of-record, so it works from Pakistan and
 * handles global sales tax / VAT. When the keys are absent, billing is
 * "not configured" and everyone stays on the free plan.
 */

const API_KEY = process.env.LEMONSQUEEZY_API_KEY ?? "";
const STORE_ID = process.env.LEMONSQUEEZY_STORE_ID ?? "";
const PRO_VARIANT_ID = process.env.LEMONSQUEEZY_PRO_VARIANT_ID ?? "";
const API_BASE = "https://api.lemonsqueezy.com/v1";

export const billingConfigured = Boolean(
  API_KEY && STORE_ID && PRO_VARIANT_ID,
);

/** Lemon Squeezy statuses that grant Pro access right now. */
const ACTIVE_STATUSES = new Set(["on_trial", "active", "paused"]);

/**
 * Resolve a user's plan from their stored subscription. A cancelled sub still
 * grants Pro until its paid period ends (`ends_at`).
 */
export async function getUserPlan(userId: string | null): Promise<PlanId> {
  if (!userId) return "free";
  const sub = await getSubscription(userId);
  if (!sub) return "free";

  if (ACTIVE_STATUSES.has(sub.status)) return "pro";
  if (sub.status === "cancelled" && sub.ends_at && sub.ends_at > Date.now()) {
    return "pro";
  }
  return "free";
}

/**
 * Create a Lemon Squeezy hosted checkout for the Pro plan and return its URL.
 * `user_id` is attached as custom data so the webhook can link the resulting
 * subscription back to the account.
 */
export async function createProCheckout(input: {
  userId: string;
  email?: string | null;
  redirectUrl?: string;
}): Promise<string> {
  if (!billingConfigured) {
    throw new Error("Billing is not configured.");
  }

  const body = {
    data: {
      type: "checkouts",
      attributes: {
        checkout_data: {
          email: input.email ?? undefined,
          custom: { user_id: input.userId },
        },
        product_options: input.redirectUrl
          ? { redirect_url: input.redirectUrl }
          : undefined,
        checkout_options: { embed: false },
      },
      relationships: {
        store: { data: { type: "stores", id: STORE_ID } },
        variant: { data: { type: "variants", id: PRO_VARIANT_ID } },
      },
    },
  };

  const res = await fetch(`${API_BASE}/checkouts`, {
    method: "POST",
    headers: {
      Accept: "application/vnd.api+json",
      "Content-Type": "application/vnd.api+json",
      Authorization: `Bearer ${API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Lemon Squeezy checkout failed: ${res.status} ${text}`);
  }

  const json = (await res.json()) as {
    data?: { attributes?: { url?: string } };
  };
  const url = json.data?.attributes?.url;
  if (!url) throw new Error("Lemon Squeezy did not return a checkout URL.");
  return url;
}
