/**
 * Whether Clerk auth is configured. When the publishable key is absent (e.g.
 * local dev before keys are added, or a fork that doesn't need accounts) the
 * whole app must still build and run — auth-gated features simply go inert.
 *
 * NEXT_PUBLIC_ vars are inlined at build time, so this is safe on both the
 * server and the client.
 */
export const authEnabled = Boolean(
  process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
);
