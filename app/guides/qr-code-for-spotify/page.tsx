import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-spotify";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What Spotify links work in a QR code?",
    a: "Any open.spotify.com link for a song, album, playlist, artist, or podcast episode works. Copy it from Share in the Spotify app or web player.",
  },
  {
    q: "Can I track playlist scans?",
    a: "Yes. Enable a dynamic QR code pointing at your Spotify URL to see scan counts while keeping the printed code unchanged.",
  },
  {
    q: "What if listeners don’t have Spotify installed?",
    a: "The link opens in a browser and offers the app. You don’t need a special Spotify-only QR format.",
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

export default function SpotifyGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Spotify QR", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">Spotify QR code</strong>{" "}
        opens a song, album, playlist, or artist page with one scan — ideal for
        merch, gig posters, restaurant playlists, and packaging.
      </p>

      <GuideCta label="Create a Spotify QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          In Spotify, tap Share → Copy link. You should get an{" "}
          <span className="font-mono text-[var(--foreground)]">
            open.spotify.com
          </span>{" "}
          URL.
        </li>
        <li>
          Open the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          and paste it into the URL field.
        </li>
        <li>
          Optional: enable{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            Dynamic QR
          </Link>{" "}
          to track scans or swap tracks later.
        </li>
        <li>Brand the code with colors or a logo, then download PNG or SVG.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Prefer playlists for venues so you can update songs without reprinting.</li>
        <li>Add a caption like “Scan for the playlist.”</li>
        <li>
          Also see{" "}
          <Link
            href="/qr-code-for/spotify"
            className="text-[var(--brand-2)] underline"
          >
            QR code for Spotify
          </Link>{" "}
          in our use-case directory.
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
