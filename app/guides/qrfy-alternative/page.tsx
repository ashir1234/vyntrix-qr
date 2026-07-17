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

const slug = "qrfy-alternative";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Why consider a QRfy alternative?",
    a: "Teams compare pricing, free-tier limits, branding tools, and whether static generation stays private in the browser.",
  },
  {
    q: "What’s free on Vyntrix QR?",
    a: "Unlimited static codes with no watermark, plus 1 dynamic code with short analytics when you sign in.",
  },
  {
    q: "What’s on Pro?",
    a: "Unlimited dynamic codes, full history + CSV, custom slugs, WiFi landing pages, cloud Studio sync, projects, bulk CSV create, print pack, and no ads — from $9/month.",
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

export default function QrfyAltPage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "QRfy alternative", href: `/guides/${slug}` },
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
        Searching for a{" "}
        <strong className="text-[var(--foreground)]">QRfy alternative</strong>?{" "}
        {siteConfig.name} combines free static branding with an affordable Pro
        plan for dynamic QR codes, analytics, and business workflows.
      </p>

      <GuideCta label={`Try ${siteConfig.name}`} />

      <h2 className="mt-10 text-2xl font-semibold">At a glance</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Free static QR generator with logo, colors, and 3D preview</li>
        <li>1 free dynamic code; Pro for unlimited + full analytics</li>
        <li>Projects, bulk create, WiFi pages, and print pack on Pro</li>
        <li>
          Transparent plans on{" "}
          <Link href="/pricing" className="text-[var(--brand-2)] underline">
            Pricing
          </Link>
        </li>
      </ul>

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
