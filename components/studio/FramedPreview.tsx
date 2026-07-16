"use client";

import { useEffect, useState, type ReactNode } from "react";
import { buildFrameSvg } from "@/lib/qr/frames";
import { useQrStore } from "@/lib/store";

/**
 * Wraps the live QR preview with the selected decorative frame.
 * When frame is "none", children render as-is.
 */
export function FramedPreview({ children }: { children: ReactNode }) {
  const frame = useQrStore((s) => s.frame);
  const frameLabel = useQrStore((s) => s.frameLabel);
  const qrDataUrl = useQrStore((s) => s.qrDataUrl);
  const [src, setSrc] = useState<string | null>(null);

  useEffect(() => {
    if (frame === "none" || !qrDataUrl) {
      setSrc(null);
      return;
    }
    const svg = buildFrameSvg(qrDataUrl, frame, frameLabel);
    setSrc(`data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`);
  }, [frame, frameLabel, qrDataUrl]);

  if (frame === "none" || !src) {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      {/* Keep bare QR mounted (hidden) so texture / data URL stay fresh */}
      <div className="pointer-events-none absolute -left-[9999px] opacity-0">
        {children}
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="Framed QR preview"
        className="max-h-[340px] w-auto max-w-[min(100%,340px)] rounded-xl bg-white shadow-sm"
      />
    </div>
  );
}
