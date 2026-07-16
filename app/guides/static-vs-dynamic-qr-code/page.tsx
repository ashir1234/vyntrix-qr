import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "static-vs-dynamic-qr-code";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What is the main difference?",
    a: "A static QR code encodes the destination directly and can't be changed. A dynamic QR code encodes a short link you can re-point anytime, and it records scan analytics.",
  },
  {
    q: "Do static QR codes expire?",
    a: "No. Static codes work forever because the data is baked in. Dynamic codes rely on a redirect service staying online.",
  },
  {
    q: "Which is better for marketing?",
    a: "Dynamic — you can fix typos, change campaigns, and measure scans without reprinting.",
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

export default function StaticVsDynamicGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Static vs dynamic", href: `/guides/${slug}` },
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
        Both static and{" "}
        <Link href="/guides/dynamic-qr-code" className="text-[var(--brand-2)] underline">
          dynamic QR codes
        </Link>{" "}
        scan the same way. The difference is what happens behind the code — and
        whether you can change it later.
      </p>

      <GuideCta label="Create your QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Side by side</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left">
              <th className="py-2 pr-4 font-semibold">Feature</th>
              <th className="py-2 pr-4 font-semibold">Static</th>
              <th className="py-2 font-semibold">Dynamic</th>
            </tr>
          </thead>
          <tbody className="text-[var(--muted)]">
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4">Editable after printing</td>
              <td className="py-2 pr-4">No</td>
              <td className="py-2">Yes</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4">Scan analytics</td>
              <td className="py-2 pr-4">No</td>
              <td className="py-2">Yes</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4">Works forever offline</td>
              <td className="py-2 pr-4">Yes</td>
              <td className="py-2">Needs redirect online</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Best for</td>
              <td className="py-2 pr-4">WiFi, vCards, fixed links</td>
              <td className="py-2">Marketing, menus, campaigns</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-semibold">When to use each</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <strong className="text-[var(--foreground)]">Static:</strong> content
          that never changes — WiFi credentials, a vCard, a permanent URL.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Dynamic:</strong> anything
          you might update or want to measure — menus, promos, review links.
        </li>
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
