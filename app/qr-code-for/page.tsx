import type { Metadata } from "next";
import Link from "next/link";
import { GuideLayout } from "@/components/guides/GuideLayout";
import {
  absoluteUrl,
  breadcrumbJsonLd,
} from "@/lib/seo";
import {
  qrPlatformCategoryLabels,
  qrPlatforms,
  qrPlatformsByCategory,
  type QrPlatformCategory,
} from "@/lib/qr-platforms";

export const metadata: Metadata = {
  title: "QR Code for… — Free Generators by Use Case",
  description:
    "Create a free QR code for Spotify, TikTok, LinkedIn, Google Forms, App Store, packaging, real estate, and dozens more use cases. Download PNG or SVG instantly.",
  keywords: [
    "QR code for",
    "QR code generator by use case",
    "free QR code for social media",
    "QR code for app download",
  ],
  alternates: { canonical: "/qr-code-for" },
  openGraph: {
    title: "QR Code for… | Vyntrix QR",
    description:
      "Free QR codes for social, music, business, forms, apps, and print.",
    url: absoluteUrl("/qr-code-for"),
  },
};

const categoryOrder: QrPlatformCategory[] = [
  "social",
  "music",
  "business",
  "forms",
  "apps",
  "print",
  "other",
];

export default function QrCodeForHubPage() {
  const byCategory = qrPlatformsByCategory();

  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "QR code for…", href: "/qr-code-for" },
      ]}
      jsonLd={breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "QR code for…", path: "/qr-code-for" },
      ])}
    >
      <h1 className="text-4xl font-bold tracking-tight">
        QR code for{" "}
        <span className="gradient-text">every use case</span>
      </h1>
      <p className="mt-3 text-[var(--muted)]">
        Pick a destination, open the studio, and download a branded PNG or SVG.
        {qrPlatforms.length}+ use cases — each with steps, tips, and FAQs.
      </p>

      <p className="mt-4 text-sm text-[var(--muted)]">
        Looking for longer tutorials? Visit our{" "}
        <Link href="/guides" className="text-[var(--brand-2)] underline">
          QR code guides
        </Link>
        .
      </p>

      <div className="mt-10 space-y-10">
        {categoryOrder.map((cat) => {
          const items = byCategory.get(cat);
          if (!items?.length) return null;
          return (
            <section key={cat}>
              <h2 className="text-xl font-semibold">
                {qrPlatformCategoryLabels[cat]}
              </h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {items.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/qr-code-for/${p.slug}`}
                      className="glass block rounded-xl px-4 py-3 transition hover:border-[var(--brand)]"
                    >
                      <span className="font-medium text-[var(--foreground)]">
                        {p.name}
                      </span>
                      <span className="mt-0.5 block text-xs text-[var(--muted)]">
                        {p.description.slice(0, 90)}
                        {p.description.length > 90 ? "…" : ""}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    </GuideLayout>
  );
}
