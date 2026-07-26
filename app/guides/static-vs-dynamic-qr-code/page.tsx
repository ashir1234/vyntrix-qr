import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "static-vs-dynamic-qr-code";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What is the main difference?",
    a: "A static QR code encodes the destination directly and can't be changed. A dynamic QR code encodes a short link you can re-point anytime, and it records scan analytics.",
  },
  {
    q: "Do static QR codes expire?",
    a: "No. Static codes work forever because the data is baked in. Dynamic codes rely on a redirect service staying online.",
  },
  {
    q: "Which is better for marketing?",
    a: "Dynamic — you can fix typos, change campaigns, and measure scans without reprinting.",
  },
  {
    q: "Are static codes always free?",
    a: "On Vyntrix QR, unlimited static codes are free with no watermark. Dynamic codes need an account (1 free) or Pro for unlimited.",
  },
  {
    q: "Can I convert a printed static code into a dynamic one?",
    a: "No. You would need to print a new QR that points at a short link. Plan ahead if print costs are high.",
  },
  {
    q: "Do WiFi and vCard codes need to be dynamic?",
    a: "Usually no. Classic WiFi and vCard payloads are fine as static. Use dynamic when you want a landing page, tracking, or editable credentials/links.",
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

export default function StaticVsDynamicGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Static vs dynamic", href: `/guides/${slug}` },
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
        Both static and{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic QR codes
        </Link>{" "}
        scan the same way on a phone camera. The difference is what is encoded
        behind the pattern — and whether you can change it later without
        reprinting.
      </p>

      <GuideCta label="Create your QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Quick definitions</h2>
      <p className="mt-3 text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">Static:</strong> the QR
        contains the final payload (full URL, WiFi string, vCard, text). What
        you print is what you get — forever.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">Dynamic:</strong> the QR
        contains a short link. Our servers redirect each scan to the current
        destination and can record analytics. You update the destination in
        Manage / Dashboard.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Side by side</h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left">
              <th className="py-2 pr-4 font-semibold">Feature</th>
              <th className="py-2 pr-4 font-semibold">Static</th>
              <th className="py-2 font-semibold">Dynamic</th>
            </tr>
          </thead>
          <tbody className="text-[var(--muted)]">
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4">Editable after printing</td>
              <td className="py-2 pr-4">No</td>
              <td className="py-2">Yes</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4">Scan analytics</td>
              <td className="py-2 pr-4">No</td>
              <td className="py-2">Yes</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4">Works without our servers</td>
              <td className="py-2 pr-4">Yes (payload is in the code)</td>
              <td className="py-2">Needs redirect online</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4">Account required</td>
              <td className="py-2 pr-4">No on Vyntrix QR</td>
              <td className="py-2">Yes</td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4">Cost model here</td>
              <td className="py-2 pr-4">Unlimited free static</td>
              <td className="py-2">1 free; Pro for unlimited</td>
            </tr>
            <tr>
              <td className="py-2 pr-4">Best for</td>
              <td className="py-2 pr-4">WiFi, vCards, fixed links</td>
              <td className="py-2">Marketing, menus, campaigns</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-semibold">When to use static</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          Permanent personal or company homepage that will not move for years
        </li>
        <li>
          <Link
            href="/guides/wifi-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            WiFi credentials
          </Link>{" "}
          for a guest network that rarely changes
        </li>
        <li>
          <Link
            href="/guides/vcard-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            vCard / contact
          </Link>{" "}
          details on a business card
        </li>
        <li>Situations where you want zero dependency on a redirect service</li>
        <li>Internal labels where analytics do not matter</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">When to use dynamic</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Anything expensive to reprint (packaging, billboards, window vinyl)</li>
        <li>Campaigns where you need scan counts or CSV export</li>
        <li>Menus, offers, and event pages that change seasonally</li>
        <li>Team workflows where one person prints and another updates the URL</li>
        <li>
          Custom short slugs and Pro tools — see{" "}
          <Link href="/pricing" className="text-[var(--brand-2)] underline">
            Pricing
          </Link>
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Decision checklist</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Will the destination possibly change in the next 12 months?</li>
        <li>Is the print run costly or hard to replace?</li>
        <li>Do you need scan numbers for a report or client?</li>
        <li>Is the payload WiFi/vCard rather than a website?</li>
      </ol>
      <p className="mt-3 text-[var(--muted)]">
        If you answered yes to 1–3, start dynamic. If you answered yes mainly to
        4 and the data is stable, static is usually simpler and free.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Privacy and reliability notes</h2>
      <p className="mt-3 text-[var(--muted)]">
        Static generation for one-off downloads runs in your browser. Dynamic
        destinations and scan events are stored so redirects and analytics can
        work — details in the{" "}
        <Link href="/privacy" className="text-[var(--brand-2)] underline">
          Privacy Policy
        </Link>
        . Dynamic codes also assume the redirect stays available; keep that in
        mind for decade-long archival prints.
      </p>

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
