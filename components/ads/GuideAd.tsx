"use client";

import { PlanAwareAd } from "./PlanAwareAd";
import { siteConfig } from "@/lib/site";

/** Guide-page ad unit — hidden for Pro. */
export function GuideAd() {
  return (
    <PlanAwareAd
      slot={siteConfig.adSlots.guides}
      className="my-10"
      style={{ minHeight: 90 }}
    />
  );
}
