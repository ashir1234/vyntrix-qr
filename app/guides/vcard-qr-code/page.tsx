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
    a: "When scanned, it lets someone save your name, phone, email, company, and website as a contact on their phone — no typing.",
  },
  {
    q: "Are vCard QR codes free?",
    a: "Yes. Vyntrix QR lets you create and download free vCard QR codes with no watermark.",
  },
  {
    q: "vCard QR vs link to my website?",
    a: "A vCard saves contact fields offline instantly. A URL (especially dynamic) is better if details change often or you want scan analytics.",
  },
  {
    q: "Do both iPhone and Android support vCard QR?",
    a: "Yes. Modern camera apps recognize MECARD/vCard payloads and offer to add a contact. Always test both before printing cards.",
  },
  {
    q: "How much information should I include?",
    a: "Only what people need. Extra fields make denser codes that need slightly larger print sizes.",
  },
  {
    q: "Can I brand a vCard QR with my logo?",
    a: "Yes — use Design in Studio. Keep the logo modest and contrast high so scanners still read the code.",
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
        badges, networking events, and email signatures. Build yours free in the{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Studio
        </Link>
        .
      </p>

      <GuideCta label="Create a vCard QR" />

      <h2 className="mt-10 text-2xl font-semibold">What gets saved</h2>
      <p className="mt-3 text-[var(--muted)]">
        A vCard (or MECARD-style) payload can include name, organization, title,
        phone, email, website, and address. Phones map those fields into the
        Contacts app. Unlike a website QR, the recipient does not need a data
        connection after the scan to store the card — useful at conferences with
        weak WiFi.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Open{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          and choose <strong className="text-[var(--foreground)]">vCard</strong>.
        </li>
        <li>
          Fill in the fields people actually need. Use{" "}
          <strong className="text-[var(--foreground)]">+country code</strong>{" "}
          phone format when you network internationally.
        </li>
        <li>Customize colors or add a logo under Design.</li>
        <li>
          Download PNG/SVG. For cards, keep the code around 2×2 cm minimum —
          see{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            print sizes
          </Link>
          .
        </li>
        <li>Test-scan on iOS and Android before ordering a box of cards.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">
        vCard vs dynamic link on a card
      </h2>
      <p className="mt-3 text-[var(--muted)]">
        Choose <strong className="text-[var(--foreground)]">vCard</strong> when
        the goal is “save my contact now.” Choose a{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic URL
        </Link>{" "}
        when you want a personal landing page you can update, or scan analytics.
        Many people print both: vCard for contacts, separate link for portfolio.
        More context:{" "}
        <Link
          href="/guides/qr-code-for-business-card"
          className="text-[var(--brand-2)] underline"
        >
          QR on business cards
        </Link>
        .
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Tips</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Shorter payloads scan more reliably at small sizes.</li>
        <li>Keep work and personal numbers intentional — do not mix by accident.</li>
        <li>Match brand colors carefully; contrast beats cleverness.</li>
        <li>
          For email signatures, prefer a small PNG and a visible URL fallback —
          {" "}
          <Link
            href="/guides/qr-code-for-email-signature"
            className="text-[var(--brand-2)] underline"
          >
            email signature guide
          </Link>
          .
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Printing too small in a busy card corner</li>
        <li>Leaving out the country code for international contacts</li>
        <li>Encoding a personal email you no longer check</li>
        <li>Skipping the real-device test before a 500-card order</li>
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
