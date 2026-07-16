import Link from "next/link";
import { Logo } from "./Logo";

export function Nav() {
  return (
    <header className="sticky top-0 z-40">
      <nav className="glass mx-auto mt-3 flex w-[min(1100px,94vw)] items-center justify-between rounded-2xl px-4 py-2.5">
        <Link href="/" aria-label="Vyntrix QR home">
          <Logo />
        </Link>
        <div className="flex items-center gap-1 text-sm">
          <Link
            href="/studio"
            className="rounded-lg px-3 py-1.5 text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            Studio
          </Link>
          <Link
            href="/gallery"
            className="rounded-lg px-3 py-1.5 text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            Gallery
          </Link>
          <Link
            href="/guides"
            className="rounded-lg px-3 py-1.5 text-[var(--muted)] transition hover:text-[var(--foreground)]"
          >
            Guides
          </Link>
          <Link
            href="/studio"
            className="btn-primary ml-1 rounded-lg px-3.5 py-1.5 font-medium"
          >
            Create QR
          </Link>
        </div>
      </nav>
    </header>
  );
}
