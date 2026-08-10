import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-youtube";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What link should a YouTube QR code use?",
    a: "Use a full video URL (https://youtu.be/VIDEO_ID or youtube.com/watch?v=…) for one specific clip, or your channel URL (https://youtube.com/@handle) for subscribe-focused campaigns. Playlists work well for series or tutorials.",
  },
  {
    q: "Can I start playback at a specific timestamp?",
    a: "Yes. Copy the share link with ?t=90s or &t=1m30s appended. The QR opens the video at that moment — handy for conference handouts that reference one demo segment.",
  },
  {
    q: "Can I change which video the code points to?",
    a: "With a dynamic QR, yes — update the destination in your dashboard without reprinting posters or packaging.",
  },
  {
    q: "Can I track scans on my YouTube QR code?",
    a: "Yes. Dynamic QR codes show scan counts and device types. YouTube Analytics still tracks views separately once someone lands on the video.",
  },
  {
    q: "Is a static YouTube QR free?",
    a: "Yes. Static URL QR codes are free with no watermark. Use them when the video or channel URL will not change.",
  },
  {
    q: "Will it open the YouTube app?",
    a: "On phones with YouTube installed, links usually deep-link into the app. Otherwise the mobile site or desktop player opens in the browser.",
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

export default function YoutubeGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "YouTube QR", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">YouTube QR code</strong>{" "}
        bridges print and video. Product manuals can link to setup tutorials,
        musicians can put a release on gig posters, and educators can point
        syllabus pages at lecture recordings — all with one scan. Build yours in{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>
        , optionally track scans with a dynamic link, and download PNG or SVG
        for any layout.
      </p>

      <GuideCta label="Create a YouTube QR code" />

      <h2 className="mt-10 text-2xl font-semibold">
        How YouTube QR codes work
      </h2>
      <p className="mt-3 text-[var(--muted)]">
        The QR stores a standard YouTube HTTPS URL. There is no proprietary
        YouTube QR format required — unlike broadcast “QR moments” that flash
        on screen, your printed code is just a link that any camera understands.
        When scanned, the device hands off to YouTube&apos;s app or website,
        which loads the video, playlist, or channel you encoded.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        Choose the destination based on intent: a{" "}
        <strong className="text-[var(--foreground)]">video URL</strong> maximizes
        immediate watch time; a{" "}
        <strong className="text-[var(--foreground)]">channel URL</strong>{" "}
        encourages subscriptions; a{" "}
        <strong className="text-[var(--foreground)]">playlist</strong> keeps
        viewers in a curated sequence. For rotating “featured video” campaigns,
        use a{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic QR
        </Link>{" "}
        so the same poster can highlight new uploads each month.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">
        Video, channel, or playlist?
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <strong className="text-[var(--foreground)]">Single video:</strong>{" "}
          packaging inserts, how-to labels, event handouts — copy Share → Copy
          link from YouTube
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Channel (@handle):</strong>{" "}
          business cards, banner stands — best when you publish regularly
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Playlist:</strong> course
          materials, album collections, conference session archives
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Timestamp links:</strong>{" "}
          highlight one demo inside a long webinar recording
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Steps to create one</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          In YouTube, open the video, channel, or playlist → Share → Copy link.
          Prefer short{" "}
          <span className="font-mono text-sm text-[var(--foreground)]">
            youtu.be
          </span>{" "}
          URLs for slightly simpler QR patterns, though both formats work.
        </li>
        <li>
          Paste into the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          URL field and scan-test on your phone before designing.
        </li>
        <li>
          Enable dynamic QR if you want analytics or expect to swap the
          featured video without reprinting.
        </li>
        <li>
          Style the code in Design — brand colors and a small logo are fine if
          contrast stays strong (see{" "}
          <Link
            href="/guides/qr-code-with-logo"
            className="text-[var(--brand-2)] underline"
          >
            logo QR tips
          </Link>
          ).
        </li>
        <li>
          Download PNG or SVG. Size for distance — a code on a billboard needs
          more modules than one on a business card; see{" "}
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
        <li>Product boxes linking to unboxing or assembly videos</li>
        <li>Museum and exhibit labels for extended interviews</li>
        <li>Music merch, vinyl sleeves, and tour posters</li>
        <li>Real-estate signage for property walkthroughs</li>
        <li>Classroom posters and textbook companion pages</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Caption the action: “Scan to watch the tutorial” or “See it in action.”</li>
        <li>
          Link to public, embeddable videos — private or age-restricted content
          frustrates scanners.
        </li>
        <li>
          Put the most important hook in the first seconds; QR traffic often
          arrives on mobile with sound off until tapped.
        </li>
        <li>
          Use playlists when one print piece should outlive a single upload
          cycle.
        </li>
        <li>
          Test on slow cellular data; heavy 4K intros that buffer lose viewers.
        </li>
        <li>
          For long-lived print, prefer dynamic QR so you can fix broken or
          outdated links centrally.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Encoding studio preview or unlisted links that stop working later</li>
        <li>Linking to a video you plan to delete after a short promo window</li>
        <li>Printing on glossy stock with glare under retail lighting</li>
        <li>Using channel /c/ legacy URLs when @handle URLs are cleaner</li>
        <li>Forgetting timestamp parameters on handouts meant for one segment</li>
        <li>Codes too small on TV-show slide decks viewed from the back row</li>
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
