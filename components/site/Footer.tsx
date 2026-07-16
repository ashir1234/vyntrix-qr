import Link from "next/link";
import { LogoMark } from "./Logo";
import { siteConfig } from "@/lib/site";
import { guides } from "@/lib/seo";

// A curated subset of guides for the footer (the full list lives at /guides).
const footerGuides = guides.slice(0, 6);

export function Footer() {
  return (
    <footer className="mx-auto mt-16 w-[min(1100px,94vw)] border-t border-[var(--border)] py-10 text-sm text-[var(--muted)]">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <LogoMark size={28} />
            <span className="font-semibold text-[var(--foreground)]">
              Vyntrix<span className="gradient-text"> QR</span>
            </span>
          </div>
          <p className="mt-3 max-w-xs">
            Free online QR code generator with logo, colors, 3D preview, and
            optional dynamic links — available worldwide.
          </p>
          <p className="mt-3 text-xs">
            A product by{" "}
            <a
              href={siteConfig.parentCompany.url}
              target="_blank"
              rel="noopener"
              className="text-[var(--brand-2)] transition hover:text-[var(--foreground)]"
            >
              {siteConfig.parentCompany.name}
            </a>{" "}
            — AI automation, agents &amp; custom software.
          </p>
        </div>
        <div>
          <p className="mb-3 font-medium text-[var(--foreground)]">Product</p>
          <ul className="space-y-2">
            <li>
              <Link href="/studio" className="transition hover:text-[var(--foreground)]">
                QR Studio
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="transition hover:text-[var(--foreground)]">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/guides" className="transition hover:text-[var(--foreground)]">
                Guides
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="transition hover:text-[var(--foreground)]">
                Pricing
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-medium text-[var(--foreground)]">Guides</p>
          <ul className="space-y-2">
            {footerGuides.map((g) => (
              <li key={g.slug}>
                <Link
                  href={`/guides/${g.slug}`}
                  className="transition hover:text-[var(--foreground)]"
                >
                  {g.short}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/guides"
                className="text-[var(--brand-2)] transition hover:text-[var(--foreground)]"
              >
                All guides →
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-medium text-[var(--foreground)]">Legal</p>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy" className="transition hover:text-[var(--foreground)]">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition hover:text-[var(--foreground)]">
                Terms of Use
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center justify-between gap-2 border-t border-[var(--border)] pt-6 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
        </p>
        <p className="opacity-70">Runs client-side. Your data stays private.</p>
      </div>
    </footer>
  );
}
