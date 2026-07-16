export type Consent = "accepted" | "rejected" | null;

export const CONSENT_KEY = "vyntrix_consent";
export const CONSENT_EVENT = "vyntrix-consent-change";

export function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "accepted" || v === "rejected" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Exclude<Consent, null>) {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable */
  }
  applyConsentMode(value === "accepted");
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Push a Google Consent Mode v2 update so the AdSense tag honours the choice. */
export function applyConsentMode(granted: boolean) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  const value = granted ? "granted" : "denied";
  function gtag(..._args: unknown[]) {
    // gtag stores the raw `arguments` object in the dataLayer.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  }
  gtag("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });
}
