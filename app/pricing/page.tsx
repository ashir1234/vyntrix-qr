import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { UpgradeButton } from "@/components/billing/UpgradeButton";
import { PLAN_LIMITS } from "@/lib/plans";
import { siteConfig } from "@/lib/site";

const pro = PLAN_LIMITS.pro;
const free = PLAN_LIMITS.free;

export const metadata: Metadata = {
  title: "Pricing — Free & Pro Plans",
  description:
    "Vyntrix QR is free forever for static QR codes. Upgrade to Pro for unlimited dynamic QR codes, full scan analytics, CSV export, custom slugs, and no ads.",
  alternates: { canonical: "/pricing" },
  openGraph: {
    title: `Pricing — ${siteConfig.name}`,
    description:
      "Free forever for static QR codes. Pro unlocks unlimited dynamic codes, full analytics, CSV export, and no ads.",
    type: "website",
  },
};

function Check() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="mt-0.5 shrink-0 text-[var(--brand)]"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

export default function PricingPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-[min(1000px,94vw)] flex-1 py-12">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            Simple, honest pricing
          </h1>
          <p className="mx-auto mt-3 max-w-xl text-[var(--muted)]">
            Create and download QR codes free, forever. Upgrade only when you
            need unlimited dynamic links and full analytics.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {/* Free */}
          <div className="glass rounded-3xl p-7">
            <p className="text-sm font-medium text-[var(--muted)]">
              {free.name}
            </p>
            <p className="mt-2 flex items-end gap-1">
              <span className="text-4xl font-bold">{free.price}</span>
              <span className="pb-1 text-sm text-[var(--muted)]">
                {free.priceSuffix}
              </span>
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">{free.tagline}</p>
            <Link
              href="/studio"
              className="mt-6 inline-block w-full rounded-xl border border-[var(--border)] py-2.5 text-center text-sm font-semibold transition hover:border-[var(--brand)]"
            >
              Open the studio
            </Link>
            <ul className="mt-6 space-y-2.5 text-sm">
              {free.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="glass glow relative rounded-3xl border border-[var(--brand)]/40 p-7">
            <span className="absolute -top-3 right-6 rounded-full bg-[var(--brand)] px-3 py-1 text-xs font-semibold text-[#04120c]">
              Most popular
            </span>
            <p className="text-sm font-medium text-[var(--muted)]">
              {pro.name}
            </p>
            <p className="mt-2 flex items-end gap-1">
              <span className="text-4xl font-bold">{pro.price}</span>
              <span className="pb-1 text-sm text-[var(--muted)]">
                {pro.priceSuffix}
              </span>
            </p>
            <p className="mt-2 text-sm text-[var(--muted)]">{pro.tagline}</p>
            <div className="mt-6">
              <UpgradeButton
                className="btn-primary w-full rounded-xl py-2.5 text-center text-sm font-semibold"
                label="Upgrade to Pro"
                source="pricing_page"
              />
            </div>
            <ul className="mt-6 space-y-2.5 text-sm">
              {pro.features.map((f) => (
                <li key={f} className="flex gap-2">
                  <Check />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 text-center text-xs text-[var(--muted)]">
          Payments are securely handled by Lemon Squeezy (our merchant of
          record). Cancel anytime.
        </p>
      </main>
      <Footer />
    </>
  );
}
