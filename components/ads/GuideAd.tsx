"use client";

import { useEffect, useState } from "react";
import { AdSlot } from "./AdSlot";
import { siteConfig } from "@/lib/site";
import { authEnabled } from "@/lib/authFlags";

/**
 * Ad unit for guide pages. Hidden for Pro subscribers. When auth is disabled we
 * always show the ad (no accounts = no Pro plan).
 */
export function GuideAd() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (!authEnabled) return;
    let active = true;
    fetch("/api/billing/plan")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (active && j?.plan === "pro") setHidden(true);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  if (hidden) return null;

  return (
    <AdSlot
      slot={siteConfig.adSlots.guides}
      className="my-10"
      style={{ minHeight: 90 }}
    />
  );
}
