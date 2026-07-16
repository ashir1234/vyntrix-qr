"use client";

import dynamic from "next/dynamic";
import { QRPreview } from "@/components/studio/QRPreview";

const QRScene = dynamic(() => import("@/components/three/QRScene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center text-sm text-[var(--muted)]">
      Warming up WebGL…
    </div>
  ),
});

export function Hero3D() {
  return (
    <div className="relative aspect-square w-full">
      <div className="absolute inset-0">
        <QRScene />
      </div>
      {/* off-screen renderer feeds the live QR texture to the 3D tile */}
      <div className="pointer-events-none absolute -left-[9999px] opacity-0">
        <QRPreview />
      </div>
    </div>
  );
}
