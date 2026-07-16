import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DashboardClient } from "@/components/dashboard/DashboardClient";
import { authEnabled } from "@/lib/authFlags";
import { getUserId } from "@/lib/authServer";
import { getUserPlan, billingConfigured } from "@/lib/billing";
import { getSubscription, listQrCodesByUser } from "@/lib/db";
import { PLAN_LIMITS } from "@/lib/plans";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  if (!authEnabled) {
    return (
      <>
        <Nav />
        <main className="mx-auto w-[min(1000px,94vw)] flex-1 py-16 text-center">
          <h1 className="text-2xl font-bold">Accounts are not enabled</h1>
          <p className="mx-auto mt-2 max-w-md text-sm text-[var(--muted)]">
            This deployment runs Vyntrix QR as a free tool without accounts. Set
            the Clerk keys to enable the dashboard.
          </p>
          <Link
            href="/studio"
            className="btn-primary mt-6 inline-block rounded-xl px-6 py-2.5 text-sm font-semibold"
          >
            Open the studio
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const userId = await getUserId();
  if (!userId) redirect("/sign-in");

  const [plan, sub, codes] = await Promise.all([
    getUserPlan(userId),
    getSubscription(userId),
    listQrCodesByUser(userId),
  ]);

  const limits = PLAN_LIMITS[plan];

  return (
    <>
      <Nav />
      <main className="mx-auto w-[min(1000px,94vw)] flex-1 py-8">
        <DashboardClient
          plan={plan}
          maxDynamicCodes={limits.maxDynamicCodes}
          billingConfigured={billingConfigured}
          subscriptionStatus={sub?.status ?? null}
          renewsAt={sub?.renews_at ?? null}
          endsAt={sub?.ends_at ?? null}
          customerPortalUrl={sub?.customer_portal_url ?? null}
          codes={codes.map((c) => ({
            slug: c.slug,
            title: c.title,
            destination: c.destination,
            editToken: c.edit_token,
            createdAt: c.created_at,
          }))}
        />
      </main>
      <Footer />
    </>
  );
}
