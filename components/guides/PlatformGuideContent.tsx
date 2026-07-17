import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/seo";
import type { QrPlatform } from "@/lib/qr-platforms";

export function PlatformGuideContent({ platform }: { platform: QrPlatform }) {
  const path = `/qr-code-for/${platform.slug}`;

  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "QR code for…", href: "/qr-code-for" },
        { name: platform.name, href: path },
      ]}
      jsonLd={[
        breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "QR code for…", path: "/qr-code-for" },
          { name: platform.h1, path },
        ]),
        articleJsonLd({
          title: platform.title,
          description: platform.description,
          path,
        }),
        faqJsonLd(platform.faqs),
      ]}
    >
      <h1 className="text-4xl font-bold tracking-tight">{platform.h1}</h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{platform.intro}</p>

      <GuideCta label={`Create a ${platform.name} QR code`} />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          {platform.urlHint}. Example:{" "}
          <span className="break-all font-mono text-sm text-[var(--foreground)]">
            {platform.urlExample}
          </span>
        </li>
        <li>
          Open the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          and paste the link into the URL field (or choose WiFi / vCard when
          relevant).
        </li>
        <li>
          Optional: enable a{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            dynamic QR code
          </Link>{" "}
          to edit the destination later and track scans.
        </li>
        <li>Customize colors or add your logo, then download PNG or SVG.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        {platform.tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>

      {platform.relatedGuideSlug && (
        <p className="mt-8 rounded-xl border border-[var(--border)] bg-[var(--surface)] p-4 text-sm text-[var(--muted)]">
          Want more detail? Read the full guide:{" "}
          <Link
            href={`/guides/${platform.relatedGuideSlug}`}
            className="font-medium text-[var(--brand-2)] underline"
          >
            {platform.name} QR deep dive →
          </Link>
        </p>
      )}

      <h2 className="mt-10 text-2xl font-semibold">FAQ</h2>
      <div className="mt-4 space-y-3">
        {platform.faqs.map((f) => (
          <details key={f.q} className="glass rounded-xl p-4">
            <summary className="cursor-pointer font-medium">{f.q}</summary>
            <p className="mt-2 text-sm text-[var(--muted)]">{f.a}</p>
          </details>
        ))}
      </div>

      <p className="mt-10 text-sm text-[var(--muted)]">
        Browse more use cases in the{" "}
        <Link href="/qr-code-for" className="text-[var(--brand-2)] underline">
          QR code for… directory
        </Link>{" "}
        or our{" "}
        <Link href="/guides" className="text-[var(--brand-2)] underline">
          guides
        </Link>
        .
      </p>
    </GuideLayout>
  );
}
