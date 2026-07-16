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
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
