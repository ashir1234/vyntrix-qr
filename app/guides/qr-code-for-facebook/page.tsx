import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-facebook";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Should I use my Page URL or profile URL?",
    a: "Businesses should use the public Facebook Page URL. Personal profiles work too if that’s what you want people to open.",
  },
  {
    q: "Is this the same as Facebook’s built-in QR code?",
    a: "No. Facebook’s in-app QR is proprietary. A standard URL QR works with any phone camera and can match your brand.",
  },
  {
    q: "Can I track how many people scanned it?",
    a: "Yes — create a dynamic QR that redirects to Facebook and view scans in your dashboard.",
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

export default function FacebookGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Facebook QR", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">Facebook QR code</strong>{" "}
        sends people to your Page or profile instantly — one of the easiest ways
        to grow followers from offline traffic.
      </p>

      <GuideCta label="Create a Facebook QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Open your Page → Share → Copy link (e.g.{" "}
          <span className="font-mono text-sm text-[var(--foreground)]">
            facebook.com/YourPage
          </span>
          ).
        </li>
        <li>
          Paste it in the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          URL field.
        </li>
        <li>Optional: turn on Dynamic QR for scan analytics.</li>
        <li>Style and download PNG or SVG for print.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Use a stable Page URL, not a temporary share dialog link.</li>
        <li>Keep strong contrast and a quiet zone around the code.</li>
        <li>Caption it “Follow us on Facebook.”</li>
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
