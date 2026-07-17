import type { Metadata } from "next";
import Link from "next/link";
import { GuideLayout } from "@/components/guides/GuideLayout";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, breadcrumbJsonLd, guides } from "@/lib/seo";

export const metadata: Metadata = {
  title: "QR Code Guides — How to Create WiFi, Logo & Dynamic QR Codes",
  description:
    "Step-by-step guides for creating free QR codes: WiFi, vCard, logo branding, and dynamic editable QR codes with analytics. Powered by Vyntrix QR.",
  keywords: [
    "QR code guide",
    "how to create QR code",
    "WiFi QR code tutorial",
    "dynamic QR code guide",
  ],
  alternates: { canonical: "/guides" },
  openGraph: {
    title: "QR Code Guides | Vyntrix QR",
    description:
      "Learn how to create free WiFi, logo, vCard, and dynamic QR codes.",
    url: absoluteUrl("/guides"),
  },
};

export default function GuidesHubPage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
      ]}
      jsonLd={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Guides", path: "/guides" },
      ])}
    >
      <h1 className="text-4xl font-bold tracking-tight">
        QR Code <span className="gradient-text">Guides</span>
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        Practical, answer-first tutorials for creating free custom QR codes with{" "}
        {siteConfig.name}. Jump into a guide, then open the studio to generate
        yours in seconds.
      </p>
      <p className="mt-3 text-sm text-[var(--muted)]">
        Prefer a shorter use-case page? Browse the{" "}
        <Link href="/qr-code-for" className="text-[var(--brand-2)] underline">
          QR code for… directory
        </Link>
        .
      </p>

      <ul className="mt-10 space-y-4">
        {guides.map((g) => (
          <li key={g.slug}>
            <Link
              href={`/guides/${g.slug}`}
              className="glass block rounded-2xl p-5 transition hover:border-[var(--brand)]"
            >
              <h2 className="text-lg font-semibold text-[var(--foreground)]">
                {g.h1}
              </h2>
              <p className="mt-1.5 text-sm text-[var(--muted)]">
                {g.description}
              </p>
              <span className="mt-3 inline-block text-sm text-[var(--brand-2)]">
                Read guide →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </GuideLayout>
  );
}
