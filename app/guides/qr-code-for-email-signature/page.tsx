import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-email-signature";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What size should the QR be in an email signature?",
    a: "About 100–130 pixels wide keeps signatures tidy while remaining scannable on phone screens.",
  },
  {
    q: "What should it open?",
    a: "Popular choices: calendar booking, website, LinkedIn, or a vCard/contact page.",
  },
  {
    q: "Will Gmail and Outlook show it?",
    a: "Yes if the image is embedded or hosted. Some clients block images until the recipient allows them.",
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

export default function EmailSignatureGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Email signature", href: `/guides/${slug}` },
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
        An{" "}
        <strong className="text-[var(--foreground)]">
          email signature QR code
        </strong>{" "}
        turns every outgoing message into a scannable CTA — book a call, save a
        contact, or visit your site.
      </p>

      <GuideCta label="Create a signature QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Decide the destination (booking link, site, or LinkedIn).</li>
        <li>
          Generate a compact PNG in the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>
          .
        </li>
        <li>
          In Gmail/Outlook signature settings, insert the image. Optionally link
          the image to the same URL.
        </li>
        <li>Send yourself a test email and scan from your phone.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Prefer PNG with a transparent background.</li>
        <li>
          For contacts, consider a{" "}
          <Link
            href="/guides/vcard-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            vCard QR
          </Link>
          .
        </li>
        <li>Keep one clear CTA — don’t stack three competing codes.</li>
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
