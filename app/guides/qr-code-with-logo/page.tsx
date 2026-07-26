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
    a: "Not if you use high error correction and keep the logo modest. Vyntrix QR auto-raises the error-correction level when you upload a logo so the code stays scannable.",
  },
  {
    q: "What logo size works best?",
    a: "Keep the logo relatively small (roughly 15–30% of the QR area) and use a simple, high-contrast mark on a clean center pad.",
  },
  {
    q: "PNG or SVG logo?",
    a: "A transparent PNG or SVG mark works best. Avoid low-resolution JPEGs with white boxes or busy photos.",
  },
  {
    q: "Can I put the logo in a corner?",
    a: "No — never cover the three large finder squares in the corners. Center logos are the safe default.",
  },
  {
    q: "Do branded colors hurt scanning?",
    a: "They can if contrast is low (yellow on white, light gray on cream). Keep modules dark relative to the background and test on real phones.",
  },
  {
    q: "Should marketing print a logo QR static or dynamic?",
    a: "If the campaign URL might change, use a dynamic short link under the branded design so you can update without reprinting.",
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
        looks more professional and trustworthy than a plain black square. With{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR
        </Link>
        , you can embed your mark, pick brand colors, and preview the result in
        2D and 3D before you download — without a watermark on free static
        codes.
      </p>

      <GuideCta label="Make a logo QR code" />

      <h2 className="mt-10 text-2xl font-semibold">
        Why logos work (error correction)
      </h2>
      <p className="mt-3 text-[var(--muted)]">
        QR codes include error correction so scanners can recover data even when
        some modules are missing or damaged. Placing a logo in the center
        intentionally “damages” part of the code; higher error-correction levels
        compensate. That is why generators raise EC when a logo is present —
        and why oversized logos still fail.
      </p>

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
          Decide static vs{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic
          </Link>{" "}
          if the destination might change after print.
        </li>
        <li>
          Open the <strong className="text-[var(--foreground)]">Design</strong>{" "}
          tab and upload your logo (transparent PNG works best).
        </li>
        <li>
          Adjust logo size carefully. Error correction is raised automatically
          for reliability.
        </li>
        <li>
          Preview, test-scan on a phone, then export PNG or SVG. For print
          sizing, follow the{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            print size guide
          </Link>
          .
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Logo file tips</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Prefer flat marks over detailed photographs</li>
        <li>Use transparency instead of a solid white square when possible</li>
        <li>Simple monochrome or two-color logos scan more reliably</li>
        <li>Export the logo large enough that it stays sharp when scaled down</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Design tips</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Keep strong contrast between dots and background</li>
        <li>Never cover the three finder squares in the corners</li>
        <li>Leave a quiet zone around the entire code</li>
        <li>Avoid neon-on-neon or light-on-light brand palettes</li>
        <li>Always test print size before a large print run</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Colors, frames, and 3D preview</h2>
      <p className="mt-3 text-[var(--muted)]">
        Brand colors and frames help codes feel on-brand on packaging and
        posters, but scanners care about contrast first. Use the live preview —
        including 3D materials if you like — to judge aesthetics, then verify
        with a real camera scan. A beautiful code that does not open is wasted
        print budget.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">When not to use a logo</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Very small codes (business-card corners under ~2 cm)</li>
        <li>Extremely dense payloads without a short/dynamic link</li>
        <li>Industrial labels scanned from awkward angles or dirty environments</li>
        <li>Situations where maximum reliability beats brand flourish</li>
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
