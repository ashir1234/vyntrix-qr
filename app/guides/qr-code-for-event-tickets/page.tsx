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
    a: "Each ticket carries a unique link or code. Staff scan it at the door to validate entry, which speeds up lines and reduces fraud.",
  },
  {
    q: "Can one QR code work for every ticket?",
    a: "For simple events you can use a single link to an info or check-in page. For paid or seated events, generate a unique code per ticket.",
  },
  {
    q: "Do attendees need an app to scan?",
    a: "No — any modern phone camera opens the link. Only the organizer's check-in scanner needs to validate codes.",
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
        <strong className="text-[var(--foreground)]">QR codes on event tickets</strong>{" "}
        make check-in fast and contactless. Attendees show a code; you scan to
        validate — no paper lists, no long lines.
      </p>

      <GuideCta label="Create an event QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Decide on a single info link or unique per-ticket codes.</li>
        <li>
          Create the code in the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          and brand it for your event.
        </li>
        <li>
          Use a{" "}
          <Link href="/guides/dynamic-qr-code" className="text-[var(--brand-2)] underline">
            dynamic code
          </Link>{" "}
          to track scans and update details.
        </li>
        <li>Add the code to digital and printed tickets.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Print at 2.5&times;2.5 cm or larger for quick door scans.</li>
        <li>Keep high contrast; avoid printing over photos.</li>
        <li>Have a manual fallback in case a phone screen is dim or cracked.</li>
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
