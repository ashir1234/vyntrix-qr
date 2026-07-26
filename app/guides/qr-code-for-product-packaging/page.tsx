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
    a: "As a rule of thumb, at least 2×2 cm (≈0.8 in) for close scans — larger if people scan from farther away or the surface is curved.",
  },
  {
    q: "Should packaging use dynamic QR codes?",
    a: "Usually yes. Manuals, support URLs, and promo pages change after products ship. Dynamic codes avoid reprinting inventory.",
  },
  {
    q: "Can I put a logo in the middle?",
    a: "Yes, if contrast stays high and you leave a quiet zone. Test on real packaging material before a full run.",
  },
  {
    q: "What should the code link to?",
    a: "Setup guides, how-to videos, warranty registration, refill orders, recycling info, or authenticity checks — one clear primary job per code.",
  },
  {
    q: "SVG or PNG for label printers?",
    a: "SVG (or high-DPI PDF/PNG from Pro print pack) for press work. Soft low-res PNGs blur on flexographic labels.",
  },
  {
    q: "Do curved bottles break scanning?",
    a: "They can. Print larger, keep the code on a flatter panel when possible, and proof on the real bottle.",
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
        refill links — without crowding the label. Because packaging lives for
        years, plan for change with{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic QR codes
        </Link>
        .
      </p>

      <GuideCta label="Create a packaging QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Pick one job for the code</h2>
      <p className="mt-3 text-[var(--muted)]">
        The best packaging codes do one thing well: open the setup guide, start
        warranty registration, or reorder consumables. A landing page can offer
        secondary links, but the scan promise on the box should be a single
        sentence (“Scan for setup”).
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Host a mobile support or product page (HTTPS).</li>
        <li>
          Create a dynamic QR in the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          so manuals can move without new packaging plates.
        </li>
        <li>
          Brand carefully —{" "}
          <Link
            href="/guides/qr-code-with-logo"
            className="text-[var(--brand-2)] underline"
          >
            logo tips
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
        <li>Proof on the real substrate (gloss, kraft, shrink wrap, bottle).</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Do not rely on ultra-low-contrast fancy styling.</li>
        <li>Caption the benefit next to the code.</li>
        <li>Prefer SVG / Pro print pack for high-DPI label runs.</li>
        <li>Keep URLs short (dynamic helps) so modules stay readable.</li>
        <li>
          Read{" "}
          <Link
            href="/blog/static-vs-dynamic-qr-cost"
            className="text-[var(--brand-2)] underline"
          >
            when free codes become expensive
          </Link>{" "}
          if you are debating reprint risk.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Static codes baked into a 50,000-unit run</li>
        <li>Codes printed over metallic ink with no white underlay</li>
        <li>Tiny marks on curved surfaces without a physical proof</li>
        <li>Linking to a desktop-only PDF that fails on phones</li>
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
