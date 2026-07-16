"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { QRPreview } from "@/components/studio/QRPreview";
import { PRESETS, useQrStore } from "@/lib/store";

const QRScene = dynamic(() => import("@/components/three/QRScene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center text-sm text-[var(--muted)]">
      Warming up WebGL…
    </div>
  ),
});

const STARLIGHT = PRESETS.find((p) => p.id === "starlight")!;

export function Hero3D() {
  const applyPreset = useQrStore((s) => s.applyPreset);
  const setField = useQrStore((s) => s.setField);

  useEffect(() => {
    applyPreset(STARLIGHT);
    // Demo payload only when empty so the hero QR is visible.
    if (!useQrStore.getState().fields.url.trim()) {
      setField("url", "https://vyntrixqr.app");
    }
  }, [applyPreset, setField]);

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
