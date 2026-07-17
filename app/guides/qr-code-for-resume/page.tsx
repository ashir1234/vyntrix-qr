import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-resume";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Do recruiters actually scan resume QR codes?",
    a: "Some do — especially in design and tech. Always print the URL as text too so ATS and humans can still use it.",
  },
  {
    q: "What should it link to?",
    a: "A personal portfolio, LinkedIn, or a hosted PDF CV that you control and keep online.",
  },
  {
    q: "Will it hurt ATS parsing?",
    a: "A small corner image is usually fine. Avoid covering text. Don’t replace contact details with only a QR.",
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

export default function ResumeGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Resume QR", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">resume QR code</strong>{" "}
        lets recruiters open your portfolio or LinkedIn without typing. Keep it
        subtle and professional.
      </p>

      <GuideCta label="Create a resume QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Choose a stable URL (portfolio or LinkedIn).</li>
        <li>
          Generate a clean black-on-white code in the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>
          .
        </li>
        <li>Place it in a corner of your CV; keep contact text visible.</li>
        <li>Export PDF of the resume and test the scan from a printout.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Don’t use fragile file-sharing links that expire.</li>
        <li>
          Pair with a{" "}
          <Link
            href="/guides/qr-code-for-linkedin"
            className="text-[var(--brand-2)] underline"
          >
            LinkedIn QR
          </Link>{" "}
          strategy if networking is the goal.
        </li>
        <li>Ensure the destination stays live for months after applying.</li>
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
