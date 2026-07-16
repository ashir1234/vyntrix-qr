"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { siteConfig } from "@/lib/site";
import { applyConsentMode, getConsent, setConsent } from "@/lib/consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Relevant when ads or analytics are configured (both set cookies).
    if (!siteConfig.adsenseClient && !siteConfig.gaId) return;
    const stored = getConsent();
    if (stored === null) setVisible(true);
    else applyConsentMode(stored === "accepted");
  }, []);

  if (!visible) return null;

  const choose = (value: "accepted" | "rejected") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 p-3 sm:p-4">
      <div className="glass mx-auto flex w-[min(900px,96vw)] flex-col items-start gap-3 rounded-2xl p-4 shadow-2xl sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-[var(--muted)]">
          We use cookies for analytics and ads that keep {siteConfig.name} free.
          See our{" "}
          <Link href="/privacy" className="text-[var(--brand-2)] underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => choose("rejected")}
            className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            Reject
          </button>
          <button
            onClick={() => choose("accepted")}
            className="btn-primary rounded-xl px-4 py-2 text-sm font-semibold"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
