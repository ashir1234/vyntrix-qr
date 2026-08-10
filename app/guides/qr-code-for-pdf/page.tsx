import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-pdf";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Can a QR code store a PDF file directly?",
    a: "No. QR codes hold a limited amount of text — typically a URL. Host the PDF online (or on your site) and encode that link. The scan opens the file in the browser or downloads it depending on the host.",
  },
  {
    q: "Where can I host a PDF for free?",
    a: "Google Drive, Dropbox, OneDrive, or your own website all work. The link must be public (or “anyone with the link”) and should open the file without a confusing login wall. Test in an incognito window before printing.",
  },
  {
    q: "How do I update the PDF later?",
    a: "Use a dynamic QR code. Upload a new file or point the short link at a new URL — the printed QR stays the same. Static codes require reprinting whenever the file changes.",
  },
  {
    q: "Will the PDF open on every phone?",
    a: "Most modern phones open PDFs in the browser or a built-in viewer. Very large files may be slow on mobile data. Keep brochures under a few megabytes when possible.",
  },
  {
    q: "Should I link to the PDF or a web page?",
    a: "A web page with an embedded viewer or download button often reads better on phones — you control layout, analytics, and updates. Pure PDF links are fine for manuals and one-off documents.",
  },
  {
    q: "Can I track how many people opened the PDF?",
    a: "Yes with a dynamic QR — you see scan counts. The host (Drive, your CMS) may also offer download stats. Scans and opens are not always the same person.",
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

export default function PdfGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "PDF QR", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">QR code for a PDF</strong>{" "}
        lets anyone open your brochure, manual, menu, or spec sheet with a scan
        — no email attachment, no “can you resend the file?” Hotels, manufacturers,
        consultants, and event organizers use them on posters, packaging, and
        handouts. Build one in{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>
        .
      </p>

      <GuideCta label="Create a PDF QR code" />

      <h2 className="mt-10 text-2xl font-semibold">How PDF QR codes work</h2>
      <p className="mt-3 text-[var(--muted)]">
        The QR does not contain the PDF bytes. It contains a URL that points to
        where the file lives — your server, cloud storage, or a document
        platform. When someone scans, their phone fetches that URL. If the host
        serves the file correctly, the PDF opens or downloads immediately.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        That is why hosting matters as much as the QR itself. A broken share
        setting, expired link, or login prompt will frustrate scanners even if
        the code is perfectly printed.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">When to use one</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Product manuals and warranty sheets on{" "}
          <Link
            href="/guides/qr-code-for-product-packaging"
            className="text-[var(--brand-2)] underline"
          >
            packaging
          </Link>
        </li>
        <li>Restaurant or catering menus you update seasonally</li>
        <li>Conference handouts and speaker slide PDFs</li>
        <li>Real estate flyers with full photo galleries as a PDF booklet</li>
        <li>Resumes or portfolios hosted as a downloadable CV</li>
        <li>Compliance documents where a printed summary points to the full text</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Steps to create one</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Upload the PDF to a stable, public URL. Copy the direct link — not a
          folder view that requires clicks.
        </li>
        <li>
          Open the link in a private browser tab. Confirm it downloads or opens
          without signing in.
        </li>
        <li>
          Paste the URL into the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          URL field.
        </li>
        <li>
          Enable a{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic QR
          </Link>{" "}
          if you may replace the file or redirect to a newer version later.
        </li>
        <li>Style the code, then download PNG for quick print or SVG for large runs.</li>
        <li>
          Size for viewing distance — see{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            QR code size for print
          </Link>
          .
        </li>
        <li>Add a label: “Scan for full menu” or “Digital brochure.”</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Hosting options compared</h2>
      <p className="mt-3 text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">Your own website:</strong>{" "}
        best control, custom landing page, no third-party branding. Use HTTPS
        and a short path like{" "}
        <span className="font-mono text-sm text-[var(--foreground)]">
          /brochure-2026
        </span>
        .
      </p>
      <p className="mt-3 text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">Cloud storage:</strong>{" "}
        fast to set up. Double-check “anyone with link” permissions and that
        mobile browsers are not blocked by an account picker.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">Dynamic short link:</strong>{" "}
        the printed QR points at your redirect. Swap the PDF URL in the dashboard
        when you publish v2 — signs and boxes stay valid.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Keep PDFs under ~5 MB when mobile data is likely.</li>
        <li>Test the link in incognito mode on iPhone and Android.</li>
        <li>Use dynamic QR for menus, price lists, and anything that changes.</li>
        <li>Prefer readable filenames and document titles inside the PDF.</li>
        <li>Add page numbers and a “last updated” date on living documents.</li>
        <li>
          For long-term print, read{" "}
          <Link
            href="/guides/static-vs-dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            static vs dynamic QR codes
          </Link>{" "}
          before you choose.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Sharing a Drive link that opens an editor instead of the file</li>
        <li>Static QR on a document you revise every month</li>
        <li>50 MB files that timeout on hotel WiFi</li>
        <li>No call-to-action text — people scan without knowing what they get</li>
        <li>Password-protected PDFs that mobile viewers cannot open</li>
        <li>Printing before testing with a real phone camera</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Related guides</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <Link
            href="/guides/qr-code-for-resume"
            className="text-[var(--brand-2)] underline"
          >
            Resume QR code
          </Link>{" "}
          — link to a hosted CV PDF
        </li>
        <li>
          <Link
            href="/guides/qr-code-for-restaurant-menu"
            className="text-[var(--brand-2)] underline"
          >
            Restaurant menu QR
          </Link>{" "}
          — seasonal PDF menus
        </li>
        <li>
          <Link
            href="/guides/qr-code-for-product-packaging"
            className="text-[var(--brand-2)] underline"
          >
            Product packaging QR
          </Link>{" "}
          — manuals on the box
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
