import { authEnabled } from "./authFlags";

/**
 * Server-side current user id, or null when signed out / auth disabled.
 *
 * Clerk's `auth()` throws without a configured provider, so we dynamically
 * import it only when auth is enabled. This keeps API routes and server
 * components working in a no-Clerk deployment.
 */
export async function getUserId(): Promise<string | null> {
  if (!authEnabled) return null;
  const { auth } = await import("@clerk/nextjs/server");
  const { userId } = await auth();
  return userId ?? null;
}

/** Current user's primary email, or null. Used to prefill checkout. */
export async function getUserEmail(): Promise<string | null> {
  if (!authEnabled) return null;
  const { currentUser } = await import("@clerk/nextjs/server");
  const user = await currentUser();
  return user?.primaryEmailAddress?.emailAddress ?? null;
}
