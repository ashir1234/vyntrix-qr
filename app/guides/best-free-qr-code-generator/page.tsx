import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const slug = "best-free-qr-code-generator";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What makes a free QR generator actually good?",
    a: "No watermark on static codes, logo/color support, reliable PNG/SVG export, clear privacy, and an honest path to dynamic codes if you need analytics.",
  },
  {
    q: "Is Vyntrix QR free?",
    a: "Yes for unlimited static QR codes (URL, WiFi, vCard, and more) with no watermark. Sign in for 1 free dynamic code; Pro unlocks unlimited dynamics and analytics.",
  },
  {
    q: "Do I need dynamic QR codes?",
    a: "Only if you want to change the destination after printing or track scans. Static codes are fine for permanent links.",
  },
];

export const metadata: Metadata = {
  title: guide.title,
  description: guide.description,
  keywords: [...guide.keywords],
  alternates: { canonical: `/guides/${slug}` },
  openGraph: {
    title: guide.title,
    description: guide.description,
    type: "article",
  },
};

export default function BestFreeGeneratorGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Best free generator", href: `/guides/${slug}` },
      ]}
      jsonLd={[
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "Guides", path: "/guides" },
          { name: guide.h1, path: `/guides/${slug}` },
        ]),
        articleJsonLd({
          title: guide.title,
          description: guide.description,
          path: `/guides/${slug}`,
        }),
        faqJsonLd(FAQS),
      ]}
    >
      <h1 className="text-4xl font-bold tracking-tight">{guide.h1}</h1>
      <p className="mt-4 text-lg text-[var(--muted)]">
        Searching for the{" "}
        <strong className="text-[var(--foreground)]">
          best free QR code generator
        </strong>
        ? Focus on watermarks, branding, exports, and whether dynamic codes are
        honest about pricing — not on stuffing keyword lists.
      </p>

      <GuideCta label={`Try ${siteConfig.name} free`} />

      <h2 className="mt-10 text-2xl font-semibold">Checklist</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Static codes free without a watermark</li>
        <li>Logo, colors, and print-ready PNG/SVG</li>
        <li>Optional dynamic codes with clear Free vs Pro limits</li>
        <li>Privacy you can explain (static in-browser vs stored dynamics)</li>
        <li>Guides for real use cases — WiFi, menus, packaging, social</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">How {siteConfig.name} fits</h2>
      <p className="mt-3 text-[var(--muted)]">
        {siteConfig.name} gives you unlimited static codes, live 2D/3D preview,
        and branding tools. Sign in for 1 free dynamic code with short analytics;
        Pro ($9/mo) unlocks unlimited dynamics, CSV export, WiFi landing pages,
        projects, bulk create, and print pack. Compare plans on{" "}
        <Link href="/pricing" className="text-[var(--brand-2)] underline">
          Pricing
        </Link>
        .
      </p>

      <h2 className="mt-10 text-2xl font-semibold">FAQ</h2>
      <div className="mt-4 space-y-3">
        {FAQS.map((f) => (
          <details key={f.q} className="glass rounded-xl p-4">
            <summary className="cursor-pointer font-medium">{f.q}</summary>
            <p className="mt-2 text-sm text-[var(--muted)]">{f.a}</p>
          </details>
        ))}
      </div>
    </GuideLayout>
  );
}
