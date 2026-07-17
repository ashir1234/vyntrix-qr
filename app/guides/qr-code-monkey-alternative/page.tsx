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

const slug = "qr-code-monkey-alternative";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Why look for a QR Code Monkey alternative?",
    a: "People often want clearer dynamic QR pricing, scan analytics, project folders, or a modern studio with 3D preview — without giving up free static branding.",
  },
  {
    q: "Does Vyntrix QR support logos and colors?",
    a: "Yes. Add a logo, colors, gradients, and styles, then export PNG or SVG.",
  },
  {
    q: "Are dynamic QR codes available?",
    a: "Yes. Free includes 1 dynamic code when signed in; Pro unlocks unlimited dynamics, analytics, and more.",
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

export default function QrCodeMonkeyAltPage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "QR Code Monkey alt", href: `/guides/${slug}` },
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
        Looking for a{" "}
        <strong className="text-[var(--foreground)]">
          QR Code Monkey alternative
        </strong>
        ? {siteConfig.name} is a free branded QR studio with optional dynamic
        links, analytics, and Pro tools for teams that outgrow one-off downloads.
      </p>

      <GuideCta label={`Open ${siteConfig.name}`} />

      <h2 className="mt-10 text-2xl font-semibold">What you get here</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Free static QR codes with logo and colors — no watermark</li>
        <li>Live 2D + immersive 3D preview</li>
        <li>Dynamic QR codes with scan analytics (Free: 1; Pro: unlimited)</li>
        <li>WiFi, vCard, URL, and more content types</li>
        <li>
          Use-case library:{" "}
          <Link href="/qr-code-for" className="text-[var(--brand-2)] underline">
            QR code for…
          </Link>{" "}
          and{" "}
          <Link href="/guides" className="text-[var(--brand-2)] underline">
            guides
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
