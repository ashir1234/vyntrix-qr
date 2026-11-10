import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  absoluteUrl,
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";
import { siteConfig } from "@/lib/site";

const slug = "best-free-qr-code-generator";
const guide = getGuide(slug)!;

const TOOLS = [
  {
    name: "Vyntrix QR",
    href: "/studio",
    external: false,
    body: "Our generator. Unlimited static codes with no watermark, logo and colors, a live 3D preview, and PNG or SVG download. Sign in for 1 dynamic code. Pro is $12/month for unlimited dynamic codes and analytics.",
  },
  {
    name: "QR Code Monkey",
    href: "https://www.qrcode-monkey.com/",
    external: true,
    body: "A free design tool built around logo QR codes, colors, and custom patterns. Useful when the job is a branded static code and you do not need scan analytics.",
  },
  {
    name: "Adobe Express",
    href: "https://www.adobe.com/express/feature/image/qr-code-generator",
    external: true,
    body: "A free static QR code generator for URLs. You can change colors, add a logo, and download PNG, JPEG, or PDF, then drop the code into an Express design. It does not make WiFi or vCard codes.",
  },
  {
    name: "Canva",
    href: "https://www.canva.com/",
    external: true,
    body: "A design editor with a QR code element. Pick it when the code has to sit inside a poster, menu, or social graphic you are already making in Canva.",
  },
  {
    name: "QR Tiger",
    href: "https://www.qrcode-tiger.com/",
    external: true,
    body: "A branded generator with free static codes and paid dynamic codes. Dynamic codes let you change the destination later and see scan activity.",
  },
  {
    name: "QRStuff",
    href: "https://www.qrstuff.com/",
    external: true,
    body: "A long-running generator for static codes that keep working, plus dynamic codes when you need to edit the link or track scans.",
  },
  {
    name: "Bitly",
    href: "https://bitly.com/",
    external: true,
    body: "A short-link product that also makes QR codes. Choose it when the QR should point at a Bitly link you already track with the rest of your campaigns.",
  },
] as const;

const FAQS = [
  {
    q: "What is a QR code generator?",
    a: "A QR code generator turns a link, WiFi login, contact card, or short text into a scannable code. Static generators bake the data into the pattern. Dynamic generators store a short link so you can change the destination later.",
  },
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
    a: "Static codes do not expire - the data is in the pattern. Dynamic short links depend on the service remaining available; keep account access if you rely on them.",
  },
  {
    q: "Are free generators safe for business use?",
    a: "Yes if privacy and terms are clear, static generation is client-side when claimed, and you control destinations. Avoid tools that force unclear upsells or inject tracking without disclosure.",
  },
  {
    q: "PNG or SVG - which should I download?",
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
        { name: "QR code generator", href: `/guides/${slug}` },
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
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: guide.h1,
          itemListOrder: "https://schema.org/ItemListOrderAscending",
          numberOfItems: TOOLS.length,
          itemListElement: TOOLS.map((tool, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: tool.name,
            url: tool.external ? tool.href : absoluteUrl(tool.href),
          })),
        },
      ]}
    >
      <h1 className="text-4xl font-bold tracking-tight">{guide.h1}</h1>
      <p className="mt-4 text-lg text-[var(--muted)]">
        A{" "}
        <strong className="text-[var(--foreground)]">QR code generator</strong>{" "}
        turns a link, WiFi login, or contact card into a code someone can scan.
        These seven are the ones worth opening, and what each one is actually
        for. This list is published by {siteConfig.name}, so our own product is
        first and described from our product, not from an outside award.
      </p>

      <GuideCta label={`Try ${siteConfig.name} free`} />

      <h2 className="mt-10 text-2xl font-semibold">Seven QR code generators</h2>
      <ol className="mt-4 list-decimal space-y-6 pl-5 text-[var(--muted)]">
        {TOOLS.map((tool) => (
          <li key={tool.name}>
            <h3 className="text-lg font-semibold text-[var(--foreground)]">
              {tool.external ? (
                <a
                  href={tool.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline"
                >
                  {tool.name}
                </a>
              ) : (
                <Link href={tool.href} className="underline">
                  {tool.name}
                </Link>
              )}
            </h3>
            <p className="mt-1">{tool.body}</p>
          </li>
        ))}
      </ol>

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
                Static URL - see{" "}
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
        <li>Scan from phone lock-screen camera - no special app.</li>
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
