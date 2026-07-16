import type { Metadata } from "next";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles your data. QR codes are generated in your browser and are not uploaded to our servers.`,
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-[min(800px,92vw)] flex-1 py-10">
        <h1 className="text-3xl font-bold tracking-tight">Privacy Policy</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Last updated: {new Date().getFullYear()}
        </p>

        <div className="mt-8 space-y-6 text-[var(--muted)] leading-relaxed">
          <section>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Overview
            </h2>
            <p className="mt-2">
              {siteConfig.name} is a free QR code generator. Your privacy matters
              to us. The QR codes you create are generated entirely inside your
              own browser — the content you type (URLs, WiFi passwords, contact
              details, etc.) is <strong>not sent to or stored on our servers</strong>.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Information we process
            </h2>
            <p className="mt-2">
              We do not require an account. We may collect anonymous, aggregated
              usage analytics (such as page views and device type) to improve the
              product. Any logos or images you upload are processed locally in
              your browser and are not transmitted to us.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Advertising & cookies
            </h2>
            <p className="mt-2">
              We use Google AdSense to display ads. Third-party vendors,
              including Google, use cookies to serve ads based on your prior
              visits to this and other websites. Google&apos;s use of advertising
              cookies enables it and its partners to serve ads based on your
              visit to our site and/or other sites on the Internet.
            </p>
            <p className="mt-2">
              You may opt out of personalized advertising by visiting{" "}
              <a
                className="text-[var(--brand-2)] underline"
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google Ads Settings
              </a>
              . For more information about how Google uses data, see{" "}
              <a
                className="text-[var(--brand-2)] underline"
                href="https://policies.google.com/technologies/partner-sites"
                target="_blank"
                rel="noopener noreferrer"
              >
                Google&apos;s Privacy &amp; Terms
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Your choices
            </h2>
            <p className="mt-2">
              You can disable cookies in your browser settings and use browser
              extensions to control tracking. Because generation happens locally,
              you can also use the core generator with JavaScript-only features
              and no account.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Contact
            </h2>
            <p className="mt-2">
              Questions about this policy? Reach us at{" "}
              <span className="text-[var(--foreground)]">
                privacy@{siteConfig.domain}
              </span>
              .
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
