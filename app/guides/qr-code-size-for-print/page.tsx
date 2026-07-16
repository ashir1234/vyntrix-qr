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
        works every time; too small and it fails.
      </p>

      <GuideCta label="Create a print-ready QR code" />

      <h2 className="mt-10 text-2xl font-semibold">The 10:1 distance rule</h2>
      <p className="mt-3 text-[var(--muted)]">
        Make the code about one-tenth of the scanning distance. Use this as a
        quick reference:
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
              <td className="py-2 pr-4">Poster</td>
              <td className="py-2 pr-4">~1.5 m</td>
              <td className="py-2">15&times;15 cm</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Billboard</td>
              <td className="py-2 pr-4">~10 m</td>
              <td className="py-2">~1&times;1 m</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Keep a quiet zone (empty margin) of at least 4 modules around it.</li>
        <li>
          Export{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            SVG
          </Link>{" "}
          for crisp scaling, or PNG at 300 DPI.
        </li>
        <li>Maintain high contrast — dark code on a light background.</li>
        <li>Shorten long URLs (or use a dynamic code) for a simpler pattern.</li>
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
