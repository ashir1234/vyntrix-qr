import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-facebook";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Should I use my Page URL or personal profile URL?",
    a: "Businesses, shops, and local services should use a public Facebook Page URL (facebook.com/YourPageName). Personal profiles work for creators or consultants, but Pages offer reviews, hours, and a clearer follow action for customers.",
  },
  {
    q: "Is this the same as Facebook's built-in QR code?",
    a: "No. Facebook generates proprietary codes inside its app. A standard URL QR works with any camera, can include your logo and brand colors, and is not tied to Meta's in-app scanner.",
  },
  {
    q: "Can I link to a Facebook Group or Event?",
    a: "Yes. Copy the public Group or Event URL from Share → Copy link and paste it into Studio. Make sure the Group allows joins from the link you share.",
  },
  {
    q: "Can I track scans on my Facebook QR code?",
    a: "Yes. Create a dynamic QR that redirects to your Facebook URL. Scan counts appear in your dashboard; Facebook itself does not report QR scans back to you.",
  },
  {
    q: "Is a static Facebook QR code free?",
    a: "Yes. Static URL QR codes are free with no watermark. Dynamic codes add analytics and editable destinations for long-running print campaigns.",
  },
  {
    q: "What if I rename my Page later?",
    a: "Facebook usually redirects old Page URLs, but do not rely on temporary share links. Use the canonical Page URL from Page settings, and consider dynamic QR if you expect rebrands.",
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

export default function FacebookGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Facebook QR", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">Facebook QR code</strong>{" "}
        sends scanners straight to your Page, Group, or Event — one tap instead
        of searching a common business name and hoping they pick the right
        result. Restaurants, nonprofits, retailers, and community organizers use
        them on storefronts, flyers, and receipts. Create a branded code in{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>{" "}
        and export PNG or SVG for print.
      </p>

      <GuideCta label="Create a Facebook QR code" />

      <h2 className="mt-10 text-2xl font-semibold">
        How Facebook QR codes work
      </h2>
      <p className="mt-3 text-[var(--muted)]">
        The QR encodes a normal web URL — for example{" "}
        <span className="font-mono text-sm text-[var(--foreground)]">
          https://facebook.com/YourPage
        </span>
        . Scanning opens that address in the browser or Facebook app if
        installed. There is no special Facebook QR payload format; it is the
        same URL QR you would use for any website, which means you control
        design, sizing, and whether the destination is static or editable.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        Meta also offers QR codes inside the Facebook app for Pages. Those are
        convenient for quick sharing but harder to brand and impossible to
        embed in a print layout you design yourself. A Studio-built code matches
        your signage and works with every standard camera app.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">
        Page, profile, Group, or Event?
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <strong className="text-[var(--foreground)]">Facebook Page:</strong>{" "}
          default for businesses — hours, reviews, Messenger, and “Follow” in
          one place
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Personal profile:</strong>{" "}
          fine for solo professionals if that is where you want connections
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Group:</strong> community
          building, clubs, neighborhood boards — confirm join rules first
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Event:</strong> posters
          and ticket stubs; update or swap links with a{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic QR
          </Link>{" "}
          after the event ends
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Steps to create one</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          On desktop or mobile, open your Page → tap{" "}
          <strong className="text-[var(--foreground)]">Share</strong> →{" "}
          <strong className="text-[var(--foreground)]">Copy link</strong>. Avoid
          one-off share dialog URLs that expire.
        </li>
        <li>
          Paste the URL into the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          URL field. Test it in an incognito browser tab to confirm it loads
          without logging in as you.
        </li>
        <li>
          Optional: enable dynamic QR if you want scan analytics or might point
          the same printed code at different landing pages over time.
        </li>
        <li>
          Customize colors or add your Page logo in Design — keep strong
          contrast per our{" "}
          <Link
            href="/guides/qr-code-with-logo"
            className="text-[var(--brand-2)] underline"
          >
            logo QR guide
          </Link>
          .
        </li>
        <li>
          Export PNG or SVG. Follow{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            sizing guidance
          </Link>{" "}
          for window decals vs receipt slips.
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Where to place the code</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Storefront windows and “We’re on Facebook” counter signs</li>
        <li>Menu backs, table tents, and takeout bag stickers</li>
        <li>Fundraising flyers and church bulletin boards</li>
        <li>Trade-show booth panels next to your logo</li>
        <li>Printed invoices or delivery notes for review requests</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          Use the stable Page URL from settings, not a mobile share sheet
          shortcut.
        </li>
        <li>
          Complete your Page profile — photo, hours, and a recent post — before
          printing so scans convert to follows.
        </li>
        <li>Caption clearly: “Follow us on Facebook” or “Join our community.”</li>
        <li>
          Keep a quiet margin around the code; busy backgrounds behind modules
          cause failed scans.
        </li>
        <li>
          For review campaigns, pin a post explaining what you would love
          feedback on.
        </li>
        <li>
          Pair physical QR with a Meta pixel or Page insights separately — QR
          scan stats only appear if you use dynamic tracking.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Linking to an unpublished or restricted Page</li>
        <li>Using a personal profile when customers expect a business Page</li>
        <li>Encoding Group links that require admin approval without saying so</li>
        <li>Printing Event QR codes long after the date passes</li>
        <li>Glare-heavy lamination on outdoor signage under direct sun</li>
        <li>Assuming Facebook’s in-app QR can be downloaded for print layouts</li>
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
