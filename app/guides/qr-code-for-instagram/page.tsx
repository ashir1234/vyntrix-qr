import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-instagram";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "What URL should I use for an Instagram QR code?",
    a: "For follower growth, use your public profile URL: https://instagram.com/yourusername. For a single post or reel, use the share link from that post (instagram.com/p/… or /reel/…). Both work in a standard URL QR code.",
  },
  {
    q: "Is this the same as an Instagram Nametag?",
    a: "No. Nametags only scan inside the Instagram app. A URL QR works with any phone camera and can be styled with your brand colors or logo in Studio.",
  },
  {
    q: "Can I track how many people scan my Instagram QR?",
    a: "Yes. Create a dynamic QR that redirects to your Instagram link. You will see scan counts, dates, and devices in your dashboard while the printed code stays the same.",
  },
  {
    q: "Will the QR open the Instagram app?",
    a: "On phones with Instagram installed, the profile or post usually opens in the app. Without the app, the link opens in the mobile browser where viewers can still follow or view content.",
  },
  {
    q: "Is a static Instagram QR code free?",
    a: "Yes. Static URL QR codes on Vyntrix QR are free with no watermark. Pro adds dynamic redirect links and scan analytics if you want to measure offline campaigns.",
  },
  {
    q: "Can I link to a private account?",
    a: "The QR will open the profile, but viewers who are not approved followers will see a restricted view. For marketing materials, use a public business or creator account.",
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

export default function InstagramGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Instagram QR", href: `/guides/${slug}` },
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
        An <strong className="text-[var(--foreground)]">Instagram QR code</strong>{" "}
        turns offline attention into profile visits and follows. Retail tags,
        café table tents, event badges, and product inserts can all carry a
        scannable link — no one has to type{" "}
        <span className="font-mono text-sm text-[var(--foreground)]">
          @yourhandle
        </span>{" "}
        from memory. Build one free in{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>
        , style it to match your feed, and export print-ready PNG or SVG.
      </p>

      <GuideCta label="Create an Instagram QR code" />

      <h2 className="mt-10 text-2xl font-semibold">
        How Instagram QR codes work
      </h2>
      <p className="mt-3 text-[var(--muted)]">
        Unlike Instagram&apos;s in-app Nametag, a standard QR encodes a normal
        HTTPS URL. When someone scans with their phone camera, the device opens
        that link — typically your profile or a specific post. Instagram&apos;s
        servers handle the rest: logged-in users land in the app; others see the
        mobile web view and can install the app from there.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        Most marketing use cases point at a{" "}
        <strong className="text-[var(--foreground)]">profile URL</strong> so
        every scan is a chance to follow. Campaign posters sometimes link to one
        reel or carousel instead. You can switch between those strategies with a{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic QR
        </Link>{" "}
        without reprinting physical materials.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">
        Which link to encode
      </h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <strong className="text-[var(--foreground)]">Profile (most common):</strong>{" "}
          <span className="font-mono text-sm text-[var(--foreground)]">
            https://instagram.com/yourusername
          </span>{" "}
          — best for ongoing follower growth
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Single post or reel:</strong>{" "}
          tap Share on the post → Copy link — ideal for launch-day signage
        </li>
        <li>
          <strong className="text-[var(--foreground)]">Avoid:</strong>{" "}
          temporary share dialogs,{" "}
          <span className="font-mono text-sm text-[var(--foreground)]">
            instagram://
          </span>{" "}
          deep links, or links that require login before anything loads
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Steps to create one</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Open Instagram → your profile → Copy the profile URL, or copy a
          post/reel link for a campaign-specific code.
        </li>
        <li>
          Paste the URL into the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          URL field and confirm it opens correctly on your phone.
        </li>
        <li>
          Optional: enable{" "}
          <Link
            href="/guides/dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            Dynamic QR
          </Link>{" "}
          to track scans or change the destination later (e.g. swap from a
          launch reel to your main profile after the campaign).
        </li>
        <li>
          Open <strong className="text-[var(--foreground)]">Design</strong> to
          match brand colors or add a small logo — see{" "}
          <Link
            href="/guides/qr-code-with-logo"
            className="text-[var(--brand-2)] underline"
          >
            QR code with logo
          </Link>{" "}
          for contrast tips.
        </li>
        <li>
          Download PNG for stickers and packaging, or SVG for large posters.
          Size for viewing distance using our{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            print size guide
          </Link>
          .
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">
        Static vs dynamic for Instagram
      </h2>
      <p className="mt-3 text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">Static:</strong> the
        Instagram URL is baked into the code. Free, no watermark, works forever
        as long as the username and post stay public. Perfect for business cards
        and permanent signage.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        <strong className="text-[var(--foreground)]">Dynamic (Pro):</strong> the
        printed QR points at a short redirect link. You can update where it
        goes, A/B test profile vs post links, and see how many people scanned
        from each placement — useful when the same poster runs for months.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Where it works well</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Product hang tags and unboxing inserts (“See it styled on IG”)</li>
        <li>Retail window decals and fitting-room mirrors</li>
        <li>Food trucks, cafés, and restaurant table cards</li>
        <li>Conference badges, booth backdrops, and speaker slides</li>
        <li>Printed lookbooks and mailers for fashion and beauty brands</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          Add a clear call to action: “Follow us on Instagram” or “Scan for
          behind-the-scenes.”
        </li>
        <li>
          Keep the account public and the bio filled out before you print — the
          scan should feel worth it immediately.
        </li>
        <li>
          Use high contrast; gradient-heavy artwork behind the code slows
          cameras down.
        </li>
        <li>
          Pin your best content or add a Link in Bio tool so new followers know
          what to do next.
        </li>
        <li>
          Test scans on both iPhone and Android at the actual print size before
          a large run.
        </li>
        <li>
          If you rebrand or change handles, static codes need reprinting — or
          use dynamic from the start.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Encoding a private account URL on public marketing materials</li>
        <li>Typos in the username — Instagram handles are not forgiving</li>
        <li>Linking to an expired story or deleted post on long-lived print</li>
        <li>Printing too small on narrow packaging (see size guide above)</li>
        <li>Assuming Nametag screenshots work outside the Instagram app</li>
        <li>Low-contrast “aesthetic” codes that look good but scan poorly</li>
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
