import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-whatsapp";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What link opens a WhatsApp chat?",
    a: "Use https://wa.me/<number> with the full international number and no plus sign, spaces, or dashes — for example https://wa.me/14155552671.",
  },
  {
    q: "Can I pre-fill a message?",
    a: "Yes. Add ?text=your%20message to the link, e.g. https://wa.me/14155552671?text=Hi%20there.",
  },
  {
    q: "Does it work with WhatsApp Business?",
    a: "Yes. The same wa.me link works for both personal and Business numbers.",
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

export default function WhatsappGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "WhatsApp QR", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">WhatsApp QR code</strong>{" "}
        opens a chat with your number — optionally with a message already typed.
        It&apos;s perfect for support desks, sales, and lead capture.
      </p>

      <GuideCta label="Create a WhatsApp QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Build your link:{" "}
          <span className="font-mono text-[var(--foreground)]">
            https://wa.me/&lt;number&gt;
          </span>{" "}
          (international format, digits only).
        </li>
        <li>
          Optional: add a pre-filled message with{" "}
          <span className="font-mono text-[var(--foreground)]">
            ?text=Hello
          </span>
          .
        </li>
        <li>
          Paste the link into the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>
          .
        </li>
        <li>Add colors or a logo, then download PNG or SVG.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Double-check the country code and number.</li>
        <li>Keep pre-filled messages short and friendly.</li>
        <li>
          Use a{" "}
          <Link href="/guides/dynamic-qr-code" className="text-[var(--brand-2)] underline">
            dynamic code
          </Link>{" "}
          if your number might change.
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
