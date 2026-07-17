import { authEnabled } from "./authFlags";
import { upsertAppUser, type AppUserRow } from "./db";

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

/**
 * Mirror the signed-in Clerk user into our `users` table for record keeping
 * (email, name, last seen). Safe to call on every dashboard/API hit.
 */
export async function syncSignedInUser(): Promise<AppUserRow | null> {
  if (!authEnabled) return null;
  const { currentUser } = await import("@clerk/nextjs/server");
  const user = await currentUser();
  if (!user) return null;

  const email = user.primaryEmailAddress?.emailAddress ?? null;
  const name =
    [user.firstName, user.lastName].filter(Boolean).join(" ").trim() ||
    user.username ||
    null;

  return upsertAppUser({
    id: user.id,
    email,
    name,
    imageUrl: user.imageUrl ?? null,
  });
}
