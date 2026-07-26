import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { siteConfig } from "@/lib/site";
import { absoluteUrl, breadcrumbJsonLd } from "@/lib/seo";

export const metadata: Metadata = {
  title: `Contact ${siteConfig.name}`,
  description: `Get in touch with the ${siteConfig.name} team for product support, privacy questions, or general inquiries.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact ${siteConfig.name}`,
    description: `Email ${siteConfig.emails.hello} for help with QR codes, billing, or privacy.`,
    url: absoluteUrl("/contact"),
  },
};

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "ContactPage",
              name: `Contact ${siteConfig.name}`,
              url: absoluteUrl("/contact"),
              about: {
                "@type": "Organization",
                name: siteConfig.name,
                url: siteConfig.url,
                email: siteConfig.emails.hello,
                parentOrganization: {
                  "@type": "Organization",
                  name: siteConfig.parentCompany.name,
                  url: siteConfig.parentCompany.url,
                },
              },
            },
          ]),
        }}
      />
      <Nav />
      <main className="mx-auto w-[min(800px,92vw)] flex-1 py-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          Contact us
        </h1>
        <p className="mt-4 text-lg text-[var(--muted)] leading-relaxed">
          {siteConfig.name} is a product of{" "}
          <a
            href={siteConfig.parentCompany.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--brand-2)] underline"
          >
            {siteConfig.parentCompany.name}
          </a>
          . Email us at the address below — typically within 1–2 business days.
        </p>

        <div className="glass mt-10 rounded-2xl p-5">
          <h2 className="text-lg font-semibold text-[var(--foreground)]">
            Email
          </h2>
          <p className="mt-1.5 text-sm text-[var(--muted)]">
            Product questions, support, billing, privacy, partnerships, and
            feedback — one inbox for everything.
          </p>
          <a
            href={`mailto:${siteConfig.emails.hello}`}
            className="mt-3 inline-block text-[var(--brand-2)] underline"
          >
            {siteConfig.emails.hello}
          </a>
        </div>

        <div className="mt-10 space-y-4 text-[var(--muted)] leading-relaxed">
          <section>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              Before you write
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5">
              <li>
                How-to questions are often answered in our{" "}
                <Link href="/guides" className="text-[var(--brand-2)] underline">
                  guides
                </Link>
                .
              </li>
              <li>
                Plan limits and pricing are on{" "}
                <Link
                  href="/pricing"
                  className="text-[var(--brand-2)] underline"
                >
                  Pricing
                </Link>
                .
              </li>
              <li>
                Learn who builds the product on{" "}
                <Link href="/about" className="text-[var(--brand-2)] underline">
                  About
                </Link>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-semibold text-[var(--foreground)]">
              Company
            </h2>
            <p className="mt-3">
              {siteConfig.name} is operated by{" "}
              <a
                href={siteConfig.parentCompany.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[var(--brand-2)] underline"
              >
                {siteConfig.parentCompany.name}
              </a>
              . Website:{" "}
              <a
                href={siteConfig.url}
                className="text-[var(--brand-2)] underline"
              >
                {siteConfig.domain}
              </a>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
