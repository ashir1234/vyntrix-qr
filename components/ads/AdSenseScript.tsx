"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { CONSENT_EVENT, getConsent } from "@/lib/consent";

/**
 * Loads the AdSense library only after the visitor has accepted cookies, so we
 * never set advertising cookies without consent (EEA/UK compliance).
 */
export function AdSenseScript() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    const sync = () => setAccepted(getConsent() === "accepted");
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  if (!siteConfig.adsenseClient || !accepted) return null;

  return (
    <Script
      id="adsbygoogle-init"
      async
      strategy="afterInteractive"
      crossOrigin="anonymous"
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsenseClient}`}
    />
  );
}
