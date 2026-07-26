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
    a: "In your Google Business Profile, open “Ask for reviews” to copy your unique review link, or use the Place ID review URL. Paste that into the QR generator.",
  },
  {
    q: "Can I change the link later?",
    a: "Yes, if you use a dynamic QR code. The printed code stays the same while you update the destination.",
  },
  {
    q: "Is it against Google's policy to ask for reviews?",
    a: "Asking customers for honest reviews is allowed. Offering incentives for reviews is not — keep it neutral.",
  },
  {
    q: "Should staff watch customers leave the review?",
    a: "No. Pressure or filtering reviews violates Google policies. Place the code, invite honestly, and step back.",
  },
  {
    q: "Can I track how many people scanned?",
    a: "Yes with a dynamic QR. Scans measure interest; they are not the same as completed reviews.",
  },
  {
    q: "Paper receipt or table tent?",
    a: "Both work. Receipts catch post-purchase moments; table tents work while guests wait. Test which your location actually uses.",
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
        A{" "}
        <strong className="text-[var(--foreground)]">
          Google review QR code
        </strong>{" "}
        takes customers straight to your review form. Put it on receipts, tables,
        and flyers to collect more reviews with a single scan — without making
        people search for your listing.
      </p>

      <GuideCta label="Create a review QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Get the right link</h2>
      <p className="mt-3 text-[var(--muted)]">
        In Google Business Profile, use{" "}
        <strong className="text-[var(--foreground)]">Ask for reviews</strong> to
        copy your unique review URL. That deep link opens the review composer
        more reliably than a generic Maps search. Confirm it on your phone before
        you print.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Copy your Google review link from Business Profile.</li>
        <li>
          Paste it into the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          URL field.
        </li>
        <li>
          Enable a{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic QR
          </Link>{" "}
          to track scans and edit the link later.
        </li>
        <li>Brand it with your colors and download PNG or SVG.</li>
        <li>
          Size for the placement —{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            print size guide
          </Link>
          .
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Caption: “Loved it? Leave us a review.”</li>
        <li>Place codes where customers wait or pay.</li>
        <li>Never offer rewards in exchange for reviews.</li>
        <li>Respond to reviews you receive — the QR starts the loop, service closes it.</li>
        <li>Train staff to invite, not pressure.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Policy reminder</h2>
      <p className="mt-3 text-[var(--muted)]">
        Google prohibits incentivized or fake reviews. A QR is a convenience tool,
        not a loophole. Keep the ask honest and optional.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Linking to a Maps search instead of the review form URL</li>
        <li>Printing static codes for a business that might transfer ownership</li>
        <li>Hiding the code on busy receipts without a caption</li>
        <li>Expecting every scan to become a five-star review</li>
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
