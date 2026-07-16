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
 * NEXT_PUBLIC_ADSENSE_CLIENT and a real `slot` id.
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
  const insRef = useRef<HTMLModElement>(null);

  useEffect(() => {
    if (!client || !slot) return;
    const el = insRef.current;
    if (!el) return;

    // Already filled (React Strict Mode remount, or Auto ads got there first).
    if (
      el.getAttribute("data-adsbygoogle-status") ||
      el.getAttribute("data-ad-status")
    ) {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      /* ad blocker / script not ready / already filled */
    }
  }, [client, slot]);

  if (!client || !slot) return null;

  return (
    <div className={className} aria-hidden="true">
      <p className="mb-1 text-center text-[10px] uppercase tracking-wider text-[var(--muted)] opacity-60">
        Advertisement
      </p>
      <ins
        ref={insRef}
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
