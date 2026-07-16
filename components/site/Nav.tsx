"use client";

import Link from "next/link";
import { useEffect, useId, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { authEnabled } from "@/lib/authFlags";
import {
  NavAuthDesktop,
  NavAuthMobileLink,
  NavUserButton,
} from "./NavAuth";

const LINKS = [
  { href: "/studio", label: "Studio" },
  { href: "/gallery", label: "Gallery" },
  { href: "/guides", label: "Guides" },
  { href: "/pricing", label: "Pricing" },
] as const;

export function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="sticky top-0 z-40">
      <nav className="glass relative z-40 mx-auto mt-3 w-[min(1100px,94vw)] rounded-2xl px-3 py-2 sm:px-4 sm:py-2.5">
        <div className="flex items-center justify-between gap-2">
          <Link
            href="/"
            aria-label="Vyntrix QR home"
            className="min-w-0 shrink"
            onClick={() => setOpen(false)}
          >
            <Logo size={28} />
          </Link>

          {/* Desktop links */}
          <div className="hidden items-center gap-1 text-sm md:flex">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-1.5 text-[var(--muted)] transition hover:text-[var(--foreground)]"
              >
                {link.label}
              </Link>
            ))}
            {authEnabled && <NavAuthDesktop />}
            <Link
              href="/studio"
              className="btn-primary ml-1 rounded-lg px-3.5 py-1.5 font-medium"
            >
              Create QR
            </Link>
            {authEnabled && (
              <div className="ml-1.5 flex items-center">
                <NavUserButton />
              </div>
            )}
          </div>

          {/* Mobile actions */}
          <div className="flex items-center gap-1.5 md:hidden">
            {authEnabled && <NavUserButton />}
            <Link
              href="/studio"
              className="btn-primary rounded-lg px-2.5 py-1.5 text-sm font-medium"
              onClick={() => setOpen(false)}
            >
              Create
            </Link>
            <button
              type="button"
              className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-2)] text-[var(--foreground)] transition hover:border-[var(--brand)]"
              aria-expanded={open}
              aria-controls={panelId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((v) => !v)}
            >
              <span className="sr-only">{open ? "Close" : "Menu"}</span>
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                aria-hidden="true"
              >
                {open ? (
                  <>
                    <path d="M6 6l12 12" />
                    <path d="M18 6L6 18" />
                  </>
                ) : (
                  <>
                    <path d="M4 7h16" />
                    <path d="M4 12h16" />
                    <path d="M4 17h16" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile panel */}
        <div
          id={panelId}
          hidden={!open}
          className="mt-2 border-t border-[var(--border)] pt-2 md:hidden"
        >
          <div className="flex flex-col gap-0.5 pb-1 text-sm">
            {LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-[var(--muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {authEnabled && (
              <NavAuthMobileLink onNavigate={() => setOpen(false)} />
            )}
          </div>
        </div>
      </nav>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}
    </header>
  );
}
