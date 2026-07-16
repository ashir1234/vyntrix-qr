import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-instagram";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What URL should I use for an Instagram QR code?",
    a: "Use your profile URL in the form https://instagram.com/yourusername. Scanning it opens your profile in the app or browser.",
  },
  {
    q: "Can I track how many people scan it?",
    a: "Yes. Enable a dynamic QR code to see scan counts, devices, and dates in your analytics dashboard.",
  },
  {
    q: "Is this the same as an Instagram Nametag?",
    a: "No. A Nametag only works inside the Instagram app's scanner. A standard QR code works with any phone camera.",
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

export default function InstagramGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Instagram QR", href: `/guides/${slug}` },
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
        An <strong className="text-[var(--foreground)]">Instagram QR code</strong>{" "}
        lets people open and follow your profile with one scan — great for
        posters, packaging, and business cards. Any phone camera can read it.
      </p>

      <GuideCta label="Create an Instagram QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Copy your profile URL:{" "}
          <span className="font-mono text-[var(--foreground)]">
            https://instagram.com/yourusername
          </span>
          .
        </li>
        <li>
          Open the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          and paste it into the URL field.
        </li>
        <li>
          Optional: enable{" "}
          <Link href="/guides/dynamic-qr-code" className="text-[var(--brand-2)] underline">
            Dynamic QR
          </Link>{" "}
          to track scans.
        </li>
        <li>Style it with your brand colors or add your logo.</li>
        <li>Download PNG or SVG and place it anywhere.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Add a &ldquo;Follow us on Instagram&rdquo; caption.</li>
        <li>Keep strong contrast between the code and background.</li>
        <li>Test the scan before printing at scale.</li>
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
