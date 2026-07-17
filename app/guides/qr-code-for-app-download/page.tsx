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
    a: "Not with a single store URL. Print two codes, or link a landing page that detects the device and redirects to the right store.",
  },
  {
    q: "Where do I get the official store links?",
    a: "Use apps.apple.com for iOS and play.google.com/store/apps/details?id=… for Android from your developer consoles.",
  },
  {
    q: "How do I track installs vs scans?",
    a: "Store consoles track installs. A dynamic QR tracks scans. Use both for a fuller picture.",
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
        sends people to the App Store or Google Play. Use two codes — or one
        smart landing page — so every phone lands in the right store.
      </p>

      <GuideCta label="Create an app download QR" />

      <h2 className="mt-10 text-2xl font-semibold">Option A — Two store codes</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Copy your App Store and Play Store URLs.</li>
        <li>
          Create two codes in the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          and label them iOS / Android on the print.
        </li>
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
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Option B — One smart link</h2>
      <p className="mt-3 text-[var(--muted)]">
        Host a tiny landing page that detects iOS vs Android and redirects.
        Encode that single URL in one QR — cleaner packaging, slightly more
        setup. Use a{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic QR
        </Link>{" "}
        so you can fix the landing page later.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Always use official store URLs, not unofficial mirrors.</li>
        <li>On packaging, keep codes large enough for close-range scans.</li>
        <li>Add UTM parameters if you also use web analytics.</li>
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
