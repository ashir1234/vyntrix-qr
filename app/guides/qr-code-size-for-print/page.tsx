import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-size-for-print";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What is the 10:1 rule for QR codes?",
    a: "Scan distance should be about 10 times the code's width. A 3 cm code scans well from ~30 cm; a billboard viewed from 10 m needs a code roughly 1 m wide.",
  },
  {
    q: "What's the minimum QR code size?",
    a: "Around 2 x 2 cm (0.8 inch) for close-up scanning. Go larger if the code has a logo, heavy styling, or a long URL.",
  },
  {
    q: "Should I export PNG or SVG for print?",
    a: "SVG is best — it's vector and stays sharp at any size. If you use PNG, export at high resolution (300 DPI at final print size).",
  },
  {
    q: "Does a logo mean I need a bigger code?",
    a: "Often yes. Logos cover modules and need higher error correction. Give yourself extra size and always test-scan a proof.",
  },
  {
    q: "Why does my printed QR fail but the screen preview works?",
    a: "Usually size, contrast, glare from lamination, or low-DPI rasterization. Re-export SVG or a larger PNG and check quiet zone margins.",
  },
  {
    q: "How much quiet zone do I need?",
    a: "Leave an empty margin of at least four modules (the small squares) on all sides. Crowding the code against edges or photos breaks scanning.",
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

export default function PrintSizeGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "QR code size", href: `/guides/${slug}` },
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
        The right{" "}
        <strong className="text-[var(--foreground)]">QR code size for print</strong>{" "}
        depends on how far away people scan from. Get it right and your code
        works every time; too small and even a perfect design fails. Use this
        guide before you send files to a printer.
      </p>

      <GuideCta label="Create a print-ready QR code" />

      <h2 className="mt-10 text-2xl font-semibold">The 10:1 distance rule</h2>
      <p className="mt-3 text-[var(--muted)]">
        A practical rule of thumb: make the code about{" "}
        <strong className="text-[var(--foreground)]">
          one-tenth of the scanning distance
        </strong>
        . Someone standing 30 cm from a flyer needs roughly a 3 cm code; someone
        3 m from a poster needs about 30 cm. Real-world lighting, phone cameras,
        and glossy finishes can require going larger — treat 10:1 as a minimum,
        not a maximum.
      </p>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left">
              <th className="py-2 pr-4 font-semibold">Use case</th>
              <th className="py-2 pr-4 font-semibold">Scan distance</th>
              <th className="py-2 font-semibold">Min. code size</th>
            </tr>
          </thead>
          <tbody className="text-[var(--muted)]">
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4">Business card</td>
              <td className="py-2 pr-4">~10 cm</td>
              <td className="py-2">2&times;2 cm</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4">Flyer / menu</td>
              <td className="py-2 pr-4">~30 cm</td>
              <td className="py-2">3&times;3 cm</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4">Product packaging</td>
              <td className="py-2 pr-4">~20–40 cm</td>
              <td className="py-2">2.5–4 cm</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4">Poster / window</td>
              <td className="py-2 pr-4">~1.5 m</td>
              <td className="py-2">15&times;15 cm</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Billboard / banner</td>
              <td className="py-2 pr-4">~10 m</td>
              <td className="py-2">~1&times;1 m</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-semibold">
        Factors that force you larger
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <strong className="text-[var(--foreground)]">Logo overlays</strong> —
          cover modules and need higher error correction; see{" "}
          <Link
            href="/guides/qr-code-with-logo"
            className="text-[var(--brand-2)] underline"
          >
            QR with logo
          </Link>
          .
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Long URLs</strong> — denser
          patterns. Prefer short links or a{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic QR
          </Link>
          .
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Low contrast</strong> —
          colored or photographic backgrounds reduce effective readability.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Motion / distance</strong>{" "}
          — vehicle wraps and hallway signs need extra margin beyond 10:1.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Curved surfaces</strong> —
          bottles and cans distort modules; print larger and test on the real
          object.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">PNG vs SVG for print</h2>
      <p className="mt-3 text-[var(--muted)]">
        Export{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          SVG
        </Link>{" "}
        whenever your printer accepts vector files — it scales cleanly to any
        size. If you must use PNG, size the image so that at final print
        dimensions you still have about{" "}
        <strong className="text-[var(--foreground)]">300 DPI</strong>. Upscaling
        a tiny PNG for a poster is a common cause of failed scans.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        Pro plans also include higher-resolution print pack options (4K PNG and
        PDF) when you need press-ready assets —{" "}
        <Link href="/pricing" className="text-[var(--brand-2)] underline">
          see Pricing
        </Link>
        .
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Quiet zone and contrast</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Keep an empty margin of at least 4 modules around the code.</li>
        <li>Prefer dark modules on a light, solid background.</li>
        <li>Avoid placing codes over busy photos or gradients without a solid pad.</li>
        <li>Watch for glare from glossy laminate under store lighting.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Proofing checklist</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Print a single proof at final size (or a scaled mock if huge).</li>
        <li>Scan with iPhone and Android in the real lighting of the venue.</li>
        <li>Try from the farthest distance you expect customers to stand.</li>
        <li>Confirm the destination (especially for dynamic redirects).</li>
        <li>Only then approve the full print run.</li>
      </ol>

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
