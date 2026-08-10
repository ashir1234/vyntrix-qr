import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-google-form";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Where do I find the Google Form link?",
    a: "Open the form → Send (paper plane) → Link tab → Shorten URL optional → Copy. Use the docs.google.com/forms/d/e/…/viewform URL, not an edit link.",
  },
  {
    q: "Can people fill it offline?",
    a: "No. Google Forms needs internet. The QR only opens the link. For offline collection, use paper backup or a native app with sync.",
  },
  {
    q: "How do scans relate to responses?",
    a: "Dynamic QR analytics count link opens. Google Forms counts submitted responses. Many people scan but do not finish — expect scans to exceed submissions.",
  },
  {
    q: "Should the form QR be static or dynamic?",
    a: "Dynamic lets you point the same printed code at a new form next semester or swap RSVP vs feedback URLs. Static is fine for a one-day event with a fixed form.",
  },
  {
    q: "Can I restrict who submits?",
    a: "Google Forms can require sign-in and limit to your organization. Test what external guests see before you print codes on public posters.",
  },
  {
    q: "How big should I print the QR?",
    a: "Posters and table tents: at least 2.5 cm, larger for auditorium walls. See the print size guide for viewing distance.",
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

export default function GoogleFormGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Google Form QR", href: `/guides/${slug}` },
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
        <strong className="text-[var(--foreground)]">Google Form QR code</strong>{" "}
        opens your survey, RSVP, or feedback form in one scan — no typing long
        URLs on a phone. Teachers, event hosts, retailers, and HR teams use them
        on posters, receipts, and classroom walls. Turn any form link into a
        scannable code in{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>
        .
      </p>

      <GuideCta label="Create a Google Form QR" />

      <h2 className="mt-10 text-2xl font-semibold">How it works</h2>
      <p className="mt-3 text-[var(--muted)]">
        Google Forms lives on the web. Your QR encodes the public{" "}
        <span className="font-mono text-sm text-[var(--foreground)]">
          viewform
        </span>{" "}
        URL. Scan → browser opens → respondent answers on mobile. Responses
        land in the linked Google Sheet automatically if you enabled that
        connection in the form settings.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        The QR does not embed the form itself — if you delete the form or change
        permissions, the code breaks. Always copy the responder link, not the
        editor URL.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">When to use one</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Event RSVPs and post-event feedback</li>
        <li>Classroom quizzes and attendance (with school policy in mind)</li>
        <li>Store counter “How did we do?” surveys</li>
        <li>Conference session ratings on exit slides</li>
        <li>Volunteer sign-ups and waiver collection</li>
        <li>
          Open-house guest registers alongside{" "}
          <Link
            href="/guides/qr-code-for-real-estate"
            className="text-[var(--brand-2)] underline"
          >
            real estate signs
          </Link>
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Steps to create one</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Build the form in Google Forms. Settings → collect emails if needed →
          limit to one response if appropriate.
        </li>
        <li>Send → Link → copy the URL. Open it on your phone in incognito to verify.</li>
        <li>
          Paste into the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          URL field.
        </li>
        <li>
          Optional: wrap with a{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic QR
          </Link>{" "}
          to reuse print across events or track scans.
        </li>
        <li>Download PNG for slides or SVG for large posters.</li>
        <li>
          Size for the room —{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            QR code size for print
          </Link>
          .
        </li>
        <li>Print with a clear caption: “Scan to RSVP” or “2-min survey.”</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Form design for mobile scanners</h2>
      <p className="mt-3 text-[var(--muted)]">
        Most respondents complete the form on the phone they scanned with. Keep
        questions short, use multiple choice over long paragraphs, and put
        required fields first. Enable progress bar in form settings so people
        know how much is left.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        Add a confirmation message thanking them — and a link to your site if
        the form is post-purchase feedback.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Test on iPhone and Android before the room fills up.</li>
        <li>Place the QR near the physical moment you want feedback.</li>
        <li>Use dynamic QR when the same poster frame serves multiple events.</li>
        <li>Check “Accepting responses” is ON on event day.</li>
        <li>Pre-fill fields with URL parameters when Google Forms supports them for your use case.</li>
        <li>
          Pair with{" "}
          <Link
            href="/guides/qr-code-for-event-tickets"
            className="text-[var(--brand-2)] underline"
          >
            event ticket QR
          </Link>{" "}
          workflows for check-in plus survey.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Encoding the edit URL — scanners see “request access”</li>
        <li>Requiring Google login when guests use personal Gmail inconsistently</li>
        <li>20-minute surveys on a exit poster — completion rates collapse</li>
        <li>Static QR on a template poster — forgot to change form link</li>
        <li>QR hidden in a slide corner too small for the back row</li>
        <li>Closing the form while posters still hang in the building</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Related guides</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <Link
            href="/guides/qr-code-for-event-tickets"
            className="text-[var(--brand-2)] underline"
          >
            Event ticket QR
          </Link>{" "}
          — registration before the form
        </li>
        <li>
          <Link
            href="/guides/qr-code-for-google-reviews"
            className="text-[var(--brand-2)] underline"
          >
            Google review QR
          </Link>{" "}
          — public reviews vs private feedback
        </li>
        <li>
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            Dynamic QR code
          </Link>{" "}
          — reuse printed signage
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
