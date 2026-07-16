"use client";

import { useEffect, useRef } from "react";
import type QRCodeStyling from "qr-code-styling";
import { buildQrOptions } from "@/lib/qr/options";
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
      const mod = await import("qr-code-styling");
      if (cancelled || !ref.current) return;
      qrRef.current = new mod.default(buildQrOptions({ data, style, size }));
      ref.current.innerHTML = "";
      qrRef.current.append(ref.current);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <div ref={ref} className="flex items-center justify-center" />;
}
