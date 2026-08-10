import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-tiktok";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Should I link my profile or a specific video?",
    a: "Profile links (tiktok.com/@handle) are best for long-term follower growth on packaging and signage. Video links suit limited campaigns — a challenge, product launch, or influencer collab where one clip is the hero.",
  },
  {
    q: "Will the QR open the TikTok app?",
    a: "Usually yes when TikTok is installed on the phone. Otherwise the link opens in the mobile browser, where viewers can still watch and follow.",
  },
  {
    q: "Can I change the video later without reprinting?",
    a: "Yes — use a dynamic QR that redirects to your TikTok URL. Update the destination in your dashboard while the printed code stays identical.",
  },
  {
    q: "Can I measure how many people scanned?",
    a: "Dynamic QR codes report scan counts and basic device info. TikTok’s own analytics track views and follows separately after the app opens.",
  },
  {
    q: "Is a static TikTok QR code free?",
    a: "Yes. Static URL QR codes are free with no watermark. Dynamic codes add tracking and editable destinations for multi-month print runs.",
  },
  {
    q: "Does TikTok have its own QR format?",
    a: "TikTok shows profile QR codes inside the app for in-person follows. A standard URL QR is what you want for branded print — any camera can read it, and you control colors and logo placement.",
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

export default function TikTokGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "TikTok QR", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">TikTok QR code</strong>{" "}
        moves offline fans onto your profile or latest clip in seconds. Beauty
        brands tuck them into PR boxes, venues put them on stage screens, and
        creators hand them out at meetups so no one misspells a handle with
        numbers at the end. Generate a scannable link in{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>
        , match your aesthetic, and export for stickers, wraps, or banners.
      </p>

      <GuideCta label="Create a TikTok QR code" />

      <h2 className="mt-10 text-2xl font-semibold">
        How TikTok QR codes work
      </h2>
      <p className="mt-3 text-[var(--muted)]">
        TikTok profile and video pages have public HTTPS URLs — typically{" "}
        <span className="font-mono text-sm text-[var(--foreground)]">
          https://www.tiktok.com/@username
        </span>{" "}
        or a link copied from Share on a specific video. A URL QR encodes that
        address. The phone camera opens it; TikTok&apos;s app intercepts the link
        when installed, otherwise the mobile web player loads.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        That is simpler and more flexible than screenshotting TikTok&apos;s
        in-app profile QR, which is meant for face-to-face follows and does not
        embed cleanly in Illustrator or Canva layouts. With Studio you also
        choose whether the code is fixed forever or managed through a{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic redirect
        </Link>{" "}
        — useful when the same shelf talker should promote different hashtag
        challenges each quarter.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">
        Profile vs video vs Shop link
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <strong className="text-[var(--foreground)]">Profile:</strong> default
          for packaging, hang tags, and permanent signage — every scan is a
          follow opportunity
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Single video:</strong> pop-up
          activations, limited drops, or “watch the reveal” posters
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Campaign hashtag:</strong>{" "}
          link to your best example video using that hashtag rather than the tag
          page itself (tag URLs change and are harder to preview)
        </li>
        <li>
          <strong className="text-[var(--foreground)]">TikTok Shop:</strong> if
          you sell in-app, product URLs from Share work like any other link
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Steps to create one</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          In TikTok, open your profile or video → Share → Copy link. Confirm
          the handle matches what you display in print.
        </li>
        <li>
          Paste into the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          URL field. Scan once before spending on print.
        </li>
        <li>
          Turn on dynamic QR if you want scan stats or plan to rotate which
          video the code promotes.
        </li>
        <li>
          Design pass: bold contrast beats trendy low-contrast palettes on small
          labels. Optional logo — see{" "}
          <Link
            href="/guides/qr-code-with-logo"
            className="text-[var(--brand-2)] underline"
          >
            QR code with logo
          </Link>
          .
        </li>
        <li>
          Export PNG or SVG. On narrow packaging keep the code at least ~2 cm
          (0.8 in) wide; see{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            size for print
          </Link>{" "}
          for larger formats.
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Where it works well</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Influencer mailers and PR seeding kits</li>
        <li>Concert merch, festival wristband cards, and club flyers</li>
        <li>Restaurant table tents showcasing behind-the-scenes content</li>
        <li>Retail endcaps paired with “As seen on TikTok” displays</li>
        <li>College club recruitment posters targeting mobile-first audiences</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          Write the handle next to the code as backup — some users still type
          instead of scan.
        </li>
        <li>
          Caption with action: “Scan to watch on TikTok” or “Follow for drops.”
        </li>
        <li>
          Pin a welcome video or link-in-bio offer so new followers know what
          to expect.
        </li>
        <li>
          High contrast modules on a solid background scan faster than filtered
          photo backgrounds.
        </li>
        <li>
          For video-specific codes on long-lived print, use dynamic QR and
          update when the clip ages out.
        </li>
        <li>
          Align offline creative with what viewers see first on your profile —
          mismatched tone hurts follow-through.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Linking to a draft or friends-only video on public materials</li>
        <li>Using a personal account URL when the brand account is the focus</li>
        <li>Printing in-app QR screenshots that cannot be recolored or resized cleanly</li>
        <li>Codes too small on cosmetics boxes scanned at arm’s length</li>
        <li>Promoting a trending sound video after the trend ends — use dynamic links</li>
        <li>Neon-on-neon design that looks on-brand but fails in dim club lighting</li>
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
