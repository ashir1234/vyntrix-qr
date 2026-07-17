"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { UpgradeButton } from "@/components/billing/UpgradeButton";
import { StaticQr } from "@/components/gallery/StaticQr";
import { ProjectsPanel } from "@/components/dashboard/ProjectsPanel";
import { BulkCreatePanel } from "@/components/dashboard/BulkCreatePanel";
import { trackEvent } from "@/lib/analytics";
import {
  defaultSavedDesign,
  type SavedQrDesign,
} from "@/lib/qr/design";
import type { PlanId } from "@/lib/plans";
import { PLAN_LIMITS } from "@/lib/plans";

interface CodeItem {
  slug: string;
  title: string | null;
  destination: string;
  editToken: string;
  createdAt: number;
  design: SavedQrDesign | null;
}

export function DashboardClient({
  plan,
  maxDynamicCodes,
  billingConfigured,
  subscriptionStatus,
  renewsAt,
  endsAt,
  customerPortalUrl,
  codes,
}: {
  plan: PlanId;
  maxDynamicCodes: number | null;
  billingConfigured: boolean;
  subscriptionStatus: string | null;
  renewsAt: number | null;
  endsAt: number | null;
  customerPortalUrl: string | null;
  codes: CodeItem[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [origin, setOrigin] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  // Fire the conversion event when returning from a successful checkout.
  useEffect(() => {
    if (searchParams.get("upgraded") === "1") {
      trackEvent("subscription_active", { source: "checkout_redirect" });
      setNotice("Welcome to Pro! Your account has been upgraded.");
    }
  }, [searchParams]);

  const remove = async (code: CodeItem) => {
    if (!confirm(`Delete "${code.title || code.slug}"? This cannot be undone.`))
      return;
    setDeleting(code.slug);
    try {
      const res = await fetch(
        `/api/qr/${code.slug}?token=${encodeURIComponent(code.editToken)}`,
        { method: "DELETE" },
      );
      if (res.ok) router.refresh();
    } finally {
      setDeleting(null);
    }
  };

  const used = codes.length;
  const isPro = plan === "pro";
  const quotaLabel =
    maxDynamicCodes === null ? `${used} / ∞` : `${used} / ${maxDynamicCodes}`;
  const maxBulkRows = PLAN_LIMITS[plan].maxBulkRows;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Your dashboard</h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Manage your dynamic QR codes and plan.
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            isPro
              ? "bg-[var(--brand)] text-[#04120c]"
              : "border border-[var(--border)] text-[var(--muted)]"
          }`}
        >
          {isPro ? "Pro" : "Free"} plan
        </span>
      </div>

      {notice && (
        <div className="rounded-xl border border-[var(--brand)]/30 bg-[var(--brand)]/10 px-4 py-3 text-sm text-[var(--brand-2)]">
          {notice}
        </div>
      )}

      {/* Plan card */}
      <div className="glass rounded-2xl p-5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-sm font-medium">
              Dynamic QR codes used:{" "}
              <span className="font-mono">{quotaLabel}</span>
            </p>
            {isPro ? (
              <p className="mt-1 text-xs text-[var(--muted)]">
                {subscriptionStatus === "cancelled" && endsAt
                  ? `Pro access ends ${new Date(endsAt).toLocaleDateString()}.`
                  : renewsAt
                    ? `Renews ${new Date(renewsAt).toLocaleDateString()}.`
                    : "Thanks for being a Pro member."}
              </p>
            ) : (
              <p className="mt-1 text-xs text-[var(--muted)]">
                Upgrade for unlimited dynamic codes, full analytics, and CSV
                export.
              </p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {isPro ? (
              customerPortalUrl ? (
                <a
                  href={customerPortalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-xl border border-[var(--border)] px-4 py-2 text-sm font-medium transition hover:border-[var(--brand)]"
                >
                  Manage subscription
                </a>
              ) : null
            ) : billingConfigured ? (
              <UpgradeButton source="dashboard" />
            ) : (
              <Link
                href="/pricing"
                className="btn-primary rounded-xl px-6 py-2.5 text-sm font-semibold"
              >
                See Pro
              </Link>
            )}
          </div>
        </div>
      </div>

      <ProjectsPanel isPro={isPro} />
      <BulkCreatePanel isPro={isPro} maxBulkRows={maxBulkRows} />

      {/* Codes list */}
      <div className="glass rounded-2xl p-5">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-semibold">Dynamic QR codes</h2>
          <Link
            href="/studio"
            className="text-sm text-[var(--brand-2)] transition hover:text-[var(--foreground)]"
          >
            + New code
          </Link>
        </div>

        {codes.length === 0 ? (
          <p className="py-10 text-center text-sm text-[var(--muted)]">
            No dynamic codes yet. Create one in the{" "}
            <Link href="/studio" className="text-[var(--brand-2)] underline">
              studio
            </Link>{" "}
            by enabling Dynamic QR.
          </p>
        ) : (
          <ul className="divide-y divide-[var(--border)]">
            {codes.map((code) => {
              const design = code.design ?? defaultSavedDesign();
              const shortUrl = origin
                ? `${origin}/r/${code.slug}`
                : `/r/${code.slug}`;
              return (
                <li
                  key={code.slug}
                  className="flex flex-wrap items-center gap-4 py-4"
                >
                  <div
                    className="shrink-0 overflow-hidden rounded-xl border border-[var(--border)] bg-white p-1.5"
                    title={
                      code.design
                        ? "Saved design"
                        : "No design saved yet — open in Studio and save"
                    }
                  >
                    {origin ? (
                      <StaticQr data={shortUrl} style={design.style} size={72} />
                    ) : (
                      <div className="h-[72px] w-[72px] animate-pulse bg-[var(--surface-2)]" />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">
                      {code.title || code.slug}
                    </p>
                    <p className="truncate text-xs text-[var(--muted)]">
                      {shortUrl} → {code.destination}
                    </p>
                    {!code.design && (
                      <p className="mt-0.5 text-[11px] text-amber-400/90">
                        Design not saved yet
                      </p>
                    )}
                  </div>
                  <div className="flex shrink-0 flex-wrap items-center gap-2 text-sm">
                    <Link
                      href={`/studio?load=${encodeURIComponent(code.slug)}&token=${encodeURIComponent(code.editToken)}`}
                      className="btn-primary rounded-lg px-3 py-1.5 text-xs font-semibold"
                      onClick={() =>
                        trackEvent("dashboard_open_studio", {
                          slug: code.slug,
                        })
                      }
                    >
                      Open in Studio
                    </Link>
                    <Link
                      href={`/manage/${code.slug}?token=${code.editToken}`}
                      className="rounded-lg border border-[var(--border)] px-3 py-1.5 font-medium transition hover:border-[var(--brand)]"
                    >
                      Manage
                    </Link>
                    <button
                      onClick={() => remove(code)}
                      disabled={deleting === code.slug}
                      className="rounded-lg border border-[var(--border)] px-3 py-1.5 text-[var(--muted)] transition hover:border-red-500/50 hover:text-red-400 disabled:opacity-60"
                    >
                      {deleting === code.slug ? "…" : "Delete"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
