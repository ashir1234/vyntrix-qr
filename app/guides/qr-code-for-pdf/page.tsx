import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-pdf";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Can a QR code store a PDF file directly?",
    a: "No. QR codes hold a small amount of data, so they store a link. Host the PDF online and encode its URL.",
  },
  {
    q: "Where can I host a PDF for free?",
    a: "Google Drive, Dropbox, or your own website all work. Make sure the link is public and points directly to the file.",
  },
  {
    q: "How do I update the PDF later?",
    a: "Use a dynamic QR code. You can swap the destination to a new file without changing the printed code.",
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

export default function PdfGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "PDF QR", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">QR code for a PDF</strong>{" "}
        lets anyone open your document — a brochure, manual, or menu — with a
        scan. The code links to the file rather than storing it.
      </p>

      <GuideCta label="Create a PDF QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Upload your PDF somewhere public and copy the direct link.</li>
        <li>
          Paste the link into the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>
          .
        </li>
        <li>
          Enable{" "}
          <Link href="/guides/dynamic-qr-code" className="text-[var(--brand-2)] underline">
            Dynamic QR
          </Link>{" "}
          so you can replace the file later.
        </li>
        <li>Style it and download PNG or SVG.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Keep the PDF small so it loads fast on mobile data.</li>
        <li>Confirm the link opens without a login prompt.</li>
        <li>Consider a web page instead of a PDF for better readability.</li>
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
