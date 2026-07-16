import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-business-card";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Should I use a vCard or a link on my business card?",
    a: "A vCard QR saves your contact instantly offline. A link (to a page or dynamic code) lets you update details and track scans. Many people use a dynamic link.",
  },
  {
    q: "How small can the QR code be on a card?",
    a: "Aim for at least 2 x 2 cm (0.8 inch). Smaller codes can fail to scan, especially with logos or heavy styling.",
  },
  {
    q: "What file format should I send to my printer?",
    a: "Use SVG for crisp printing at any size. PNG at high resolution also works for standard cards.",
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

export default function BusinessCardGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Business card QR", href: `/guides/${slug}` },
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
        Adding a{" "}
        <strong className="text-[var(--foreground)]">QR code to your business card</strong>{" "}
        lets contacts save your details or open your site instantly — no typing.
        You can use a{" "}
        <Link href="/guides/vcard-qr-code" className="text-[var(--brand-2)] underline">
          vCard QR
        </Link>{" "}
        or a trackable link.
      </p>

      <GuideCta label="Create a business card QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Decide: a{" "}
          <Link href="/guides/vcard-qr-code" className="text-[var(--brand-2)] underline">
            vCard
          </Link>{" "}
          (offline contact) or a link (updatable + trackable).
        </li>
        <li>
          Fill in the details in the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>
          .
        </li>
        <li>Match your brand colors and add a logo if it stays scannable.</li>
        <li>Download SVG for the printer.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Keep the code at least 2&times;2 cm with a clear quiet zone.</li>
        <li>Test on iPhone and Android before printing a batch.</li>
        <li>Use a dynamic link if your role or number may change.</li>
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
