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
  {
    q: "Is there a watermark on free codes?",
    a: "No watermark on free static downloads.",
  },
  {
    q: "Can teams organize many codes?",
    a: "Pro adds project folders, bulk CSV create, and dashboard management for dynamic links.",
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

      <h2 className="mt-10 text-2xl font-semibold">
        Beyond one-off design downloads
      </h2>
      <p className="mt-3 text-[var(--muted)]">
        Design-first generators are great for a single pretty square. Campaigns,
        packaging, and menus usually need{" "}
        <Link
          href="/guides/static-vs-dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          editable destinations
        </Link>
        , scan history, and honest pricing. That is where {siteConfig.name}{" "}
        focuses — see{" "}
        <Link href="/pricing" className="text-[var(--brand-2)] underline">
          Pricing
        </Link>{" "}
        and our{" "}
        <Link href="/blog" className="text-[var(--brand-2)] underline">
          blog
        </Link>
        .
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Quick evaluation</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Create a logo QR and export SVG — check for watermarks.</li>
        <li>Create one dynamic link and change the destination.</li>
        <li>
          Skim{" "}
          <Link href="/privacy" className="text-[var(--brand-2)] underline">
            Privacy
          </Link>{" "}
          for static vs stored dynamics.
        </li>
        <li>
          Compare with our{" "}
          <Link
            href="/guides/qrfy-alternative"
            className="text-[var(--brand-2)] underline"
          >
            QRfy alternative
          </Link>{" "}
          notes if you are shopping broadly.
        </li>
      </ol>

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
