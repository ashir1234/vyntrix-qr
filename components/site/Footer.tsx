import Link from "next/link";
import { LogoMark } from "./Logo";
import { siteConfig } from "@/lib/site";

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
        </div>
        <div>
          <p className="mb-3 font-medium text-[var(--foreground)]">Product</p>
          <ul className="space-y-2">
            <li>
              <Link href="/studio" className="transition hover:text-white">
                QR Studio
              </Link>
            </li>
            <li>
              <Link href="/gallery" className="transition hover:text-white">
                Gallery
              </Link>
            </li>
            <li>
              <Link href="/guides" className="transition hover:text-white">
                Guides
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-medium text-[var(--foreground)]">Guides</p>
          <ul className="space-y-2">
            <li>
              <Link
                href="/guides/wifi-qr-code"
                className="transition hover:text-white"
              >
                WiFi QR code
              </Link>
            </li>
            <li>
              <Link
                href="/guides/qr-code-with-logo"
                className="transition hover:text-white"
              >
                QR with logo
              </Link>
            </li>
            <li>
              <Link
                href="/guides/dynamic-qr-code"
                className="transition hover:text-white"
              >
                Dynamic QR
              </Link>
            </li>
            <li>
              <Link
                href="/guides/vcard-qr-code"
                className="transition hover:text-white"
              >
                vCard QR
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-3 font-medium text-[var(--foreground)]">Legal</p>
          <ul className="space-y-2">
            <li>
              <Link href="/privacy" className="transition hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link href="/terms" className="transition hover:text-white">
                Terms of Use
              </Link>
            </li>
            <li>
              <a
                href="/llms.txt"
                className="transition hover:text-white"
              >
                llms.txt
              </a>
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
