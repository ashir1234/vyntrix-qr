import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-product-packaging";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What size should a packaging QR be?",
    a: "As a rule of thumb, at least 2×2 cm (≈0.8 in) for close scans — larger if people scan from farther away.",
  },
  {
    q: "Should packaging use dynamic QR codes?",
    a: "Usually yes. Manuals, support URLs, and promo pages change after products ship. Dynamic codes avoid reprinting inventory.",
  },
  {
    q: "Can I put a logo in the middle?",
    a: "Yes, if contrast stays high and you leave a quiet zone. Test on real packaging material before a full run.",
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

export default function PackagingGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Packaging QR", href: `/guides/${slug}` },
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
        <strong className="text-[var(--foreground)]">packaging QR code</strong>{" "}
        connects physical products to manuals, how-to videos, warranties, and
        refill links — without crowding the label.
      </p>

      <GuideCta label="Create a packaging QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Host a mobile support or product page (HTTPS).</li>
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
          </Link>
          .
        </li>
        <li>
          Follow{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            print size guidelines
          </Link>{" "}
          and leave a quiet zone.
        </li>
        <li>Proof on the real substrate (gloss, kraft, shrink wrap).</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Don’t rely on ultra-low-contrast fancy styling.</li>
        <li>Caption the benefit: “Scan for setup guide.”</li>
        <li>Pro print pack (4K PNG / PDF) helps high-DPI label runs.</li>
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
