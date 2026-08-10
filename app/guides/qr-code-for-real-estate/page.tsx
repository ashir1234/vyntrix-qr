import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-real-estate";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Should I use a dynamic QR on yard signs?",
    a: "Yes. Listings go pending, prices change, and open-house times shift. Dynamic QR lets you update the destination without reprinting signs — especially valuable for multi-listing agents.",
  },
  {
    q: "Zillow/Realtor.com vs my own site?",
    a: "Portal links feel familiar to buyers. Your brokerage site captures leads with fewer distractions. Dynamic QR lets you switch emphasis as the listing matures.",
  },
  {
    q: "How big should the code be on a yard sign?",
    a: "Scanning often happens from the sidewalk — several centimeters on a side, high contrast, with a caption like “Scan for photos & details.” See the print size guide for distance rules.",
  },
  {
    q: "Can I link to a virtual tour?",
    a: "Absolutely. Matterport, video walkthroughs, or a landing page with gallery + contact form all work. Test mobile load on LTE — buyers scan from the curb.",
  },
  {
    q: "Will rain ruin the QR on outdoor signs?",
    a: "Use weather-resistant print, UV laminate, or coroplast boards. Matte laminate scans better than glossy film that glares in sun.",
  },
  {
    q: "Can I track which sign drives traffic?",
    a: "Dynamic QR analytics show scan counts by code. Use different codes per listing or per sign location to compare performance.",
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

export default function RealEstateGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Real estate QR", href: `/guides/${slug}` },
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
        <strong className="text-[var(--foreground)]">real estate QR code</strong>{" "}
        on a yard sign or flyer turns drive-by curiosity into listing photos,
        virtual tours, and lead forms — without cramming phone numbers onto a
        18 × 24 inch board. Agents and brokerages use them on signs, open-house
        arrows, and mailers. Build a weather-ready code in{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>
        .
      </p>

      <GuideCta label="Create a listing QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Why dynamic wins outdoors</h2>
      <p className="mt-3 text-[var(--muted)]">
        A yard sign may sit for weeks. Status flips from “Just Listed” to
        “Pending” to “Sold.” Price drops and open-house schedules change. A
        static QR locked to one URL forces new print runs — or worse, sends
        buyers to stale info.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        A{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic QR
        </Link>{" "}
        on the sign stays fixed while you update the landing page: new photos,
        video tour, showing instructions, or a redirect to the next listing on
        the same lot.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">When to use one</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Front-yard signs on active listings</li>
        <li>Open-house directional signs on busy corners</li>
        <li>Flyer boxes and door hangers in the neighborhood</li>
        <li>Luxury print brochures with too many photos for paper</li>
        <li>Rental and commercial properties with long marketing windows</li>
        <li>
          Lead capture via{" "}
          <Link
            href="/guides/qr-code-for-google-form"
            className="text-[var(--brand-2)] underline"
          >
            Google Form
          </Link>{" "}
          on a custom landing page
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Steps to create one</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Pick the destination: MLS portal, brokerage page, virtual tour, or
          lead form.
        </li>
        <li>
          Create a{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic QR
          </Link>{" "}
          in the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          so you can edit after install.
        </li>
        <li>Use high-contrast black and white for outdoor readability.</li>
        <li>
          Export large PNG/SVG for the sign shop — size for sidewalk distance in{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            QR code size for print
          </Link>
          .
        </li>
        <li>Add “Scan for photos &amp; details” under the code.</li>
        <li>Walk the curb and test-scan before the open house.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Landing page tips</h2>
      <p className="mt-3 text-[var(--muted)]">
        Mobile-first: hero photo, price, beds/baths, one-tap call or text, and a
        schedule-showing button. Auto-play video with sound off. Minimize
        third-party widgets that slow load on street-side LTE.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        When the listing sells, redirect the same dynamic link to a “Sold — see
        similar homes” page instead of a 404 — you keep capturing buyer interest.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Weather-resistant print and matte or low-glare laminate.</li>
        <li>Large modules — buyers scan from 3–5 meters away.</li>
        <li>Separate QR per listing to read scan analytics clearly.</li>
        <li>Brokerage branding optional; scannability beats decoration outdoors.</li>
        <li>Comply with local sign regulations — QR does not exempt size rules.</li>
        <li>
          See also the{" "}
          <Link
            href="/qr-code-for/real-estate"
            className="text-[var(--brand-2)] underline"
          >
            real estate use-case page
          </Link>{" "}
          for product-specific tips.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Static QR still pointing at a sold listing in spring</li>
        <li>Code too small on a sign meant to be read from the car</li>
        <li>Glossy laminate glare at sunset — scan failures spike</li>
        <li>Portal page with login prompts before photos load</li>
        <li>One agent QR on every sign — cannot tell which property scanned</li>
        <li>Low-resolution art from a screenshot instead of SVG export</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Related guides</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <Link
            href="/guides/qr-code-for-pdf"
            className="text-[var(--brand-2)] underline"
          >
            PDF QR code
          </Link>{" "}
          — digital brochure on flyers
        </li>
        <li>
          <Link
            href="/guides/qr-code-for-business-card"
            className="text-[var(--brand-2)] underline"
          >
            Business card QR
          </Link>{" "}
          — same listing on card backs
        </li>
        <li>
          <Link
            href="/guides/qr-code-for-google-reviews"
            className="text-[var(--brand-2)] underline"
          >
            Google review QR
          </Link>{" "}
          — post-closing follow-up
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
