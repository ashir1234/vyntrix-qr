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
    a: "Any open.spotify.com link for a track, album, playlist, artist, podcast show, or episode. Copy it from Share → Copy link in the Spotify app or web player.",
  },
  {
    q: "Is a Spotify Code the same as a QR code?",
    a: "No. Spotify Codes are bar-shaped identifiers that only work inside Spotify's camera. A standard URL QR works with any phone camera and can be styled with your artwork.",
  },
  {
    q: "Can I track playlist scans?",
    a: "Yes. Point a dynamic QR at your Spotify URL to see scan counts while the printed poster or menu stays the same.",
  },
  {
    q: "What if listeners don't have Spotify installed?",
    a: "The link opens in a browser with play prompts and an option to install the app. No special format is required beyond the normal open.spotify.com URL.",
  },
  {
    q: "Can I change the song without reprinting?",
    a: "Link to a playlist you control, or use a dynamic QR and update the destination when you rotate featured tracks.",
  },
  {
    q: "Is a static Spotify QR code free?",
    a: "Yes. Static URL QR codes are free with no watermark. Dynamic codes add analytics and editable links for venues that update music monthly.",
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
        turns physical touchpoints into instant listening. Bands print them on
        gig posters, cafés embed them in table cards, and podcasters add them to
        show notes flyers — one scan opens the exact track, album, or playlist.
        Build a branded code in{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>{" "}
        and export PNG or SVG for merch, menus, or packaging.
      </p>

      <GuideCta label="Create a Spotify QR code" />

      <h2 className="mt-10 text-2xl font-semibold">
        How Spotify QR codes work
      </h2>
      <p className="mt-3 text-[var(--muted)]">
        Spotify shares every item as an{" "}
        <span className="font-mono text-sm text-[var(--foreground)]">
          open.spotify.com
        </span>{" "}
        web URL. A URL QR encodes that address — when scanned, the phone opens
        Spotify (if installed) or the web player. This is separate from
        Spotify&apos;s own Spotify Code graphics, which only scan inside the
        Spotify app and cannot be recolored for your brand guidelines.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        Pick the link type by context: a{" "}
        <strong className="text-[var(--foreground)]">track</strong> for a single
        release, an <strong className="text-[var(--foreground)]">artist</strong>{" "}
        page for discovery, a{" "}
        <strong className="text-[var(--foreground)]">playlist</strong> for venues
        that change songs often, or a{" "}
        <strong className="text-[var(--foreground)]">podcast episode</strong> for
        conference handouts. Venues that reprint rarely should pair playlists
        with a{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic QR
        </Link>{" "}
        so the printed code survives seasonal track rotations.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">
        Track, album, playlist, or podcast?
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <strong className="text-[var(--foreground)]">Track:</strong> vinyl
          inserts, single-release posters, “Song of the week” counter cards
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Album:</strong> merch
          bundles and tour laminates when one record is the focus
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Playlist:</strong> hotels,
          gyms, restaurants — update tracks in Spotify without touching print
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Artist:</strong> festival
          line-up boards when you represent the whole act
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Podcast episode:</strong>{" "}
          sponsor one-sheets and booth QR stands
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Steps to create one</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          In Spotify, open the item → Share → Copy link. Verify the URL starts
          with{" "}
          <span className="font-mono text-sm text-[var(--foreground)]">
            https://open.spotify.com/
          </span>
          .
        </li>
        <li>
          Paste into the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          URL field and scan-test on a phone without Wi-Fi (cellular only) to
          mimic guest behavior.
        </li>
        <li>
          Optional: enable dynamic QR to log scans or redirect the same poster
          to a new release later.
        </li>
        <li>
          Style in Design — many artists use black modules on neon posters; keep
          enough contrast per{" "}
          <Link
            href="/guides/qr-code-with-logo"
            className="text-[var(--brand-2)] underline"
          >
            logo QR best practices
          </Link>
          .
        </li>
        <li>
          Download PNG or SVG. Size for viewing distance — wall posters need
          larger modules than cup sleeves; see{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            QR code size for print
          </Link>
          .
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Where it works well</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Concert posters and ticket stubs linking to the headliner’s latest EP</li>
        <li>Vinyl and CD packaging for digital-era bonus tracks</li>
        <li>Restaurant and bar menus (“Tonight’s playlist”)</li>
        <li>Gym class schedules paired with workout mixes</li>
        <li>Podcast sponsor booths and conference swag bags</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          Prefer playlists for any surface you cannot reprint monthly — edit
          tracks in Spotify, not at the printer.
        </li>
        <li>
          Caption clearly: “Scan to listen” or “Scan for the playlist.”
        </li>
        <li>
          Confirm licensing for public playback in commercial spaces — QR gets
          people to the music; venue licenses are still your responsibility.
        </li>
        <li>
          Test on both Spotify Free and Premium accounts; ads on Free change the
          first seconds of playback.
        </li>
        <li>
          Keep album art visible near the code so scanners know what to expect.
        </li>
        <li>
          For multi-city tours, dynamic QR helps you promote city-specific
          playlists from one tour artwork file.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Using spotify: URI schemes instead of https links cameras recognize</li>
        <li>Linking to a private or collaborative playlist guests cannot open</li>
        <li>Encoding a track removed from Spotify — playlists fail softer</li>
        <li>Confusing Spotify Codes with standard QR in design templates</li>
        <li>Printing too small on cup sleeves scanned at awkward angles</li>
        <li>Region-locked releases that fail for international tourists</li>
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
