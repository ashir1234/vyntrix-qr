import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "wifi-qr-code";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Can phones scan a WiFi QR code without an app?",
    a: "Yes. Modern iPhone and Android cameras recognize WiFi QR codes and offer a one-tap connect prompt.",
  },
  {
    q: "Is a WiFi QR code free?",
    a: "Yes. Static WiFi QR codes are free with no watermark. Pro adds dynamic WiFi landing pages so you can track how many people open the WiFi details (not whether they joined the network).",
  },
  {
    q: "What security types are supported?",
    a: "WPA/WPA2 (most common), WEP, and open networks with no password.",
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

export default function WifiGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "WiFi QR", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">WiFi QR code</strong>{" "}
        lets guests join your network by scanning instead of typing the SSID and
        password. Create one free in under a minute with{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>
        .
      </p>

      <GuideCta label="Create a WiFi QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Open the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          and select <strong className="text-[var(--foreground)]">WiFi</strong>.
        </li>
        <li>Enter your network name (SSID), security type, and password.</li>
        <li>
          Optional: open <strong className="text-[var(--foreground)]">Design</strong>{" "}
          to match your brand colors or add a logo.
        </li>
        <li>Download PNG for print or SVG for large-format signage.</li>
        <li>Place the code near your entrance, menu, or reception desk.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Use WPA/WPA2 for home and business networks.</li>
        <li>Keep enough quiet-zone (white space) around the code.</li>
        <li>Test with both iPhone and Android before printing.</li>
        <li>
          Prefer dark modules on a light background for maximum scanner
          compatibility.
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
