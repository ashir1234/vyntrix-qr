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
    a: "About 100–130 pixels wide keeps signatures tidy while remaining scannable on phone screens. Avoid going below 80 px — modules become too dense for some cameras.",
  },
  {
    q: "What should it open?",
    a: "Popular choices: Calendly or booking page, company website, LinkedIn profile, or a vCard/contact page. Pick one primary action — not three competing destinations.",
  },
  {
    q: "Will Gmail and Outlook show it?",
    a: "Yes if the image is embedded or hosted on a reliable HTTPS URL. Some clients block images until the recipient clicks “Show images.” The QR still works once visible.",
  },
  {
    q: "Should I link the image itself?",
    a: "Optional but helpful on desktop: clicking the image can open the same URL the QR encodes. Mobile users will scan with the camera instead.",
  },
  {
    q: "Static or dynamic for signatures?",
    a: "Dynamic lets you change the booking link or track scans without updating every employee’s signature template. Static is fine for a stable company homepage.",
  },
  {
    q: "Can I use a vCard QR in email?",
    a: "Yes. A compact vCard QR works well for sales and field teams. See the vCard guide for field limits — very long addresses may need a short landing page instead.",
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
        turns every outgoing message into a scannable call-to-action — book a
        call, save a contact, or visit your site without hunting for links.
        Sales teams, recruiters, consultants, and founders add them beside a
        logo or social icons. Generate a compact PNG in{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>
        .
      </p>

      <GuideCta label="Create a signature QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Why put a QR in email?</h2>
      <p className="mt-3 text-[var(--muted)]">
        Email links work on desktop, but mobile recipients often read on a
        phone where tapping tiny URLs is awkward — especially in long thread
        quotes. A QR in the signature lets someone on a second device (or a
        colleague across the desk) scan and land on your booking page instantly.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        It also helps in-person follow-ups: after a meeting, your last email
        still carries a scannable path to your calendar or{" "}
        <Link
          href="/guides/qr-code-for-linkedin"
          className="text-[var(--brand-2)] underline"
        >
          LinkedIn
        </Link>
        .
      </p>

      <h2 className="mt-10 text-2xl font-semibold">When to use one</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>High-touch sales where booking speed matters</li>
        <li>Recruiters linking to open roles or scheduling screens</li>
        <li>Freelancers with a portfolio or case-study page</li>
        <li>Support leads who want WhatsApp or chat — pair with channel-specific guides</li>
        <li>Events staff whose signature promotes registration or feedback forms</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Steps (Gmail and Outlook)</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Choose one destination: booking URL, site,{" "}
          <Link
            href="/guides/vcard-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            vCard page
          </Link>
          , or LinkedIn.
        </li>
        <li>
          Create the code in the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>
          . Use simple black-on-white for small signature sizes.
        </li>
        <li>
          Optional: use a{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic QR
          </Link>{" "}
          so marketing can swap the landing page company-wide.
        </li>
        <li>
          Download PNG (~120 px wide). Transparent background optional if your
          signature block is dark.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Gmail:</strong> Settings
          → See all settings → General → Signature → insert image.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Outlook:</strong> File →
          Options → Mail → Signatures → insert picture.
        </li>
        <li>Send yourself a test email. Scan from your phone with images enabled.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Layout tips</h2>
      <p className="mt-3 text-[var(--muted)]">
        Place the QR to the right of your contact block or below social icons —
        not in the middle of legal disclaimers. Add a 2–3 word label (“Book a
        call”) in alt text for accessibility and for clients that hide images.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        Keep total signature height reasonable. Large QR blocks push reply text
        down and look spammy on mobile. One code beats three.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Prefer PNG with strong contrast; skip decorative gradients at small sizes.</li>
        <li>One clear CTA — do not stack booking, LinkedIn, and survey codes.</li>
        <li>Host the image on HTTPS if your client requires a URL rather than embed.</li>
        <li>Use dynamic links for team rollouts you may update quarterly.</li>
        <li>
          Match your{" "}
          <Link
            href="/guides/qr-code-for-business-card"
            className="text-[var(--brand-2)] underline"
          >
            business card QR
          </Link>{" "}
          destination for consistent branding.
        </li>
        <li>Test with images blocked and with images shown.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>QR so small that modules blur on retina displays</li>
        <li>Linking to a page that requires login before booking</li>
        <li>Using a personal Calendly on a shared support@ address</li>
        <li>Heavy logo inside the code at signature dimensions</li>
        <li>Forgetting alt text — recipients see a broken-image box</li>
        <li>Static QR to a campaign URL that expires after the promo</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Related guides</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <Link
            href="/guides/vcard-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            vCard QR code
          </Link>{" "}
          — save contact from a scan
        </li>
        <li>
          <Link
            href="/guides/qr-code-for-business-card"
            className="text-[var(--brand-2)] underline"
          >
            Business card QR
          </Link>{" "}
          — same link on card and email
        </li>
        <li>
          <Link
            href="/guides/qr-code-for-google-form"
            className="text-[var(--brand-2)] underline"
          >
            Google Form QR
          </Link>{" "}
          — feedback after support threads
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
