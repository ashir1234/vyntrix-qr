import type { Metadata } from "next";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `How ${siteConfig.name} handles your data. Static QR codes are generated in your browser; accounts and dynamic QR data are stored to power redirects, analytics, and Pro features.`,
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
              {siteConfig.name} offers free static QR generation and optional
              signed-in features (dynamic QR codes and Pro plans). Your privacy
              matters to us.{" "}
              <strong className="text-[var(--foreground)]">
                Static QR codes
              </strong>{" "}
              (content you type for a one-off download) are generated in your
              browser and are not uploaded for that purpose.{" "}
              <strong className="text-[var(--foreground)]">
                Dynamic QR codes, accounts, projects, and Pro features
              </strong>{" "}
              store necessary data on our servers so short links, redirects,
              analytics, and cloud sync can work.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Information we process
            </h2>
            <p className="mt-2">
              If you create an account (via our auth provider), we store your
              user id, email, and related profile fields for account and billing
              records. For dynamic QR codes we store destinations, optional
              titles, design snapshots, WiFi landing credentials (when you use
              that feature), scan analytics, and project membership. We may also
              collect anonymous, aggregated usage analytics (such as page views)
              to improve the product. Logos for static-only generation stay in
              your browser unless you save them with a dynamic design or cloud
              sync.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-semibold text-[var(--foreground)]">
              Advertising & cookies
            </h2>
            <p className="mt-2">
              Free-plan visitors may see Google AdSense ads. Third-party vendors,
              including Google, use cookies to serve ads based on your prior
              visits to this and other websites. Pro subscribers get an ad-free
              experience when their plan is active.
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
              You can disable cookies in your browser settings. You can use the
              studio for static QR codes without signing in. Creating or managing
              dynamic QR codes requires an account. You can cancel Pro anytime
              through the billing portal linked from your dashboard.
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
