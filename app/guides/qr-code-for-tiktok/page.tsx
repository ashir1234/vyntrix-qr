import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-tiktok";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Should I link my profile or a video?",
    a: "Profiles are best for ongoing growth. Video links are better for campaign-specific posters and packaging.",
  },
  {
    q: "Will it open the TikTok app?",
    a: "Usually yes when TikTok is installed; otherwise it opens in the browser.",
  },
  {
    q: "Can I change the video later?",
    a: "With a dynamic QR code you can update the destination without reprinting.",
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

export default function TikTokGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "TikTok QR", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">TikTok QR code</strong>{" "}
        opens your profile or a specific video — perfect for packaging,
        influencer collabs, and event signage.
      </p>

      <GuideCta label="Create a TikTok QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Share your profile or video → Copy link (e.g.{" "}
          <span className="font-mono text-sm text-[var(--foreground)]">
            tiktok.com/@you
          </span>
          ).
        </li>
        <li>
          Paste into the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>
          .
        </li>
        <li>Optional: enable Dynamic QR to measure campaign scans.</li>
        <li>Export PNG/SVG and place on print or packaging.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>On small labels, keep the code at least ~2 cm (0.8 in) wide.</li>
        <li>High contrast beats heavy filters for reliable scans.</li>
        <li>Caption the action: “Scan to watch on TikTok.”</li>
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
