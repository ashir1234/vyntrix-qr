import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-linkedin";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Can I use a company page instead of my profile?",
    a: "Yes. Paste your company page URL when you want scanners to follow the brand, not a person.",
  },
  {
    q: "Does LinkedIn need a special QR format?",
    a: "No. A normal URL QR to linkedin.com/in/you or your company page is enough.",
  },
  {
    q: "Where should I put it?",
    a: "Business cards, name badges, booth banners, and email signatures all work well.",
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

export default function LinkedInGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "LinkedIn QR", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">LinkedIn QR code</strong>{" "}
        helps people connect with you in one scan at conferences and meetings —
        faster than spelling your name.
      </p>

      <GuideCta label="Create a LinkedIn QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Copy your vanity URL:{" "}
          <span className="font-mono text-sm text-[var(--foreground)]">
            linkedin.com/in/your-name
          </span>
          .
        </li>
        <li>
          Paste it in the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>
          .
        </li>
        <li>
          Optional: use{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            Dynamic QR
          </Link>{" "}
          to switch between personal and company pages later.
        </li>
        <li>Download a print-ready PNG or SVG.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Claim a short vanity URL before printing cards.</li>
        <li>Pair with a vCard QR if you also want phone/email saved offline.</li>
        <li>Test the scan on iOS and Android before a big print run.</li>
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
