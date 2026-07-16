"use client";

import { useEffect, useState } from "react";
import { AdSlot } from "./AdSlot";
import { authEnabled } from "@/lib/authFlags";

/**
 * AdSense unit that hides itself for Pro subscribers. Free / signed-out users
 * still see ads. When auth isn't configured, ads always show.
 */
export function PlanAwareAd({
  slot,
  className,
  style,
}: {
  slot: string;
  className?: string;
  style?: React.CSSProperties;
}) {
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

  return <AdSlot slot={slot} className={className} style={style} />;
}
