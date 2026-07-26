import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
} from "@/lib/seo";
import type { QrPlatform, QrPlatformCategory } from "@/lib/qr-platforms";

function categoryExtras(category: QrPlatformCategory, name: string) {
  switch (category) {
    case "social":
      return {
        why: [
          `Put a ${name} QR on packaging, posters, or business cards so people follow or open your profile without typing a handle.`,
          "Prefer official share / profile URLs so every phone opens the app or mobile web correctly.",
          "Use a dynamic QR when you might change the destination campaign without reprinting.",
        ],
        mistakes: [
          "Encoding a temporary promo URL as a static code on long-lived print",
          "Low-contrast brand colors that fail in outdoor light",
          "No caption explaining what the scan does",
        ],
      };
    case "music":
      return {
        why: [
          `A ${name} QR opens a track, album, or playlist instantly — ideal for merch, gigs, and venue playlists.`,
          "Playlist links are easier to update than single-track codes when you use a dynamic QR.",
          "Pair the code with a short line like “Scan for the playlist.”",
        ],
        mistakes: [
          "Using a private or region-locked link",
          "Printing too small on dense merch art",
          "Forgetting to test on phones without the app installed",
        ],
      };
    case "business":
      return {
        why: [
          `Business ${name} codes reduce friction for bookings, profiles, and contact capture.`,
          "Dynamic codes help when landing pages or forms change seasonally.",
          "Keep contrast high on professional print stock.",
        ],
        mistakes: [
          "Linking to a desktop-only page",
          "Skipping quiet zone on crowded flyers",
          "Static codes on materials you reprint rarely but update often online",
        ],
      };
    case "forms":
      return {
        why: [
          `QR codes for ${name} send people straight into a form — surveys, sign-ups, or feedback.`,
          "Test the form on mobile before you print.",
          "Dynamic QRs let you swap forms without new print runs.",
        ],
        mistakes: [
          "Forms that require desktop field layouts",
          "Expired form links behind a static QR",
          "No confirmation page after submit",
        ],
      };
    case "apps":
      return {
        why: [
          `App download QRs should route users to the right store for their device when possible.`,
          "A smart landing page behind a dynamic QR often beats a single store URL.",
          "Keep the promise clear: “Scan to get the app.”",
        ],
        mistakes: [
          "One store link for a cross-platform audience",
          "Tiny codes on packaging curves",
          "No fallback URL if the store listing moves",
        ],
      };
    case "print":
      return {
        why: [
          `Print placements for ${name} need size, contrast, and proofing more than fancy styling.`,
          "Follow the 10:1 distance rule and leave a quiet zone.",
          "Export SVG for large-format work when you can.",
        ],
        mistakes: [
          "Upscaling a tiny PNG for posters",
          "Glossy laminate glare under bright lights",
          "Skipping a real-device proof",
        ],
      };
    default:
      return {
        why: [
          `A dedicated ${name} QR removes typing friction and looks intentional on marketing materials.`,
          "Choose static for permanent links; dynamic when you need edits or analytics.",
          "Always test-scan before a full print run.",
        ],
        mistakes: [
          "Unclear destination with no caption",
          "Low contrast or missing quiet zone",
          "Wrong size for the viewing distance",
        ],
      };
  }
}

export function PlatformGuideContent({ platform }: { platform: QrPlatform }) {
  const path = `/qr-code-for/${platform.slug}`;
  const extras = categoryExtras(platform.category, platform.name);
  const canonicalPath = platform.relatedGuideSlug
    ? `/guides/${platform.relatedGuideSlug}`
    : path;

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
          { name: platform.h1, path: canonicalPath },
        ]),
        articleJsonLd({
          title: platform.title,
          description: platform.description,
          path: canonicalPath,
        }),
        faqJsonLd(platform.faqs),
      ]}
    >
      <h1 className="text-4xl font-bold tracking-tight">{platform.h1}</h1>
      <p className="mt-4 text-lg text-[var(--muted)]">{platform.intro}</p>

      <GuideCta label={`Create a ${platform.name} QR code`} />

      <h2 className="mt-10 text-2xl font-semibold">Why use a {platform.name} QR</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        {extras.why.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

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
        <li>
          Customize colors or add your logo, then download PNG or SVG. Check{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            print size
          </Link>{" "}
          before a large run.
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        {platform.tips.map((tip) => (
          <li key={tip}>{tip}</li>
        ))}
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        {extras.mistakes.map((item) => (
          <li key={item}>{item}</li>
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
        </Link>
        , our{" "}
        <Link href="/guides" className="text-[var(--brand-2)] underline">
          guides
        </Link>
        , or the{" "}
        <Link href="/blog" className="text-[var(--brand-2)] underline">
          blog
        </Link>
        .
      </p>
    </GuideLayout>
  );
}
