import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-with-logo";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Will a logo stop my QR code from scanning?",
    a: "Not if you use high error correction. Vyntrix QR auto-raises the error-correction level when you upload a logo so the code stays scannable.",
  },
  {
    q: "What logo size works best?",
    a: "Keep the logo relatively small (roughly 15–30% of the QR area) and use a simple, high-contrast mark.",
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

export default function LogoGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Logo QR", href: `/guides/${slug}` },
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
        A branded{" "}
        <strong className="text-[var(--foreground)]">QR code with a logo</strong>{" "}
        looks more professional and trustworthy. With{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR
        </Link>
        , you can embed your mark, pick brand colors, and preview the result in
        3D before you download.
      </p>

      <GuideCta label="Make a logo QR code" />

      <h2 className="mt-10 text-2xl font-semibold">How to add a logo</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Go to the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          and enter your URL or content.
        </li>
        <li>
          Open the <strong className="text-[var(--foreground)]">Design</strong>{" "}
          tab and upload your logo (PNG or JPG with transparent background works
          best).
        </li>
        <li>
          Adjust logo size. Error correction is raised automatically for
          reliability.
        </li>
        <li>Test-scan on a phone, then export PNG or SVG.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Design tips</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Prefer flat logos over busy photos.</li>
        <li>Keep strong contrast between dots and background.</li>
        <li>Avoid covering the three finder squares in the corners.</li>
        <li>Always test print size before a large print run.</li>
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
