import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-whatsapp";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What link opens a WhatsApp chat?",
    a: "Use https://wa.me/<number> with the full international number and no plus sign, spaces, or dashes — for example https://wa.me/14155552671.",
  },
  {
    q: "Can I pre-fill a message?",
    a: "Yes. Add ?text=your%20message to the link, e.g. https://wa.me/14155552671?text=Hi%20there. Keep it short and URL-encoded.",
  },
  {
    q: "Does it work with WhatsApp Business?",
    a: "Yes. The same wa.me link works for both personal and Business numbers.",
  },
  {
    q: "Do people need the WhatsApp app?",
    a: "On phones, wa.me typically opens the app if installed, or prompts to get it. On desktop it may open WhatsApp Web depending on the device.",
  },
  {
    q: "Should the WhatsApp QR be static or dynamic?",
    a: "Static is fine if the number never changes. Use dynamic if you might switch numbers, route to different teams, or want scan analytics.",
  },
  {
    q: "Can I track scans?",
    a: "Yes — create a dynamic QR that redirects to your wa.me link. You will see scan counts while the printed code stays the same.",
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

export default function WhatsappGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "WhatsApp QR", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">WhatsApp QR code</strong>{" "}
        opens a chat with your number — optionally with a message already typed.
        Support desks, sales teams, clinics, and creators use them on posters,
        packaging, and receipts so customers never hunt for the right contact.
      </p>

      <GuideCta label="Create a WhatsApp QR code" />

      <h2 className="mt-10 text-2xl font-semibold">How the link works</h2>
      <p className="mt-3 text-[var(--muted)]">
        WhatsApp publishes click-to-chat URLs under{" "}
        <span className="font-mono text-sm text-[var(--foreground)]">
          https://wa.me/&lt;number&gt;
        </span>
        . The number must be full international format with digits only — no{" "}
        <span className="font-mono text-[var(--foreground)]">+</span>, spaces, or
        dashes. Example: US{" "}
        <span className="font-mono text-sm text-[var(--foreground)]">
          +1 415 555 2671
        </span>{" "}
        becomes{" "}
        <span className="font-mono text-sm text-[var(--foreground)]">
          https://wa.me/14155552671
        </span>
        .
      </p>
      <p className="mt-3 text-[var(--muted)]">
        Pre-fill text with{" "}
        <span className="font-mono text-sm text-[var(--foreground)]">
          ?text=
        </span>{" "}
        and URL-encoded spaces (%20). Example:{" "}
        <span className="break-all font-mono text-sm text-[var(--foreground)]">
          https://wa.me/14155552671?text=Hi%20—%20I%20saw%20your%20poster
        </span>
        .
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Build and test your wa.me link in a phone browser first.</li>
        <li>
          Paste it into the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          URL field.
        </li>
        <li>
          Optional: enable a{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic QR
          </Link>{" "}
          for analytics or future number changes.
        </li>
        <li>Add brand colors or a logo, then download PNG or SVG.</li>
        <li>
          Size for print distance —{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            size guide
          </Link>
          .
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Double-check country code; most failures are wrong numbers.</li>
        <li>Keep pre-filled messages short and friendly.</li>
        <li>Label the code (“Chat with support on WhatsApp”) so intent is clear.</li>
        <li>Use a Business number for customer-facing materials when possible.</li>
        <li>Staff the inbox — a QR that opens chat creates expectation of reply.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Where it works well</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Storefront posters and counter tents</li>
        <li>Product inserts and packaging</li>
        <li>Event badges and booth banners</li>
        <li>Invoice footers and delivery notes</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Including “+” or spaces inside the wa.me path</li>
        <li>Encoding a personal number you do not monitor for leads</li>
        <li>Overlong pre-filled text that looks spammy</li>
        <li>Printing static codes for a number you plan to retire next quarter</li>
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
