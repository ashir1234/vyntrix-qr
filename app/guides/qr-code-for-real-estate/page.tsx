import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-real-estate";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Should I use a dynamic QR on yard signs?",
    a: "Yes. Prices, status, and tour links change. Dynamic codes let you update the destination without reprinting the sign.",
  },
  {
    q: "Zillow/Realtor vs my own site?",
    a: "Either works. Your site captures leads more easily; portals feel familiar. Dynamic QR lets you switch later.",
  },
  {
    q: "How big should the code be on a yard sign?",
    a: "Large enough to scan from a few meters — think several centimeters on a side, high contrast, with a clear caption.",
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

export default function RealEstateGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Real estate QR", href: `/guides/${slug}` },
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
        A{" "}
        <strong className="text-[var(--foreground)]">real estate QR code</strong>{" "}
        on a yard sign turns drive-by interest into listing views — photos,
        price, and a contact form without stuffing the board.
      </p>

      <GuideCta label="Create a listing QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Pick the destination: listing page, virtual tour, or lead form.</li>
        <li>
          Create a{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic QR
          </Link>{" "}
          in the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          so you can edit later.
        </li>
        <li>Export a high-contrast PNG for outdoor print.</li>
        <li>Add “Scan for photos &amp; details” under the code.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Weather-resistant print and strong black/white contrast.</li>
        <li>Track scans to see which signs perform.</li>
        <li>
          See also{" "}
          <Link
            href="/qr-code-for/real-estate"
            className="text-[var(--brand-2)] underline"
          >
            QR code for real estate
          </Link>
          .
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
