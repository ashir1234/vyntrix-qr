"use client";

import Script from "next/script";
import { siteConfig } from "@/lib/site";

/**
 * Loads the AdSense library. The tag is always present (so Google can verify the
 * site and serve ads), while Google Consent Mode — initialised in the document
 * head with all storage denied by default — ensures no advertising cookies are
 * set until the visitor accepts via the cookie banner.
 */
export function AdSenseScript() {
  if (!siteConfig.adsenseClient) return null;

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
