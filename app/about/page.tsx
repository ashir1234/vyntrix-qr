import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: `About ${siteConfig.name}`,
  description: `${siteConfig.name} is a free QR code generator with logo branding, 3D preview, and optional dynamic links — built by ${siteConfig.parentCompany.name}.`,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `About ${siteConfig.name}`,
    description: siteConfig.description,
    url: absoluteUrl("/about"),
  },
};

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]),
          ),
        }}
      />
      <Nav />
      <main className="mx-auto w-[min(800px,92vw)] flex-1 py-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          About <span className="gradient-text">{siteConfig.name}</span>
        </h1>
        <p className="mt-4 text-lg text-[var(--muted)] leading-relaxed">
          {siteConfig.name} is a web-based QR code generator at{" "}
          <strong className="text-[var(--foreground)]">{siteConfig.domain}</strong>.
          We help people and small businesses create scannable, branded codes —
          without watermarks on static downloads, and without forcing an account
          for everyday use.
        </p>

        <div className="mt-10 space-y-8 text-[var(--muted)] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              What we build
            </h2>
            <p className="mt-3">
              Most QR tools are either bare-bones (plain black squares) or
              locked behind paid plans for basics like logo, colors, or SVG
              export. We built {siteConfig.name} so you can:
            </p>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                Create unlimited{" "}
                <strong className="text-[var(--foreground)]">static</strong> QR
                codes (URL, WiFi, vCard, email, SMS, phone, text, image,
                location) in the browser
              </li>
              <li>
                Brand codes with logos, colors, gradients, and live 2D/3D
                preview
              </li>
              <li>Download PNG or SVG with no watermark on free static codes</li>
              <li>
                Optionally sign in for{" "}
                <Link
                  href="/guides/dynamic-qr-code"
                  className="text-[var(--brand-2)] underline"
                >
                  dynamic QR codes
                </Link>{" "}
                you can edit after printing, with scan analytics
              </li>
            </ul>
            <p className="mt-3">
              Free accounts include 1 dynamic code with short analytics.{" "}
              <Link href="/pricing" className="text-[var(--brand-2)] underline">
                Pro
              </Link>{" "}
              unlocks unlimited dynamics, full history and CSV export, custom
              short-link slugs, dynamic WiFi landing pages, projects, bulk
              create, print pack, and an ad-free experience.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              Privacy by design
            </h2>
            <p className="mt-3">
              Static QR generation runs in your browser: the content you type for
              a one-off download is not uploaded for that purpose. Dynamic
              destinations, account data, and Pro features are stored so redirects,
              analytics, and cloud sync can work. Details are in our{" "}
              <Link href="/privacy" className="text-[var(--brand-2)] underline">
                Privacy Policy
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              Who we are
            </h2>
            <p className="mt-3">
              {siteConfig.name} is a product of{" "}
              <a
                href={siteConfig.parentCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--brand-2)] underline"
              >
                {siteConfig.parentCompany.name}
              </a>
              , an AI engineering company focused on automation for SMEs, AI
              agents, RAG knowledge systems, custom software, and Generative
              Engine Optimization (GEO). We ship tools we would use ourselves:
              practical, transparent about Free vs Pro, and respectful of user
              data.
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              Learn and create
            </h2>
            <p className="mt-3">
              Prefer step-by-step help? Browse our{" "}
              <Link href="/guides" className="text-[var(--brand-2)] underline">
                QR guides
              </Link>{" "}
              (WiFi, logo branding, print sizes, static vs dynamic, and more) or
              jump straight into the{" "}
              <Link href="/studio" className="text-[var(--brand-2)] underline">
                Studio
              </Link>
              .
            </p>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              Contact
            </h2>
            <p className="mt-3">
              Questions, feedback, or partnership ideas? Email the{" "}
              {siteConfig.parentCompany.name} team at{" "}
              <a
                href={`mailto:${siteConfig.emails.hello}`}
                className="text-[var(--brand-2)] underline"
              >
                {siteConfig.emails.hello}
              </a>{" "}
              or visit the{" "}
              <Link href="/contact" className="text-[var(--brand-2)] underline">
                Contact
              </Link>{" "}
              page. We read every message.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
