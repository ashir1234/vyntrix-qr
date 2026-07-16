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
  // Pass sendPageView so the first Accept sends a hit to activate the GA stream.
  applyConsentMode(value === "accepted", value === "accepted");
  window.dispatchEvent(new Event(CONSENT_EVENT));
}

/** Push a Google Consent Mode v2 update so GA/AdSense honour the choice. */
export function applyConsentMode(granted: boolean, sendPageView = false) {
  if (typeof window === "undefined") return;
  const w = window as unknown as {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  };
  w.dataLayer = w.dataLayer || [];
  const value = granted ? "granted" : "denied";

  function gtag(..._args: unknown[]) {
    // gtag stores the raw `arguments` object in the dataLayer.
    // eslint-disable-next-line prefer-rest-params
    w.dataLayer!.push(arguments);
  }
  const call = w.gtag ?? gtag;

  call("consent", "update", {
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
    analytics_storage: value,
  });

  // After a fresh Accept, send a page_view so GA gets its first hit (the
  // automatic one was blocked while storage was denied).
  if (granted && sendPageView) {
    call("event", "page_view", {
      page_title: document.title,
      page_location: window.location.href,
      page_path: window.location.pathname,
    });
  }
}
