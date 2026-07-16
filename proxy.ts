import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js 16 renamed the middleware file to `proxy.ts`. Clerk auth runs here.
 *
 * When Clerk isn't configured, we fall back to a pass-through so the site still
 * works. `/dashboard` is protected; everything else is public.
 */
const authEnabled = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);

const passthrough = () => NextResponse.next();

async function withClerk(req: NextRequest) {
  const { clerkMiddleware } = await import("@clerk/nextjs/server");
  const handler = clerkMiddleware(async (auth, request) => {
    if (request.nextUrl.pathname.startsWith("/dashboard")) {
      await auth.protect();
    }
  });
  // clerkMiddleware's handler signature matches (req, event); event is optional
  // for our usage.
  return handler(req, {} as never);
}

export default function proxy(req: NextRequest) {
  return authEnabled ? withClerk(req) : passthrough();
}

export const config = {
  matcher: [
    // Skip Next internals and static files unless found in search params.
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes.
    "/(api|trpc)(.*)",
    // Clerk frontend API auto-proxy path (Next.js 16+).
    "/__clerk/:path*",
  ],
};
