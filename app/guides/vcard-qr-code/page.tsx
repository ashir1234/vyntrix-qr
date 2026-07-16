import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "vcard-qr-code";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What does a vCard QR code do?",
    a: "When scanned, it lets someone save your name, phone, email, company, and website as a contact on their phone.",
  },
  {
    q: "Are vCard QR codes free?",
    a: "Yes. Vyntrix QR lets you create and download free vCard QR codes with no watermark.",
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

export default function VcardGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "vCard QR", href: `/guides/${slug}` },
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
        <strong className="text-[var(--foreground)]">vCard QR code</strong>{" "}
        shares your contact details with one scan — perfect for business cards,
        badges, and email signatures. Build yours free in the{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Studio
        </Link>
        .
      </p>

      <GuideCta label="Create a vCard QR" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Open{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          and choose <strong className="text-[var(--foreground)]">vCard</strong>.
        </li>
        <li>Fill in name, organization, phone, email, and website.</li>
        <li>Customize colors or add a logo under Design.</li>
        <li>Download PNG/SVG and place it on your card or signature.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Tips</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Include only fields people need — shorter is better for scanning.</li>
        <li>Use an international phone format when possible (+country code).</li>
        <li>Test on iOS and Android before printing business cards.</li>
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
