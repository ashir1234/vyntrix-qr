"use client";

import { useEffect, useRef } from "react";
import type QRCodeStyling from "qr-code-styling";
import { buildQrOptions } from "@/lib/qr/options";
import {
  isCustomDotType,
  renderPatternQrToCanvas,
} from "@/lib/qr/patternCanvas";
import type { QrStyle } from "@/lib/qr/types";

export function StaticQr({
  data,
  style,
  size = 180,
}: {
  data: string;
  style: QrStyle;
  size?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!ref.current) return;
      ref.current.innerHTML = "";

      if (isCustomDotType(style.dotType)) {
        const canvas = await renderPatternQrToCanvas(data, style, size);
        if (cancelled || !ref.current) return;
        canvas.style.width = "100%";
        canvas.style.height = "auto";
        canvas.style.display = "block";
        ref.current.appendChild(canvas);
        return;
      }

      const mod = await import("qr-code-styling");
      if (cancelled || !ref.current) return;
      qrRef.current = new mod.default(buildQrOptions({ data, style, size }));
      qrRef.current.append(ref.current);
    })();
    return () => {
      cancelled = true;
    };
  }, [data, style, size]);

  return <div ref={ref} className="flex items-center justify-center" />;
}
