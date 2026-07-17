import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero3D } from "@/components/site/Hero3D";
import { PlanAwareAd } from "@/components/ads/PlanAwareAd";
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
    body: "Choose URL, WiFi, vCard, email, SMS, phone, image, location, or plain text. We build a valid QR payload for you.",
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
    body: "URL, WiFi, vCard, email, SMS, phone, image, and location — structured forms create the right payload automatically.",
  },
  {
    icon: "⚡",
    title: "Free static codes",
    body: "Unlimited static QR downloads with no watermark. Sign in for dynamic links; Pro unlocks unlimited dynamics and advanced tools.",
  },
  {
    icon: "🗂️",
    title: "Print-ready export",
    body: "Download high-resolution PNG or infinitely scalable SVG for any medium. Pro adds 4K PNG and print PDF.",
  },
];

const FAQS = [
  {
    q: "What is the best free QR code generator?",
    a: "Vyntrix QR is a free online QR code generator with logo support, brand colors, live 3D preview, and PNG/SVG export. Dynamic QR codes need a free account (1 code). Pro adds unlimited dynamics, full analytics, WiFi landing pages, projects, bulk create, and print pack.",
  },
  {
    q: "Is Vyntrix QR really free?",
    a: "Yes for static QR codes — create, customize, and download unlimited codes with no watermark. Dynamic QR codes require signing in (Free: 1 dynamic code). Pro is $12/month for unlimited dynamic codes and advanced features.",
  },
  {
    q: "Do the QR codes expire?",
    a: "Static downloaded codes never expire. Dynamic QR codes keep working as long as the short link service is available; you can edit their destination anytime from your account.",
  },
  {
    q: "Can I add my logo to the QR code?",
    a: "Yes. Upload any image and we place it in the center, automatically raising the error-correction level so the code stays scannable.",
  },
  {
    q: "Can I create a WiFi or vCard QR code?",
    a: "Yes. Static WiFi and vCard QRs are free. Pro adds dynamic WiFi landing pages so you can track how many people open the WiFi details page (not whether they joined the network).",
  },
  {
    q: "What is included in Pro?",
    a: "Unlimited dynamic QR codes, full scan history and CSV export, custom short-link slugs, dynamic WiFi pages, cloud Studio sync across devices, project folders, bulk create from CSV, print pack (4K PNG + PDF), and no ads.",
  },
  {
    q: "Are my QR codes and data private?",
    a: "Static QR generation happens in your browser; content and logos for static codes are not uploaded. Dynamic destinations, designs, and account data are stored so redirects, analytics, projects, and Pro features can work.",
  },
  {
    q: "What formats can I download?",
    a: "High-resolution PNG for web and social, or scalable SVG for printing. Pro adds 4K PNG and an A4 print PDF.",
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
              Free static codes · Optional Pro for dynamics
            </span>
            <h1 className="mt-4 text-5xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Free QR Code{" "}
              <span className="gradient-text">Generator</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-[var(--muted)]">
              Create custom QR codes with your logo, colors, and gradients —
              then preview them live in 3D. Download print-ready PNG or SVG.
              Sign in for dynamic links; upgrade to Pro for unlimited dynamics,
              analytics, and more.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/studio"
                className="btn-primary rounded-xl px-6 py-3 text-base font-semibold glow"
              >
                Create your QR code
              </Link>
              <Link
                href="/pricing"
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-6 py-3 text-base font-medium transition hover:border-[var(--brand)]"
              >
                See Free vs Pro
              </Link>
            </div>
            <p className="mt-4 text-xs text-[var(--muted)]">
              URL · WiFi · vCard · Dynamic QR · Pro analytics
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

        <PlanAwareAd slot={siteConfig.adSlots.home} className="my-8" />

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
