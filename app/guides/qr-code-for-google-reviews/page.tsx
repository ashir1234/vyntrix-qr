import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-google-reviews";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Where do I get my Google review link?",
    a: "In your Google Business Profile, open 'Ask for reviews' to copy your unique review link, or use the Place ID review URL. Paste that into the QR generator.",
  },
  {
    q: "Can I change the link later?",
    a: "Yes, if you use a dynamic QR code. The printed code stays the same while you update the destination.",
  },
  {
    q: "Is it against Google's policy to ask for reviews?",
    a: "Asking customers for honest reviews is allowed. Offering incentives for reviews is not — keep it neutral.",
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

export default function GoogleReviewsGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Google review QR", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">Google review QR code</strong>{" "}
        takes customers straight to your review form. Put it on receipts, tables,
        and flyers to collect more reviews with a single scan.
      </p>

      <GuideCta label="Create a review QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Copy your Google review link from your Business Profile
          (&ldquo;Ask for reviews&rdquo;).
        </li>
        <li>
          Paste it into the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          URL field.
        </li>
        <li>
          Enable{" "}
          <Link href="/guides/dynamic-qr-code" className="text-[var(--brand-2)] underline">
            Dynamic QR
          </Link>{" "}
          to track scans and edit the link later.
        </li>
        <li>Brand it with your colors and download PNG or SVG.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Add a caption like &ldquo;Loved it? Leave us a review.&rdquo;</li>
        <li>Place codes where customers wait or pay.</li>
        <li>Never offer rewards in exchange for reviews.</li>
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
