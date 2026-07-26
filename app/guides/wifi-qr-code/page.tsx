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
    a: "Yes. Modern iPhone and Android cameras recognize WiFi QR codes and offer a one-tap connect prompt. Guests usually do not need a separate QR scanner app.",
  },
  {
    q: "Is a WiFi QR code free?",
    a: "Yes. Static WiFi QR codes on Vyntrix QR are free with no watermark. Pro adds dynamic WiFi landing pages so you can track how many people open the WiFi details (not whether they successfully joined the network).",
  },
  {
    q: "What security types are supported?",
    a: "WPA/WPA2 (most common for home and business routers), WEP (legacy), and open networks with no password. Prefer WPA/WPA2 whenever possible.",
  },
  {
    q: "Does the QR code reveal my WiFi password to anyone who sees it?",
    a: "Yes. Anyone who can scan or photograph the code can decode the SSID and password. Treat printed WiFi codes like a shared password: place them in guest areas, not on public street windows.",
  },
  {
    q: "Will the code still work if I change my router password?",
    a: "A static WiFi QR encodes the password permanently. If you change the password, print a new code — or use a dynamic WiFi landing page so you can update credentials without reprinting the physical QR.",
  },
  {
    q: "Can I brand the WiFi QR with my logo and colors?",
    a: "Yes. In Studio Design you can add a logo, brand colors, and styles. Keep strong contrast and test-scan before you print a large batch.",
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
        password. Hotels, cafés, coworking spaces, offices, and home hosts use
        them to cut “what’s the WiFi?” interruptions. Create one free in under a
        minute with{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>
        .
      </p>

      <GuideCta label="Create a WiFi QR code" />

      <h2 className="mt-10 text-2xl font-semibold">How WiFi QR codes work</h2>
      <p className="mt-3 text-[var(--muted)]">
        The QR does not magically “open WiFi.” It encodes a standard WiFi
        configuration string that phones understand — typically including network
        name (SSID), security type (WPA, WEP, or none), and password. When the
        camera app recognizes that format, it offers to join the network. No
        website visit is required for a classic static WiFi code.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        That is different from a normal URL QR that opens a webpage. A URL QR
        can link to instructions; a WiFi QR can trigger the join prompt directly.
        Choose based on whether you want one-tap connect or a branded landing
        experience (see dynamic WiFi pages below).
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Steps to create one</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Open the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          and select <strong className="text-[var(--foreground)]">WiFi</strong>.
        </li>
        <li>
          Enter your network name (SSID) exactly as it appears on phones —
          including capitalization and spaces.
        </li>
        <li>
          Choose security type (usually{" "}
          <strong className="text-[var(--foreground)]">WPA/WPA2</strong>) and
          enter the password carefully. A single typo means every scan fails.
        </li>
        <li>
          Optional: open{" "}
          <strong className="text-[var(--foreground)]">Design</strong> to match
          brand colors or add a logo. Prefer dark modules on a light background.
        </li>
        <li>
          Download PNG for everyday print or SVG for large-format signage, then
          place the code near the entrance, menu, or reception desk.
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">
        Static WiFi QR vs dynamic WiFi page
      </h2>
      <p className="mt-3 text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">Static WiFi QR:</strong>{" "}
        credentials live inside the code. Free, works offline once printed, no
        account required. Change the password later and you must reprint.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">
          Dynamic WiFi landing page (Pro):
        </strong>{" "}
        the printed QR points at a short link that shows WiFi details (and can
        track opens). You can update credentials without reprinting. Opens are
        not the same as successful network joins — phones do not report that back
        to the QR service.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        For a deeper comparison of editable vs fixed codes in general, read{" "}
        <Link
          href="/guides/static-vs-dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          static vs dynamic QR codes
        </Link>
        .
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Where to place the code</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Reception desks, lobby tablets, and check-in counters</li>
        <li>Table tents or menus in cafés and restaurants</li>
        <li>Guest room folders and Airbnb welcome cards</li>
        <li>Meeting-room door signs and coworking kitchen areas</li>
        <li>
          Avoid placing guest WiFi codes on public sidewalk windows if the
          network is not meant for passers-by
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Use WPA/WPA2 for home and business networks; avoid open WiFi when you can.</li>
        <li>
          Keep a quiet zone (empty margin) around the code so cameras can lock
          on.
        </li>
        <li>Test with both iPhone and Android before a print run.</li>
        <li>
          Size for scan distance — roughly one-tenth of how far away people stand.
          See{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            QR code size for print
          </Link>
          .
        </li>
        <li>
          If you add a logo, keep it modest and high-contrast —{" "}
          <Link
            href="/guides/qr-code-with-logo"
            className="text-[var(--brand-2)] underline"
          >
            logo QR tips
          </Link>
          .
        </li>
        <li>
          Rotate guest passwords periodically and update printed materials (or
          use a dynamic WiFi page).
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Wrong SSID spelling or hidden network names guests cannot see</li>
        <li>Printing too small for the viewing distance</li>
        <li>Low-contrast designs (light gray on white, neon on busy photos)</li>
        <li>Laminating with heavy glare under bright lights</li>
        <li>Sharing a primary staff network instead of a guest VLAN/SSID</li>
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
