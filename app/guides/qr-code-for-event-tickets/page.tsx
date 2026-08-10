import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-event-tickets";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "How do QR code tickets work at check-in?",
    a: "Each ticket carries a unique URL or token. Staff scan it at the door with a phone or dedicated scanner; valid codes mark the guest as checked in. That cuts paper lists and reduces duplicate entry.",
  },
  {
    q: "Can one QR code work for every ticket?",
    a: "For free community events you can use one link to an info or RSVP page. For paid, seated, or multi-day events, generate a unique code per ticket so each scan can only be used once.",
  },
  {
    q: "Do attendees need an app to scan?",
    a: "No — any modern phone camera opens the link. Only door staff need a check-in tool (often the ticketing platform’s scanner app or a web dashboard).",
  },
  {
    q: "Digital ticket or printed — which is better?",
    a: "Digital PDFs and wallet passes are standard. Printed codes on badges still help when phone batteries die. Offer both when budget allows.",
  },
  {
    q: "Should event ticket QR codes be dynamic?",
    a: "Dynamic helps for marketing codes on posters (track interest) and for last-minute venue or schedule updates. Per-ticket validation usually comes from your ticketing vendor’s unique URLs, not the QR generator alone.",
  },
  {
    q: "What if the scan fails at the door?",
    a: "Have a manual lookup by name or confirmation email. Print codes at least 2.5 cm, high contrast, and test under venue lighting before doors open.",
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

export default function EventTicketsGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Event ticket QR", href: `/guides/${slug}` },
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
        <strong className="text-[var(--foreground)]">
          QR codes on event tickets
        </strong>{" "}
        make check-in fast and contactless. Attendees show a code on a phone or
        badge; staff scan to validate — no clipboard, no “what name is it under?”
        Concerts, conferences, galas, and school events rely on them daily. Design
        scannable codes in{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>
        .
      </p>

      <GuideCta label="Create an event QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Two common setups</h2>
      <p className="mt-3 text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">
          Ticketing platform codes:
        </strong>{" "}
        Eventbrite, Ticketmaster, and similar tools generate unique QR per order
        or attendee. You export tickets as PDF or wallet passes — the platform
        handles validation. Your job is print quality and door lighting.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">
          DIY / free events:
        </strong>{" "}
        One{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic QR
        </Link>{" "}
        on posters links to RSVP or a{" "}
        <Link
          href="/guides/qr-code-for-google-form"
          className="text-[var(--brand-2)] underline"
        >
          Google Form
        </Link>
        . For check-in lists, use unique links per guest (mail merge or
        spreadsheet tools) encoded as separate static codes.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">When to use ticket QR codes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Paid entry where duplicate scans must be blocked</li>
        <li>Multi-session conferences with different access levels</li>
        <li>Workshops and classes with capped seats</li>
        <li>VIP lounges and backstage passes</li>
        <li>Poster campaigns that funnel to registration before ticket issue</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Steps to create one</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Decide: platform-issued unique tickets vs your own links for a free
          event.
        </li>
        <li>
          For custom codes, paste each validation URL into the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          or batch via your ticketing export.
        </li>
        <li>Brand with event colors — keep modules dark on light for door scans.</li>
        <li>
          Export PNG/SVG. Size badges at least 2.5 × 2.5 cm —{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            size guide
          </Link>
          .
        </li>
        <li>Test under fluorescent and dim light; glare kills scans.</li>
        <li>Brief door staff on manual fallback and offline mode if the venue has weak signal.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Check-in day tips</h2>
      <p className="mt-3 text-[var(--muted)]">
        Open the scanner app before the queue forms. Bright sunlight on phone
        screens washes out codes — offer shade or increase screen brightness.
        Lanyard badges should hang flat; creased codes fail more often.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        For multi-gate venues, sync check-ins in real time so one ticket cannot
        enter twice at different doors. Most paid platforms handle this
        automatically.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Print at 2.5 × 2.5 cm or larger for quick door scans.</li>
        <li>High contrast; never print the code over a photo background.</li>
        <li>Include human-readable name and order ID beside the QR.</li>
        <li>Email tickets in PDF and offer “Add to Wallet” when available.</li>
        <li>Use dynamic codes on marketing posters to count interest before sales open.</li>
        <li>Run a dry-run scan with volunteers the day before.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Same static QR on every ticket — no way to stop pass-back entry</li>
        <li>Codes too small on wristbands or crumpled paper stubs</li>
        <li>Linking to a generic homepage instead of a check-in token</li>
        <li>No backup list when WiFi drops at the venue</li>
        <li>Inverted colors or low-contrast brand palettes on badges</li>
        <li>Forgetting time-zone and date in the ticket email — guests arrive wrong day</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Related guides</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <Link
            href="/guides/qr-code-for-google-form"
            className="text-[var(--brand-2)] underline"
          >
            Google Form QR
          </Link>{" "}
          — RSVPs before tickets ship
        </li>
        <li>
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            Dynamic QR code
          </Link>{" "}
          — track poster campaigns
        </li>
        <li>
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            QR size for print
          </Link>{" "}
          — badge and poster sizing
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
