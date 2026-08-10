import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-app-download";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Can one QR work for iPhone and Android?",
    a: "Not with a single store URL — App Store and Play Store links differ. Print two labeled codes, or use one smart landing page that detects the device and redirects to the correct store.",
  },
  {
    q: "Where do I get the official store links?",
    a: "Copy from App Store Connect (apps.apple.com/…) and Google Play Console (play.google.com/store/apps/details?id=…). Avoid third-party redirectors that look unofficial.",
  },
  {
    q: "How do I track installs vs scans?",
    a: "App Store Connect and Play Console report installs and acquisition. A dynamic QR reports scans of the printed code. Use UTM or campaign parameters on a landing page for finer attribution.",
  },
  {
    q: "Should app download QR codes be static or dynamic?",
    a: "Dynamic helps when you might change the landing page, fix a wrong store URL, or compare print campaigns. Static is fine for short-run packaging if links are verified.",
  },
  {
    q: "What about deep links to a specific screen?",
    a: "Universal links and app links require developer setup. A store QR gets the app installed; in-app deep links are a separate project beyond a basic download code.",
  },
  {
    q: "How big should the code be on packaging?",
    a: "Close-range scans on boxes need at least 2 × 2 cm with strong contrast. See the print size guide for shelf displays vs counter stickers.",
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

export default function AppDownloadGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "App download QR", href: `/guides/${slug}` },
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
        <strong className="text-[var(--foreground)]">app download QR code</strong>{" "}
        sends people straight to the App Store or Google Play — posters, product
        boxes, receipts, and booth banners become install prompts. Because iOS and
        Android use different store URLs, you either print two codes or one smart
        link. Create both in{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>
        .
      </p>

      <GuideCta label="Create an app download QR" />

      <h2 className="mt-10 text-2xl font-semibold">Why store links need planning</h2>
      <p className="mt-3 text-[var(--muted)]">
        A QR is just encoded text. If you paste an App Store URL, Android users
        land in the wrong place — and vice versa. Marketing teams solve this
        with dual codes (“Download for iPhone” / “Download for Android”) or a
        lightweight landing page that reads the user agent and redirects.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        Wrap that landing page in a{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic QR
        </Link>{" "}
        and you can fix typos, A/B test copy, or add analytics without
        reprinting thousands of labels.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">When to use one</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Consumer apps promoted on{" "}
          <Link
            href="/guides/qr-code-for-product-packaging"
            className="text-[var(--brand-2)] underline"
          >
            product packaging
          </Link>
        </li>
        <li>SaaS companion apps for hardware devices</li>
        <li>Event booths and conference swag</li>
        <li>Restaurant ordering or loyalty apps on table tents</li>
        <li>Printed manuals that replace paper with an in-app experience</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Option A — Two store codes</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Copy your official App Store and Play Store URLs from developer consoles.</li>
        <li>
          Create two URL codes in the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>
          .
        </li>
        <li>Label clearly on print: Apple / Google icons plus short text.</li>
        <li>
          See also{" "}
          <Link
            href="/qr-code-for/app-store"
            className="text-[var(--brand-2)] underline"
          >
            App Store
          </Link>{" "}
          and{" "}
          <Link
            href="/qr-code-for/google-play"
            className="text-[var(--brand-2)] underline"
          >
            Google Play
          </Link>{" "}
          use-case pages.
        </li>
        <li>Test each code on the matching device before mass print.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Option B — One smart link</h2>
      <p className="mt-3 text-[var(--muted)]">
        Host a tiny page on your domain: detect iOS vs Android, show both buttons
        as fallback, redirect automatically when confident. Encode that single
        HTTPS URL in one QR — cleaner packaging, slightly more setup.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        Add UTM parameters (
        <span className="font-mono text-sm text-[var(--foreground)]">
          ?utm_source=packaging
        </span>
        ) if you use web analytics alongside store reports.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Steps (smart link path)</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Publish a mobile-friendly landing page with store buttons.</li>
        <li>Paste the page URL into Studio; enable dynamic if you expect changes.</li>
        <li>Brand the QR; download SVG for label printers.</li>
        <li>
          Size for scan distance —{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            QR code size for print
          </Link>
          .
        </li>
        <li>Verify redirects on real iPhone and Android hardware.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Always use official store URLs — never unofficial APK mirrors.</li>
        <li>Keep codes large enough for arm-length scans on packaging.</li>
        <li>Show app name and star rating on the landing page for trust.</li>
        <li>Localize store badges if you ship in multiple countries.</li>
        <li>Dynamic QR for long-lived print; static for one-off event handouts.</li>
        <li>
          Read{" "}
          <Link
            href="/guides/static-vs-dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            static vs dynamic
          </Link>{" "}
          before committing to a million-unit label run.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Single App Store QR on global packaging — Android users bounce</li>
        <li>Short links that break when the marketing domain expires</li>
        <li>Linking to a developer beta TestFlight URL on retail boxes</li>
        <li>Tiny codes on curved bottle labels</li>
        <li>No fallback buttons when auto-redirect fails on tablets</li>
        <li>Counting QR scans as installs — they measure different funnel steps</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Related guides</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <Link
            href="/guides/qr-code-for-product-packaging"
            className="text-[var(--brand-2)] underline"
          >
            Product packaging QR
          </Link>{" "}
          — label placement
        </li>
        <li>
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            Dynamic QR code
          </Link>{" "}
          — editable smart links
        </li>
        <li>
          <Link
            href="/guides/qr-code-with-logo"
            className="text-[var(--brand-2)] underline"
          >
            QR code with logo
          </Link>{" "}
          — brand on retail print
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
