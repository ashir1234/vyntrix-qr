import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-restaurant-menu";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Is a QR code menu free to make?",
    a: "Yes. On Vyntrix QR you can create and download a QR code that links to your menu for free, with no watermark.",
  },
  {
    q: "How do I update the menu without reprinting the code?",
    a: "Use a dynamic QR code. It points to a short link you can re-target anytime, so you can change prices or dishes without printing a new code.",
  },
  {
    q: "Should I link to a PDF or a web page?",
    a: "A mobile-friendly web page loads faster and is easier to read on phones. PDFs work but can be slow and require pinch-to-zoom.",
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

export default function RestaurantMenuGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "QR menu", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">QR code menu</strong> lets
        diners view your menu on their own phone — no app, no shared paper. Link
        it to a web page or PDF and update it anytime with a{" "}
        <Link href="/guides/dynamic-qr-code" className="text-[var(--brand-2)] underline">
          dynamic QR code
        </Link>
        .
      </p>

      <GuideCta label="Create a menu QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Host your menu online (a web page or a PDF link).</li>
        <li>
          Open the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          and paste the menu URL.
        </li>
        <li>
          Turn on <strong className="text-[var(--foreground)]">Dynamic QR</strong>{" "}
          so you can update the menu later without reprinting.
        </li>
        <li>Add your brand colors or logo in the Design panel.</li>
        <li>Download PNG for table tents or SVG for large signage.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Link to a fast, mobile-friendly page rather than a heavy PDF.</li>
        <li>Add a short caption like &ldquo;Scan for menu&rdquo;.</li>
        <li>Print at least 2&times;2 cm (0.8&quot;) for table use.</li>
        <li>Laminate table codes so they survive spills and cleaning.</li>
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
