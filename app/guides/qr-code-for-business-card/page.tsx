import type { Metadata } from "next";
import Link from "next/link";
import { GuideCta, GuideLayout } from "@/components/guides/GuideLayout";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getGuide,
} from "@/lib/seo";

const slug = "qr-code-for-business-card";
const guide = getGuide(slug)!;

const FAQS = [
  {
    q: "Should I use a vCard or a link on my business card?",
    a: "A vCard QR saves your contact instantly offline — ideal when you want a one-tap “Add to Contacts” experience. A URL QR (especially dynamic) lets you update your landing page, track scans, and send people to a portfolio or booking page. Many professionals use a dynamic link for flexibility.",
  },
  {
    q: "How small can the QR code be on a card?",
    a: "Aim for at least 2 × 2 cm (0.8 inch) on a standard 85 × 55 mm card. Smaller codes fail more often, especially with logos or colored backgrounds. See the print size guide for card-specific sizing.",
  },
  {
    q: "What file format should I send to my printer?",
    a: "SVG is best for crisp vector output at any card size. High-resolution PNG (300 DPI at final print dimensions) also works. Avoid low-res JPG exports that blur the modules.",
  },
  {
    q: "Will a logo inside the QR still scan on a card?",
    a: "Usually yes if the logo is modest, contrast stays high, and you test before a print run. Read the logo QR guide for safe placement rules.",
  },
  {
    q: "Should the business card QR be static or dynamic?",
    a: "Static works if your phone number and role are stable for years. Dynamic is better when you might change jobs, update a portfolio, or want scan counts from networking events.",
  },
  {
    q: "Can I put the QR on the back of the card?",
    a: "Yes — many designers place contact details on the front and a scannable code on the back with a short label like “Scan to save contact.” Just keep the back uncluttered and high-contrast.",
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

export default function BusinessCardGuidePage() {
  return (
    <GuideLayout
      breadcrumbs={[
        { name: "Home", href: "/" },
        { name: "Guides", href: "/guides" },
        { name: "Business card QR", href: `/guides/${slug}` },
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
        Adding a{" "}
        <strong className="text-[var(--foreground)]">
          QR code to your business card
        </strong>{" "}
        turns a handshake into a saved contact, a portfolio view, or a booked
        meeting — without anyone typing your URL or phone number. Freelancers,
        sales reps, agents, and founders use them at conferences, client dinners,
        and everyday networking. Create a print-ready code in{" "}
        <Link href="/studio" className="text-[var(--brand-2)] underline">
          Vyntrix QR Studio
        </Link>
        .
      </p>

      <GuideCta label="Create a business card QR code" />

      <h2 className="mt-10 text-2xl font-semibold">
        vCard QR vs link QR — which to pick
      </h2>
      <p className="mt-3 text-[var(--muted)]">
        A{" "}
        <Link
          href="/guides/vcard-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          vCard QR
        </Link>{" "}
        embeds your name, phone, email, and company directly in the code. When
        someone scans it, their phone offers to save you as a contact — no
        website visit, no login. That is the fastest “Add to Contacts” path and
        works well when your details rarely change.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        A URL QR opens a webpage: your site, a{" "}
        <Link
          href="/guides/qr-code-for-linkedin"
          className="text-[var(--brand-2)] underline"
        >
          LinkedIn profile
        </Link>
        , or a personal landing page with links to calendar, portfolio, and
        socials. Pair it with a{" "}
        <Link
          href="/guides/dynamic-qr-code"
          className="text-[var(--brand-2)] underline"
        >
          dynamic QR
        </Link>{" "}
        and you can change the destination after cards are printed — useful if
        you switch roles or want scan analytics from each event.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">When to use one</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Trade shows and networking events where speed matters</li>
        <li>Creative portfolios where a card alone cannot show your work</li>
        <li>Real estate and insurance cards that link to listings or booking</li>
        <li>International contacts who prefer scanning over dialing unfamiliar numbers</li>
        <li>Teams that want consistent branding plus a trackable team page</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Steps to create one</h2>
      <ol className="mt-4 list-decimal space-y-3 pl-5 text-[var(--muted)]">
        <li>
          Decide:{" "}
          <Link
            href="/guides/vcard-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            vCard
          </Link>{" "}
          (offline contact save) or URL (updatable landing page).
        </li>
        <li>
          Open the{" "}
          <Link href="/studio" className="text-[var(--brand-2)] underline">
            Studio
          </Link>{" "}
          and enter your contact fields or paste your link.
        </li>
        <li>
          Optional: enable dynamic mode if you want to edit the link or count
          scans later.
        </li>
        <li>
          In Design, match brand colors. Keep dark modules on a light background
          — see{" "}
          <Link
            href="/guides/qr-code-with-logo"
            className="text-[var(--brand-2)] underline"
          >
            logo QR tips
          </Link>{" "}
          if you add a mark.
        </li>
        <li>
          Download SVG for your printer (or PNG at 300 DPI). Size at least 2 × 2
          cm —{" "}
          <Link
            href="/guides/qr-code-size-for-print"
            className="text-[var(--brand-2)] underline"
          >
            QR code size for print
          </Link>
          .
        </li>
        <li>Test-scan on iPhone and Android before ordering a batch.</li>
      </ol>

      <h2 className="mt-10 text-2xl font-semibold">Design and placement tips</h2>
      <p className="mt-3 text-[var(--muted)]">
        Standard cards are small. Give the QR a dedicated corner or the full
        back — do not squeeze it between two paragraphs of 8 pt text. Add a
        one-line label (“Scan to connect”) so people know what happens. Matte
        finishes scan better than high-gloss lamination that catches light.
      </p>
      <p className="mt-3 text-[var(--muted)]">
        If your card is mostly dark, invert carefully: light modules on dark
        background can work but need extra testing. When in doubt, stick to
        classic black on white for the code area only, even if the rest of the
        card is branded.
      </p>

      <h2 className="mt-10 text-2xl font-semibold">Best practices</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Keep the code at least 2 × 2 cm with a clear quiet zone (empty margin).</li>
        <li>Test on iPhone and Android before printing 500 cards.</li>
        <li>Use a dynamic link if your role, number, or portfolio URL may change.</li>
        <li>Still print your email and phone as text — not everyone scans.</li>
        <li>Prefer SVG from Studio so the printer scales without pixelation.</li>
        <li>
          Compare{" "}
          <Link
            href="/guides/static-vs-dynamic-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            static vs dynamic
          </Link>{" "}
          before you commit to a large print run.
        </li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Common mistakes</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>Codes smaller than 1.5 cm that fail on slightly older phones</li>
        <li>Low-contrast brand colors (navy on black, yellow on white)</li>
        <li>Static vCard with a personal number you plan to retire</li>
        <li>Linking to a homepage with no clear next step for new contacts</li>
        <li>Heavy logo overlay that breaks scan reliability</li>
        <li>Forgetting to update a dynamic destination after a job change</li>
      </ul>

      <h2 className="mt-10 text-2xl font-semibold">Related guides</h2>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-[var(--muted)]">
        <li>
          <Link
            href="/guides/vcard-qr-code"
            className="text-[var(--brand-2)] underline"
          >
            vCard QR code
          </Link>{" "}
          — one-tap contact save
        </li>
        <li>
          <Link
            href="/guides/qr-code-for-linkedin"
            className="text-[var(--brand-2)] underline"
          >
            LinkedIn QR code
          </Link>{" "}
          — profile on a card back
        </li>
        <li>
          <Link
            href="/guides/qr-code-for-email-signature"
            className="text-[var(--brand-2)] underline"
          >
            Email signature QR
          </Link>{" "}
          — match card and inbox branding
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
