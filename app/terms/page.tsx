import type { Metadata } from "next";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: `The terms and conditions for using ${siteConfig.name}.`,
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-[min(800px,92vw)] flex-1 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Terms of Use</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Last updated: {new Date().getFullYear()}
        </p>

        <div className="mt-8 space-y-6 text-[var(--muted)] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Acceptance of terms
            </h2>
            <p className="mt-2">
              By using {siteConfig.name}, you agree to these Terms of Use. If you
              do not agree, please do not use the service.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Use of the service
            </h2>
            <p className="mt-2">
              {siteConfig.name} offers free static QR generation and optional
              paid Pro features for dynamic QR codes and related tools. You are
              responsible for the content you encode and for ensuring you have
              the rights to any logos or images you use. You agree not to use
              the service for unlawful, deceptive, or malicious purposes,
              including encoding links to malware or phishing sites.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Intellectual property
            </h2>
            <p className="mt-2">
              QR codes you generate belong to you. The {siteConfig.name} name,
              logo, and website design remain our property.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Disclaimer & liability
            </h2>
            <p className="mt-2">
              The service is provided &quot;as is&quot; without warranties of any
              kind. We are not liable for any damages arising from the use or
              inability to use the service, including any issues with generated
              QR codes.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Changes
            </h2>
            <p className="mt-2">
              We may update these terms from time to time. Continued use of the
              service after changes constitutes acceptance of the revised terms.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
