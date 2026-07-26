import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "dynamic-qr-code";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What is the difference between static and dynamic QR codes?",
    a: "A static QR encodes the final destination forever. A dynamic QR encodes a short link you can re-point later, and it can collect scan analytics.",
  },
  {
    q: "Can I change a printed QR code’s destination?",
    a: "Only if it is dynamic. With Vyntrix QR dynamic links, update the destination anytime without reprinting.",
  },
  {
    q: "Do dynamic QR codes require an internet connection?",
    a: "Yes for the redirect step. The phone still scans offline, but opening the short link needs the redirect service to be reachable. Static codes that encode a full URL or WiFi payload do not need our servers.",
  },
  {
    q: "Is there a free dynamic QR code?",
    a: "Yes. Sign in to create 1 free dynamic code with short analytics. Pro unlocks unlimited dynamics, longer history, CSV export, custom slugs, and more.",
  },
  {
    q: "Will scans still count if I change the destination?",
    a: "Yes. The printed code keeps pointing at the same short link. Destination updates do not reset the QR artwork; analytics continue on that link.",
  },
  {
    q: "Are dynamic codes less private than static ones?",
    a: "Dynamic destinations and scan events are stored so redirects and analytics can work. Static generation for one-off downloads runs in your browser. See our Privacy Policy for details.",
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

export default function DynamicGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Dynamic QR", href: `/guides/${slug}` },
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
        <strong className="text-[var(--foreground)]">dynamic QR code</strong>{" "}
        points to a short redirect link instead of baking the final URL into the
        pattern. You can edit the destination after printing and track scans —
        ideal for campaigns, menus, packaging, and posters. Create one in the{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>{" "}
        (account required for dynamic links).
      </p>

      <GuideCta label="Create a dynamic QR" />

      <h2 className="mt-10 text-2xl font-semibold">How dynamic QR codes work</h2>
      <p className="mt-3 text-[var(--muted)]">
        When someone scans a dynamic code, their phone opens a short URL on our
        service. That URL looks up the current destination and redirects. Because
        the printed pattern never changes, you can fix typos, swap seasonal
        offers, or move from a staging page to production without a reprint.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        Each scan can also be counted for analytics (device/time aggregates
        depending on your plan). That feedback loop is why marketers prefer
        dynamic codes for anything expensive to print.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">When to use dynamic QR</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Print materials that may need URL updates later</li>
        <li>Marketing campaigns where you want scan counts</li>
        <li>Seasonal offers, event pages, or product launches that change often</li>
        <li>Restaurant menus, real-estate listings, and packaging inserts</li>
        <li>A/B testing two landing pages behind the same printed artwork</li>
      </ul>
      <p className="mt-3 text-[var(--muted)]">
        Prefer static when the payload never changes and you want zero server
        dependency — for example a permanent personal site, a{" "}
        <Link
          href="/guides/vcard-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          vCard
        </Link>
        , or a classic{" "}
        <Link
          href="/guides/wifi-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          WiFi join code
        </Link>
        . Full comparison:{" "}
        <Link
          href="/guides/static-vs-dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          static vs dynamic
        </Link>
        .
      </p>

      <h2 className="mt-10 text-2xl font-semibold">How to create one</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Open{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          with type set to URL (or another type that supports dynamic).
        </li>
        <li>Sign in if you are not already — dynamic links need an account.</li>
        <li>
          Enable <strong className="text-[var(--foreground)]">Dynamic QR</strong>{" "}
          and create a short link with your destination URL.
        </li>
        <li>
          Save access to Manage (dashboard / edit token) so you can update the
          destination and view analytics later.
        </li>
        <li>
          Style the code (logo, colors), test-scan, then download PNG or SVG for
          print.
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Free vs Pro dynamics</h2>
      <p className="mt-3 text-[var(--muted)]">
        Free includes <strong className="text-[var(--foreground)]">1</strong>{" "}
        dynamic code with short analytics retention — enough to try the workflow
        on a real poster or menu.{" "}
        <Link href="/pricing" className="text-[var(--brand-2)] underline">
          Pro ($12/month)
        </Link>{" "}
        unlocks unlimited dynamic codes, fuller scan history and CSV export,
        custom short-link slugs, dynamic WiFi landing pages, projects, bulk
        create, print pack, and an ad-free experience.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Always test the redirect on iPhone and Android before a print run.</li>
        <li>
          Use HTTPS destinations. Avoid URL shorteners stacked on top of your
          dynamic link unless you have a reason.
        </li>
        <li>
          Keep a backup of the manage link or stay signed in so you never lose
          edit access.
        </li>
        <li>
          Size print correctly for scan distance —{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            print size guide
          </Link>
          .
        </li>
        <li>
          Brand carefully so the code still scans —{" "}
          <Link
            href="/guides/qr-code-with-logo"
            className="text-[var(--brand-2)] underline"
          >
            logo tips
          </Link>
          .
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common pitfalls</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Printing a static code by mistake when you needed editable URLs</li>
        <li>Pointing at a page that will move without updating the destination</li>
        <li>Assuming scan counts equal conversions — they measure interest, not purchases</li>
        <li>Losing manage access and being unable to edit (keep the dashboard bookmark)</li>
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
