import type { Metadata } from "next";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { GalleryClient } from "@/components/gallery/GalleryClient";
import { AdSlot } from "@/components/ads/AdSlot";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "QR Code Design Gallery — Examples & Templates",
  description:
    "Browse beautiful QR code design templates and color styles. Tap any example to open it in the free Vyntrix QR studio and customize it.",
  alternates: { canonical: "/gallery" },
};

export default function GalleryPage() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-[min(1100px,94vw)] flex-1 py-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight">
            QR Code Design <span className="gradient-text">Gallery</span>
          </h1>
          <p className="mx-auto mt-2 max-w-lg text-[var(--muted)]">
            A showcase of preset skins and color styles. Tap a design to load it
            into the studio and make it yours.
          </p>
        </div>

        <GalleryClient />

        <AdSlot slot={siteConfig.adSlots.gallery} className="mt-12" />
      </main>
      <Footer />
    </>
  );
}
