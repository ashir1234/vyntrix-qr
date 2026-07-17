import type { Metadata } from "next";
import { Suspense } from "react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Studio } from "@/components/studio/Studio";
import { StudioLoadFromQuery } from "@/components/studio/StudioLoadFromQuery";
import { PlanAwareAd } from "@/components/ads/PlanAwareAd";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "QR Code Studio — Create & Customize",
  description:
    "Design your QR code in real time. Add a logo, colors, and gradients, preview it in 3D, and download PNG or SVG. Free for static codes; sign in for dynamic QR; Pro for unlimited dynamics and print pack.",
  alternates: { canonical: "/studio" },
};

export default function StudioPage() {
  return (
    <>
      <Nav />
      <main className="flex-1">
        <div className="mx-auto w-[min(1200px,95vw)] pt-6">
          <h1 className="text-2xl font-bold tracking-tight">
            QR Code <span className="gradient-text">Studio</span>
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Pick a type on the left, style it, and watch it render live in 3D.
          </p>
        </div>
        <Suspense fallback={null}>
          <StudioLoadFromQuery />
        </Suspense>
        <Studio />
        <div className="mx-auto w-[min(1200px,95vw)]">
          <PlanAwareAd slot={siteConfig.adSlots.studio} className="mb-8" />
        </div>
      </main>
      <Footer />
    </>
  );
}
