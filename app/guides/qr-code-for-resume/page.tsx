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
    a: "Some do — especially in design, tech, and creative fields where portfolios matter. Many still rely on PDF text search and ATS. Always keep your URL typed out as plain text too.",
  },
  {
    q: "What should it link to?",
    a: "A personal portfolio, LinkedIn profile, or a hosted PDF CV on your domain. Avoid expiring file-share links from free tiers that die mid-hiring season.",
  },
  {
    q: "Will it hurt ATS parsing?",
    a: "A small corner image is usually fine. Do not cover keywords or replace email/phone with only a QR. Export a text-friendly PDF layer for applicant systems.",
  },
  {
    q: "How big should the QR be on a resume?",
    a: "About 2 × 2 cm in a corner — large enough to scan from a printed page, small enough not to dominate. Skip decorative frames that shrink the quiet zone.",
  },
  {
    q: "Should my resume QR be static or dynamic?",
    a: "Dynamic lets you update your portfolio or track which version of your CV drove scans. Static is acceptable if the URL is your permanent personal domain.",
  },
  {
    q: "Can I link to a PDF instead of a website?",
    a: "Yes. Host the PDF on your site or a stable cloud link. See the PDF QR guide for hosting tips — broken links on a resume look worse than no code at all.",
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
        gives recruiters a one-scan path to your portfolio, case studies, or{" "}
        <Link
          href="/guides/qr-code-for-linkedin"
          className="text-[var(--brand-2)] underline"
        >
          LinkedIn
        </Link>{" "}
        — without typing a long URL on a printed page. Used well, it signals
        polish in design and tech roles. Used poorly, it clutters an ATS-friendly
        layout. Generate a clean code in{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>
        .
      </p>

      <GuideCta label="Create a resume QR code" />

      <h2 className="mt-10 text-2xl font-semibold">What recruiters expect</h2>
      <p className="mt-3 text-[var(--muted)]">
        Applicant tracking systems parse text — not QR images. Your name, email,
        phone, and role keywords must remain selectable text. The QR is a bonus
        for humans reviewing a printed stack or for hiring managers who want to
        see work samples immediately.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        Link to something that loads fast on mobile: a portfolio homepage, not a
        40 MB PDF. First impressions happen in the first three seconds after the
        scan.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">When it helps most</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Design, UX, photography, and architecture portfolios</li>
        <li>Developers linking to GitHub highlights or a project demo</li>
        <li>Career fairs where paper resumes exchange hands quickly</li>
        <li>International applications where LinkedIn is the canonical profile</li>
        <li>Consultants who update case studies more often than PDF versions</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">When to skip it</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Strict one-page ATS submissions that reject graphics</li>
        <li>Roles where a QR looks gimmicky (some legal and government forms)</li>
        <li>When your only link is an expired Google Drive share</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Steps to create one</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>Choose a stable HTTPS URL — your domain beats a temporary file host.</li>
        <li>
          Optional: use a{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic QR
          </Link>{" "}
          to swap portfolio versions during a job search.
        </li>
        <li>
          Generate black-on-white in the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          — avoid heavy styling on a small print area.
        </li>
        <li>Place in the top or bottom corner; duplicate the URL as text nearby.</li>
        <li>Export PDF from Word, Google Docs, or InDesign; print-test the scan.</li>
        <li>
          Keep sizing consistent with{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            print size guidance
          </Link>
          .
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Destination ideas</h2>
      <p className="mt-3 text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">Portfolio site:</strong>{" "}
        best for visual roles — lead with three strong projects above the fold.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">LinkedIn:</strong> familiar
        to HR; ensure your headline matches the resume role you are targeting.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">Hosted PDF:</strong> useful
        when you need a fixed snapshot — follow the{" "}
        <Link
          href="/guides/qr-code-for-pdf"
          className="text-[var(--brand-2)] underline"
        >
          PDF QR guide
        </Link>{" "}
        for reliable hosting.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Never replace contact details with only a QR.</li>
        <li>Use a personal domain or long-lived URL — not fragile share links.</li>
        <li>Label subtly: “Portfolio” or “Work samples” under the code.</li>
        <li>Ensure the destination works without login walls.</li>
        <li>Update the landing page before you update the QR (if static).</li>
        <li>Match tone: minimal code on a minimal resume; bold roles can brand it.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Oversized QR that pushes experience off page one</li>
        <li>Link to a generic homepage with no portfolio section</li>
        <li>Password-protected portfolio on a student hosting plan</li>
        <li>Low-contrast colored modules that fail on office printers</li>
        <li>QR only — recruiters on desktop cannot scan a PDF attachment</li>
        <li>Forgetting to update content for six months during an active search</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Related guides</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <Link
            href="/guides/qr-code-for-linkedin"
            className="text-[var(--brand-2)] underline"
          >
            LinkedIn QR code
          </Link>{" "}
          — profile at networking events
        </li>
        <li>
          <Link
            href="/guides/qr-code-for-business-card"
            className="text-[var(--brand-2)] underline"
          >
            Business card QR
          </Link>{" "}
          — same link on card and CV
        </li>
        <li>
          <Link
            href="/guides/qr-code-for-pdf"
            className="text-[var(--brand-2)] underline"
          >
            PDF QR code
          </Link>{" "}
          — hosted CV downloads
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
