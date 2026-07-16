/**
 * Thin wrapper around gtag for funnel + conversion tracking. Safe to call
 * anywhere on the client: if GA isn't loaded (or consent was denied) it's a
 * no-op. Events only actually send once Consent Mode grants analytics_storage.
 */

type GtagParams = Record<string, string | number | boolean | undefined>;

/** Events we mark as GA4 conversions (see GA4 admin → Events → Mark as key event). */
export const CONVERSION_EVENTS = new Set([
  "upgrade_click",
  "checkout_start",
  "subscription_active",
]);

export function trackEvent(name: string, params: GtagParams = {}): void {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: (...args: unknown[]) => void })
    .gtag;
  if (typeof gtag !== "function") return;
  gtag("event", name, params);
}
