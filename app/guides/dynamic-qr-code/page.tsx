import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "dynamic-qr-code";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What is the difference between static and dynamic QR codes?",
    a: "A static QR encodes the final destination forever. A dynamic QR encodes a short link you can re-point later, and it can collect scan analytics.",
  },
  {
    q: "Can I change a printed QR code’s destination?",
    a: "Only if it is dynamic. With Vyntrix QR dynamic links, update the destination anytime without reprinting.",
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

export default function DynamicGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Dynamic QR", href: `/guides/${slug}` },
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
        <strong className="text-[var(--foreground)]">dynamic QR code</strong>{" "}
        points to a short redirect link. You can edit the destination after
        printing and track scans — ideal for campaigns, menus, packaging, and
        posters. Create one free in the{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>
        .
      </p>

      <GuideCta label="Create a dynamic QR" />

      <h2 className="mt-10 text-2xl font-semibold">When to use dynamic QR</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Print materials that may need URL updates later</li>
        <li>Marketing campaigns where you want scan counts</li>
        <li>Seasonal offers or event pages that change often</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">How to create one</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Open{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          with type set to URL.
        </li>
        <li>
          Enable <strong className="text-[var(--foreground)]">Dynamic QR</strong>{" "}
          and create a short link.
        </li>
        <li>
          Save your edit token — it unlocks analytics and destination updates.
        </li>
        <li>Download and print the QR. Update the destination anytime from Manage.</li>
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
