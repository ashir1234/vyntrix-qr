"use client";

import Link from "next/link";
import { SignInButton, UserButton, useAuth } from "@clerk/nextjs";

/**
 * Auth-aware nav pieces. These call Clerk hooks, so they must only be rendered
 * when Clerk is configured (the parent guards on `authEnabled`).
 */

const linkCls =
  "rounded-lg px-3 py-1.5 text-[var(--muted)] transition hover:text-[var(--foreground)]";

export function NavAuthDesktop() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return null;
  return isSignedIn ? (
    <Link href="/dashboard" className={linkCls}>
      Dashboard
    </Link>
  ) : (
    <SignInButton mode="modal">
      <button className={linkCls}>Sign in</button>
    </SignInButton>
  );
}

export function NavUserButton() {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded || !isSignedIn) return null;
  return <UserButton appearance={{ elements: { avatarBox: "h-8 w-8" } }} />;
}

export function NavAuthMobileLink({ onNavigate }: { onNavigate: () => void }) {
  const { isLoaded, isSignedIn } = useAuth();
  if (!isLoaded) return null;
  const cls =
    "rounded-lg px-3 py-2.5 text-[var(--muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--foreground)]";
  return isSignedIn ? (
    <Link href="/dashboard" className={cls} onClick={onNavigate}>
      Dashboard
    </Link>
  ) : (
    <Link href="/sign-in" className={cls} onClick={onNavigate}>
      Sign in
    </Link>
  );
}
