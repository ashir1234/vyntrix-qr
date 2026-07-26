import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-restaurant-menu";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Is a QR code menu free to make?",
    a: "Yes. Static menu QRs are free with no watermark. For a link you can edit after printing, use a dynamic QR (Free: 1 code; Pro: unlimited) and update the destination anytime.",
  },
  {
    q: "How do I update the menu without reprinting the code?",
    a: "Use a dynamic QR code. It points to a short link you can re-target anytime, so you can change prices or dishes without printing a new code.",
  },
  {
    q: "Should I link to a PDF or a web page?",
    a: "A mobile-friendly web page loads faster and is easier to read on phones. PDFs work but can be slow and require pinch-to-zoom.",
  },
  {
    q: "Do diners need an app?",
    a: "No. The phone camera opens the menu URL in the browser. Keep the page lightweight so it works on slow cellular connections.",
  },
  {
    q: "What size for table tents?",
    a: "At least 2–3 cm square for close table scanning. Larger for wall menus or windows. See our print size guide.",
  },
  {
    q: "Can I track how many people open the menu?",
    a: "Yes with a dynamic QR — scan analytics show interest. They do not tell you which dish someone ordered.",
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

export default function RestaurantMenuGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "QR menu", href: `/guides/${slug}` },
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
        A <strong className="text-[var(--foreground)]">QR code menu</strong> lets
        diners view your menu on their own phone — no app, no shared paper. Link
        it to a web page or PDF and update it anytime with a{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic QR code
        </Link>
        .
      </p>

      <GuideCta label="Create a menu QR code" />

      <h2 className="mt-10 text-2xl font-semibold">Why restaurants use menu QRs</h2>
      <p className="mt-3 text-[var(--muted)]">
        Prices and seasonal dishes change faster than printed booklets. A QR on
        the table points at a page you control. Dynamic codes mean you reprint
        table tents once and keep editing the destination — useful for lunch vs
        dinner menus, allergen updates, and sold-out items.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Steps</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Host a mobile-friendly menu page (preferred) or a PDF. Test on a phone
          over cellular, not only venue WiFi.
        </li>
        <li>
          Open the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          and paste the menu URL.
        </li>
        <li>
          Turn on <strong className="text-[var(--foreground)]">Dynamic QR</strong>{" "}
          so you can update the menu later without reprinting.
        </li>
        <li>Add your brand colors or logo in the Design panel.</li>
        <li>
          Download PNG for table tents or SVG for large signage. Follow{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            print sizing
          </Link>
          .
        </li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Web page vs PDF</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <strong className="text-[var(--foreground)]">Web page:</strong> faster,
          zoom-friendly, easy to update sections.
        </li>
        <li>
          <strong className="text-[var(--foreground)]">PDF:</strong> fine for
          designer layouts, but heavy files frustrate guests on slow networks.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Caption the code: “Scan for today’s menu.”</li>
        <li>Print at least 2×2 cm for table use; larger for windows.</li>
        <li>Laminate table codes so they survive spills and cleaning.</li>
        <li>Keep high contrast — dark code on light pad, not on food photos.</li>
        <li>Offer paper menus as a backup for guests who prefer them.</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Static codes on long-lived table tents when prices change weekly</li>
        <li>Multi-megabyte PDF menus that time out on cellular</li>
        <li>Tiny codes next to salt shakers with no caption</li>
        <li>Forgetting to update allergen info on the linked page</li>
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
