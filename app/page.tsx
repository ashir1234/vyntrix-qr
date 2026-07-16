import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Hero3D } from "@/components/site/Hero3D";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Free 3D QR Code Generator with Logo`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
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
    q: "Is Vyntrix QR really free?",
    a: "Yes. You can create, customize, and download unlimited QR codes for free with no watermark and no account.",
  },
  {
    q: "Do the QR codes expire?",
    a: "No. The codes you download are static and never expire. They will keep working as long as the destination (for example, your website) is live.",
  },
  {
    q: "Can I add my logo to the QR code?",
    a: "Absolutely. Upload any image and we place it in the center, automatically raising the error-correction level so the code stays scannable.",
  },
  {
    q: "Are my QR codes and data private?",
    a: "Yes. QR generation happens entirely in your browser. The content you enter and logos you upload are never sent to our servers.",
  },
  {
    q: "What formats can I download?",
    a: "You can export high-resolution PNG for web and social, or scalable SVG for professional printing at any size.",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
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
              Free 3D QR Code{" "}
              <span className="gradient-text">Generator</span>
            </h1>
            <p className="mt-5 max-w-md text-lg text-[var(--muted)]">
              Create custom QR codes with your logo, colors, and gradients — then
              preview them live on a stunning 3D tile. Download print-ready PNG or
              SVG in seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/studio"
                className="btn-primary rounded-xl px-6 py-3 text-base font-semibold glow"
              >
                Create your QR code
              </Link>
              <Link
                href="/gallery"
                className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-6 py-3 text-base font-medium transition hover:border-[var(--brand)]"
              >
                See examples
              </Link>
            </div>
            <p className="mt-4 text-xs text-[var(--muted)]">
              Works right in your browser — nothing to install.
            </p>
          </div>

          <div className="glass rounded-3xl p-2">
            <Hero3D />
          </div>
        </section>

        {/* How it works — reduces confusion for first-time visitors */}
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

        <AdSlot slot={siteConfig.adSlots.home} className="my-8" />

        {/* FAQ — great for SEO (rich results) and ad-friendly content */}
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
