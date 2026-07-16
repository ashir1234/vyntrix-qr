"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/site";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

/**
 * Google AdSense display unit. Renders nothing until you set
 * NEXT_PUBLIC_ADSENSE_CLIENT (and pass a real `slot` id from your AdSense
 * dashboard), so the layout never shows an empty ad box before approval.
 */
export function AdSlot({
  slot,
  className,
  format = "auto",
  layout,
  style,
}: {
  slot: string;
  className?: string;
  format?: string;
  layout?: string;
  style?: React.CSSProperties;
}) {
  const client = siteConfig.adsenseClient;
  const pushed = useRef(false);

  useEffect(() => {
    if (!client || pushed.current) return;
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      /* ad blocker or script not loaded yet */
    }
  }, [client]);

  if (!client || !slot) return null;

  return (
    <div className={className} aria-hidden="true">
      <p className="mb-1 text-center text-[10px] uppercase tracking-wider text-[var(--muted)] opacity-60">
        Advertisement
      </p>
      <ins
        className="adsbygoogle"
        style={{ display: "block", ...style }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format={format}
        data-ad-layout={layout}
        data-full-width-responsive="true"
      />
    </div>
  );
}
