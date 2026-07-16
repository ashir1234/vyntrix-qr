import Script from "next/script";
import { siteConfig } from "@/lib/site";

/**
 * Google Analytics 4. Renders only when NEXT_PUBLIC_GA_ID is set.
 * Respects Google Consent Mode: the layout head defaults analytics_storage to
 * "denied", and the cookie banner flips it to "granted" on Accept.
 */
export function GoogleAnalytics() {
  const id = siteConfig.gaId;
  if (!id) return null;

  return (
    <>
      <Script
        id="ga4-src"
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${id}`}
      />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          window.gtag = window.gtag || gtag;
          gtag('js', new Date());
          gtag('config', '${id}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
