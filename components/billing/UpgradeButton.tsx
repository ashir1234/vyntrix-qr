"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { trackEvent } from "@/lib/analytics";
import { authEnabled } from "@/lib/authFlags";

export function UpgradeButton({
  className = "btn-primary rounded-xl px-6 py-2.5 text-sm font-semibold",
  label = "Upgrade to Pro",
  source = "pricing",
}: {
  className?: string;
  label?: string;
  source?: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const upgrade = async () => {
    setError(null);
    trackEvent("upgrade_click", { source });

    // Not signed in → send to sign-in first, then back here to upgrade.
    if (authEnabled) {
      // Optimistically attempt checkout; the API returns 401 if signed out.
    }

    setLoading(true);
    try {
      const res = await fetch("/api/billing/checkout", { method: "POST" });
      if (res.status === 401) {
        router.push("/sign-in?redirect_url=/pricing");
        return;
      }
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Could not start checkout.");
      trackEvent("checkout_start", { source });
      window.location.href = json.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not start checkout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button onClick={upgrade} disabled={loading} className={className}>
        {loading ? "Starting checkout…" : label}
      </button>
      {error && <p className="mt-2 text-xs text-red-400">{error}</p>}
    </div>
  );
}
