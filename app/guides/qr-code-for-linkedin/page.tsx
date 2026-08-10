import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-linkedin";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Can I use a company page instead of my personal profile?",
    a: "Yes. Paste your company page URL (linkedin.com/company/your-brand) when scanners should follow the organization. Use linkedin.com/in/your-name for individual networking at events and on business cards.",
  },
  {
    q: "Does LinkedIn need a special QR format?",
    a: "No. A standard URL QR to your public LinkedIn profile or company page is all you need. LinkedIn also offers in-app QR codes, but a Studio-built code works with any camera and supports custom branding.",
  },
  {
    q: "Can I switch between profile and company page later?",
    a: "With a dynamic QR, yes — update the redirect destination without reprinting badges or booth panels.",
  },
  {
    q: "Should I use LinkedIn QR or vCard QR on a business card?",
    a: "LinkedIn QR opens your live profile with recommendations and activity. vCard QR saves phone and email to contacts offline. Many professionals use LinkedIn on the front and vCard on the back.",
  },
  {
    q: "Can I track scans?",
    a: "Dynamic QR codes show scan analytics. LinkedIn does not report QR scans natively; profile views may increase but are not tied to individual scans.",
  },
  {
    q: "Is a static LinkedIn QR free?",
    a: "Yes. Static URL QR codes are free with no watermark. Dynamic codes help when the same badge is reused across multiple events or roles.",
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

export default function LinkedInGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "LinkedIn QR", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">LinkedIn QR code</strong>{" "}
        replaces awkward name spelling at conferences, job fairs, and client
        meetings. One scan opens your profile or company page so the other person
        can connect, message, or follow — without hunting through duplicate
        names. Create a crisp, print-ready code in{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>{" "}
        and add it to badges, slides, or signage.
      </p>

      <GuideCta label="Create a LinkedIn QR code" />

      <h2 className="mt-10 text-2xl font-semibold">
        How LinkedIn QR codes work
      </h2>
      <p className="mt-3 text-[var(--muted)]">
        The QR encodes a public LinkedIn URL. Scanning opens LinkedIn in the app
        or browser, landing on the profile or company page you specified. Unlike
        LinkedIn&apos;s own mobile QR (generated under the My QR menu), a URL
        QR works from any camera, scales cleanly in print templates, and can
        include your headshot logo or employer colors in the Design tab.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        For recruiters and sales teams, the payoff is speed: booth visitors
        connect before they forget your name. For companies, a company-page QR on
        hiring banners centralizes employer-brand follows. When the same physical
        badge follows you through a job change, a{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic QR
        </Link>{" "}
        lets you update the URL once instead of reprinting hundreds of cards.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">
        Personal profile vs company page
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <strong className="text-[var(--foreground)]">Personal (/in/):</strong>{" "}
          networking events, speaker intros, consultants, job seekers — copy
          from Public profile settings
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Company (/company/):</strong>{" "}
          trade-show booths, office lobby displays, recruitment flyers
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Showcase pages:</strong>{" "}
          product-line-specific collateral when one division exhibits alone
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Vanity URLs:</strong>{" "}
          claim a short linkedin.com/in/name before printing — long default URLs
          still work but look messy on small cards
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Steps to create one</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          LinkedIn → Me → View profile → Public profile → Edit public profile
          URL. Copy the full https link.
        </li>
        <li>
          Paste into the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          URL field. Open the link logged out to confirm it is publicly visible.
        </li>
        <li>
          Optional: enable dynamic QR if you might switch from personal to
          company page mid-campaign, or want scan counts per event.
        </li>
        <li>
          Add a subtle logo or brand color in Design — keep modules dark on
          light stock for reliability; see{" "}
          <Link
            href="/guides/qr-code-with-logo"
            className="text-[var(--brand-2)] underline"
          >
            logo QR guide
          </Link>
          .
        </li>
        <li>
          Download PNG for badges or SVG for large backdrop printing. Follow{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            sizing guidance
          </Link>{" "}
          — lanyard cards need smaller but still scannable modules.
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Where to place the code</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Business card backs and conference name badges</li>
        <li>Booth headers, roll-up banners, and tabletop stands</li>
        <li>Presentation closing slides (“Let’s connect”)</li>
        <li>Office reception plaques for visitor networking</li>
        <li>Recruitment table tents at university career fairs</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          Refresh headline, photo, and featured section before a major event —
          scanners judge quickly.
        </li>
        <li>
          Label the code: “Connect on LinkedIn” so intent is obvious.
        </li>
        <li>
          Enable “Open to work” or creator mode only when appropriate for the
          audience.
        </li>
        <li>
          Test scans under conference hall lighting — glossy badge holders
          glare.
        </li>
        <li>
          For teams, standardize on company-page QR on shared materials and
          personal QR on individual cards.
        </li>
        <li>
          Send a connection note within 24 hours while the meeting is fresh.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Encoding a profile that is restricted to connections only</li>
        <li>Outdated job title on the profile after a recent role change</li>
        <li>Printing LinkedIn app QR screenshots at low resolution</li>
        <li>Codes too small on standard US business cards (test at final size)</li>
        <li>Linking to search results instead of a direct profile URL</li>
        <li>Forgetting dynamic updates when rebranding to a new company page</li>
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
