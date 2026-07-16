import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-youtube";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What link should a YouTube QR code use?",
    a: "Use the full video URL (https://youtu.be/VIDEO_ID) or your channel URL (https://youtube.com/@handle). Both open in the app or browser.",
  },
  {
    q: "Can I track scans on my YouTube QR code?",
    a: "Yes. Enable a dynamic QR code to see scan counts and devices in your analytics dashboard.",
  },
  {
    q: "Can I change which video the code points to?",
    a: "With a dynamic code, yes — swap the destination anytime without reprinting.",
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

export default function YoutubeGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "YouTube QR", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">YouTube QR code</strong>{" "}
        opens your video or channel with one scan — perfect for packaging,
        thumbnails, events, and print ads.
      </p>

      <GuideCta label="Create a YouTube QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Copy your video or channel URL.</li>
        <li>
          Paste it into the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>
          .
        </li>
        <li>
          Enable{" "}
          <Link href="/guides/dynamic-qr-code" className="text-[var(--brand-2)] underline">
            Dynamic QR
          </Link>{" "}
          to track scans or change the video later.
        </li>
        <li>Style it and download PNG or SVG.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Add a &ldquo;Scan to watch&rdquo; caption.</li>
        <li>Use high contrast so it reads over busy artwork.</li>
        <li>Test the scan on a printed sample first.</li>
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
