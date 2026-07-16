"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type QRCodeStyling from "qr-code-styling";
import { buildQrOptions } from "@/lib/qr/options";
import { selectEncodedData, useQrStore } from "@/lib/store";

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

export function QRPreview() {
  const type = useQrStore((s) => s.type);
  const fields = useQrStore((s) => s.fields);
  const style = useQrStore((s) => s.style);
  const dynamicEnabled = useQrStore((s) => s.dynamicEnabled);
  const dynamic = useQrStore((s) => s.dynamic);
  const setQrDataUrl = useQrStore((s) => s.setQrDataUrl);

  const containerRef = useRef<HTMLDivElement>(null);
  const qrRef = useRef<QRCodeStyling | null>(null);
  const objectUrlRef = useRef<string | null>(null);
  const [ready, setReady] = useState(false);

  const rawData = useMemo(
    () => selectEncodedData({ type, fields, dynamicEnabled, dynamic }),
    [type, fields, dynamicEnabled, dynamic],
  );
  const debouncedData = useDebounced(rawData, 200);
  const debouncedStyle = useDebounced(style, 150);

  // Lazy-create the instance (client only — the lib touches the DOM).
  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = await import("qr-code-styling");
      if (cancelled) return;
      const QR = mod.default;
      qrRef.current = new QR(
        buildQrOptions({ data: rawData, style, size: 320 }),
      );
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
        qrRef.current.append(containerRef.current);
      }
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Re-render on config/style change + publish data URL for the 3D layer.
  useEffect(() => {
    if (!ready || !qrRef.current) return;
    qrRef.current.update(
      buildQrOptions({ data: debouncedData, style: debouncedStyle, size: 320 }),
    );

    let cancelled = false;
    (async () => {
      try {
        const blob = (await qrRef.current!.getRawData("png")) as Blob | null;
        if (!blob || cancelled) return;
        const url = URL.createObjectURL(blob);
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = url;
        setQrDataUrl(url);
      } catch {
        /* ignore transient encode errors */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [ready, debouncedData, debouncedStyle, setQrDataUrl]);

  useEffect(() => {
    return () => {
      if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
    };
  }, []);

  return (
    <div
      className="rounded-2xl p-3"
      style={{ background: style.bgColor }}
      aria-label="QR code preview"
    >
      <div ref={containerRef} className="flex items-center justify-center" />
    </div>
  );
}

export async function downloadQr(
  type: QrExportType,
  currentStyle: ReturnType<typeof useQrStore.getState>["style"],
  data: string,
) {
  const mod = await import("qr-code-styling");
  const QR = mod.default;
  const instance = new QR(
    buildQrOptions({ data, style: currentStyle, size: 1024 }),
  );
  await instance.download({ name: "qrverse-code", extension: type });
}

export type QrExportType = "png" | "svg" | "jpeg" | "webp";
