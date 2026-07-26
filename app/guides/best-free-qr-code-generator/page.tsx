import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const slug = "best-free-qr-code-generator";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What makes a free QR generator actually good?",
    a: "No watermark on static codes, logo/color support, reliable PNG/SVG export, clear privacy, and an honest path to dynamic codes if you need analytics.",
  },
  {
    q: "Is Vyntrix QR free?",
    a: "Yes for unlimited static QR codes (URL, WiFi, vCard, and more) with no watermark. Sign in for 1 free dynamic code; Pro unlocks unlimited dynamics and analytics.",
  },
  {
    q: "Do I need dynamic QR codes?",
    a: "Only if you want to change the destination after printing or track scans. Static codes are fine for permanent links.",
  },
  {
    q: "Will free codes expire?",
    a: "Static codes do not expire — the data is in the pattern. Dynamic short links depend on the service remaining available; keep account access if you rely on them.",
  },
  {
    q: "Are free generators safe for business use?",
    a: "Yes if privacy and terms are clear, static generation is client-side when claimed, and you control destinations. Avoid tools that force unclear upsells or inject tracking without disclosure.",
  },
  {
    q: "PNG or SVG — which should I download?",
    a: "SVG for print and scaling; PNG for quick digital use. See our print size guide for DPI and distance rules.",
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

export default function BestFreeGeneratorGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Best free generator", href: `/guides/${slug}` },
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
        Searching for the{" "}
        <strong className="text-[var(--foreground)]">
          best free QR code generator
        </strong>
        ? Focus on watermarks, branding, exports, privacy, and whether dynamic
        codes are honest about pricing — not on stuffing keyword lists or
        chasing every gimmick feature.
      </p>

      <GuideCta label={`Try ${siteConfig.name} free`} />

      <h2 className="mt-10 text-2xl font-semibold">
        Checklist: what “free” should include
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Static codes free without a watermark</li>
        <li>Logo, colors, and print-ready PNG/SVG</li>
        <li>Optional dynamic codes with clear Free vs Pro limits</li>
        <li>Privacy you can explain (static in-browser vs stored dynamics)</li>
        <li>Guides for real use cases — WiFi, menus, packaging, social</li>
        <li>Works on modern phones without forcing a proprietary scanner app</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">
        Red flags in free QR tools
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Watermarks or forced branding on “free” downloads</li>
        <li>Dynamic links with no way to export history or unclear expiry</li>
        <li>Vague privacy policies about what is uploaded</li>
        <li>Only low-res PNG, no SVG for professional print</li>
        <li>Hidden pricing that appears only after you print a campaign</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">
        How {siteConfig.name} fits
      </h2>
      <p className="mt-3 text-[var(--muted)]">
        {siteConfig.name} gives you unlimited static codes, live 2D/3D preview,
        and branding tools. Sign in for 1 free dynamic code with short
        analytics; Pro ($12/mo) unlocks unlimited dynamics, CSV export, WiFi
        landing pages, projects, bulk create, and print pack. Compare plans on{" "}
        <Link href="/pricing" className="text-[var(--brand-2)] underline">
          Pricing
        </Link>
        .
      </p>
      <p className="mt-3 text-[var(--muted)]">
        Static generation runs in the browser for privacy; dynamic destinations
        are stored so redirects and analytics can work. Read more on{" "}
        <Link href="/about" className="text-[var(--brand-2)] underline">
          About
        </Link>{" "}
        and the{" "}
        <Link href="/privacy" className="text-[var(--brand-2)] underline">
          Privacy Policy
        </Link>
        .
      </p>

      <h2 className="mt-10 text-2xl font-semibold">
        Feature priorities by use case
      </h2>
      <div className="mt-4 overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-[var(--border)] text-left">
              <th className="py-2 pr-4 font-semibold">If you need…</th>
              <th className="py-2 font-semibold">Prioritize</th>
            </tr>
          </thead>
          <tbody className="text-[var(--muted)]">
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4">Guest WiFi at a café</td>
              <td className="py-2">
                <Link
                  href="/guides/wifi-qr-code"
                  className="text-[var(--brand-2)] underline"
                >
                  WiFi QR
                </Link>
                , clear print size, WPA
              </td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4">Brand packaging</td>
              <td className="py-2">
                <Link
                  href="/guides/qr-code-with-logo"
                  className="text-[var(--brand-2)] underline"
                >
                  Logo + contrast
                </Link>
                , SVG, proof scans
              </td>
            </tr>
            <tr className="border-b border-[var(--border)]">
              <td className="py-2 pr-4">Campaign tracking</td>
              <td className="py-2">
                <Link
                  href="/guides/dynamic-qr-code"
                  className="text-[var(--brand-2)] underline"
                >
                  Dynamic QR
                </Link>{" "}
                + analytics
              </td>
            </tr>
            <tr>
              <td className="py-2 pr-4">One permanent link</td>
              <td className="py-2">
                Static URL — see{" "}
                <Link
                  href="/guides/static-vs-dynamic-qr-code"
                  className="text-[var(--brand-2)] underline"
                >
                  static vs dynamic
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <h2 className="mt-10 text-2xl font-semibold">How to evaluate in 10 minutes</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Create a URL QR with your logo and brand color.</li>
        <li>Download SVG and PNG; open SVG in a browser or design tool.</li>
        <li>Scan from phone lock-screen camera — no special app.</li>
        <li>Check whether a watermark appeared.</li>
        <li>
          Skim privacy: does static stay local? Are dynamics explained?
        </li>
        <li>
          If you need editable links, create one dynamic code and confirm you
          can change the destination.
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Next steps</h2>
      <p className="mt-3 text-[var(--muted)]">
        Open the{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Studio
        </Link>
        , browse{" "}
        <Link href="/guides" className="text-[var(--brand-2)] underline">
          all guides
        </Link>
        , or{" "}
        <Link href="/contact" className="text-[var(--brand-2)] underline">
          contact us
        </Link>{" "}
        if something is unclear. Built by{" "}
        <a
          href={siteConfig.parentCompany.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--brand-2)] underline"
        >
          {siteConfig.parentCompany.name}
        </a>
        .
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
