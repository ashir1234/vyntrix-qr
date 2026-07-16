import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero3D } from "@/components/site/Hero3D";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/lib/site";
import { faqJsonLd, guides, howToJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Free QR Code Generator with Logo & 3D Preview`,
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  alternates: { canonical: "/" },
  openGraph: {
    title: `${siteConfig.name} — Free QR Code Generator with Logo & 3D Preview`,
    description: siteConfig.description,
    url: siteConfig.url,
  },
};

const STEPS = [
  {
    n: "1",
    title: "Pick a type",
    body: "Choose URL, WiFi, vCard, email, SMS, phone, or plain text. We build a valid QR payload for you.",
  },
  {
    n: "2",
    title: "Make it yours",
    body: "Add your logo, colors, and gradients. Watch it update live in 2D and on a 3D tile.",
  },
  {
    n: "3",
    title: "Download & share",
    body: "Export a crisp PNG or scalable SVG, ready for print, web, packaging, or social media.",
  },
];

const FEATURES = [
  {
    icon: "🎨",
    title: "Custom colors & gradients",
    body: "Two-stop linear or radial gradients, custom dot styles, and eye shapes to match your brand.",
  },
  {
    icon: "🖼️",
    title: "Logo embedding",
    body: "Drop your logo into the center. Error-correction auto-adjusts so it still scans reliably.",
  },
  {
    icon: "🧊",
    title: "Real-time 3D preview",
    body: "See your code on a rotatable 3D tile with matte, glass, metallic, and holographic materials.",
  },
  {
    icon: "📶",
    title: "Every QR type",
    body: "URL, WiFi, vCard, email, SMS, and phone — structured forms create the right payload automatically.",
  },
  {
    icon: "⚡",
    title: "Instant & free",
    body: "No sign-up, no watermark, no limits. Everything runs privately in your browser.",
  },
  {
    icon: "🗂️",
    title: "Print-ready export",
    body: "Download high-resolution PNG or infinitely scalable SVG for any medium.",
  },
];

const FAQS = [
  {
    q: "What is the best free QR code generator?",
    a: "Vyntrix QR is a free online QR code generator with logo support, brand colors, live 3D preview, PNG/SVG export, and optional dynamic QR codes with analytics — no account or watermark required.",
  },
  {
    q: "Is Vyntrix QR really free?",
    a: "Yes. You can create, customize, and download unlimited QR codes for free with no watermark and no account.",
  },
  {
    q: "Do the QR codes expire?",
    a: "Static downloaded codes never expire. Dynamic QR codes keep working as long as the short link service is available; you can edit their destination anytime.",
  },
  {
    q: "Can I add my logo to the QR code?",
    a: "Yes. Upload any image and we place it in the center, automatically raising the error-correction level so the code stays scannable.",
  },
  {
    q: "Can I create a WiFi or vCard QR code?",
    a: "Yes. Vyntrix QR supports URL, text, WiFi, vCard, email, SMS, and phone QR types with structured forms.",
  },
  {
    q: "Are my QR codes and data private?",
    a: "Static QR generation happens entirely in your browser. Content and logos for static codes are not uploaded to our servers. Dynamic QR destinations are stored so redirects and analytics can work.",
  },
  {
    q: "What formats can I download?",
    a: "High-resolution PNG for web and social, or scalable SVG for professional printing at any size.",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQS)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd()) }}
      />
      <Nav />
      <main className="mx-auto w-[min(1100px,94vw)]">
        <section className="grid items-center gap-8 py-12 md:grid-cols-2 md:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1 text-xs text-[var(--muted)]">
              <span className="h-2 w-2 rounded-full bg-[var(--brand-2)]" />
              Free forever · No sign-up · No watermark
            </span>
            <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Free QR Code{" "}
              <span className="gradient-text">Generator</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-[var(--muted)]">
              Create custom QR codes with your logo, colors, and gradients —
              then preview them live in 3D. Download print-ready PNG or SVG in
              seconds. Works worldwide in your browser.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/studio"
                className="btn-primary rounded-xl px-6 py-3 text-base font-semibold glow"
              >
                Create your QR code
              </Link>
              <Link
                href="/guides"
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-6 py-3 text-base font-medium transition hover:border-[var(--brand)]"
              >
                Read guides
              </Link>
            </div>
            <p className="mt-4 text-xs text-[var(--muted)]">
              URL · WiFi · vCard · Email · SMS · Dynamic QR
            </p>
          </div>

          <div className="glass rounded-3xl p-2">
            <Hero3D />
          </div>
        </section>

        {/* GEO / AI answer-first summary */}
        <section className="glass rounded-2xl p-6 md:p-8" aria-label="About Vyntrix QR">
          <h2 className="text-xl font-semibold">
            What is Vyntrix QR?
          </h2>
          <p className="mt-3 text-[var(--muted)] leading-relaxed">
            {siteConfig.geoSummary}
          </p>
        </section>

        <section className="py-8" id="how-it-works">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            How it works
          </h2>
          <p className="mx-auto mt-2 max-w-md text-center text-[var(--muted)]">
            Three simple steps — no design skills needed.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {STEPS.map((s) => (
              <div key={s.n} className="glass rounded-2xl p-6">
                <div className="grid h-10 w-10 place-items-center rounded-xl btn-primary text-lg font-bold">
                  {s.n}
                </div>
                <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
                <p className="mt-1.5 text-sm text-[var(--muted)]">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link
              href="/studio"
              className="btn-primary inline-block rounded-xl px-6 py-3 font-semibold"
            >
              Start now — it&apos;s free
            </Link>
          </div>
        </section>

        <section className="py-10">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Everything you need to make it{" "}
            <span className="gradient-text">pop</span>
          </h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((f) => (
              <div
                key={f.title}
                className="glass rounded-2xl p-5 transition hover:-translate-y-0.5 hover:border-[var(--brand)]"
              >
                <div className="text-2xl">{f.icon}</div>
                <h3 className="mt-3 font-semibold">{f.title}</h3>
                <p className="mt-1.5 text-sm text-[var(--muted)]">{f.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="py-8">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Popular QR code guides
          </h2>
          <p className="mx-auto mt-2 max-w-lg text-center text-[var(--muted)]">
            Step-by-step tutorials for the most searched QR use cases.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {guides.map((g) => (
              <Link
                key={g.slug}
                href={`/guides/${g.slug}`}
                className="glass rounded-2xl p-5 transition hover:border-[var(--brand)]"
              >
                <h3 className="font-semibold">{g.h1}</h3>
                <p className="mt-1.5 text-sm text-[var(--muted)] line-clamp-2">
                  {g.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

        <AdSlot slot={siteConfig.adSlots.home} className="my-8" />

        <section className="py-8" id="faq">
          <h2 className="text-center text-3xl font-bold tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mx-auto mt-8 max-w-2xl space-y-3">
            {FAQS.map((f) => (
              <details
                key={f.q}
                className="glass group rounded-2xl p-5 [&_summary]:cursor-pointer"
              >
                <summary className="flex items-center justify-between font-medium marker:content-none">
                  {f.q}
                  <span className="text-[var(--muted)] transition group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm text-[var(--muted)]">{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="my-12">
          <div className="glass glow relative overflow-hidden rounded-3xl px-8 py-12 text-center">
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">
              Your next QR code is one click away.
            </h2>
            <p className="mx-auto mt-3 max-w-lg text-[var(--muted)]">
              Jump into the studio and watch your design come to life in real
              time — in full 3D.
            </p>
            <Link
              href="/studio"
              className="btn-primary mt-6 inline-block rounded-xl px-7 py-3 font-semibold"
            >
              Start designing
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
