"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type QRCodeStyling from "qr-code-styling";
import { buildQrOptions } from "@/lib/qr/options";
import {
  isCustomDotType,
  patternQrToBlob,
  patternQrToDataUrl,
  renderPatternQrSvg,
  renderPatternQrToCanvas,
} from "@/lib/qr/patternCanvas";
import {
  composeFramedPng,
  composeFramedSvg,
} from "@/lib/qr/frames";
import type { FrameKind, QrStyle } from "@/lib/qr/types";
import { selectEncodedData, useQrStore } from "@/lib/store";

function useDebounced<T>(value: T, delay: number): T {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);
  return debounced;
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read blob"));
    reader.readAsDataURL(blob);
  });
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
  const useCustomPattern = isCustomDotType(debouncedStyle.dotType);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const mod = await import("qr-code-styling");
      if (cancelled) return;
      const QR = mod.default;
      qrRef.current = new QR(
        buildQrOptions({ data: rawData, style, size: 320 }),
      );
      setReady(true);
    })();
    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!ready || !containerRef.current) return;

    let cancelled = false;

    (async () => {
      const el = containerRef.current!;
      el.innerHTML = "";

      if (useCustomPattern) {
        const canvas = await renderPatternQrToCanvas(
          debouncedData,
          debouncedStyle,
          320,
        );
        if (cancelled || !containerRef.current) return;
        canvas.style.width = "100%";
        canvas.style.height = "auto";
        canvas.style.display = "block";
        el.appendChild(canvas);

        const url = await patternQrToDataUrl(debouncedData, debouncedStyle, 320);
        if (cancelled) return;
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
        setQrDataUrl(url);
        return;
      }

      if (!qrRef.current) return;
      qrRef.current.update(
        buildQrOptions({
          data: debouncedData,
          style: debouncedStyle,
          size: 320,
        }),
      );
      qrRef.current.append(el);

      try {
        const blob = (await qrRef.current.getRawData("png")) as Blob | null;
        if (!blob || cancelled) return;
        const url = await blobToDataUrl(blob);
        if (objectUrlRef.current) URL.revokeObjectURL(objectUrlRef.current);
        objectUrlRef.current = null;
        setQrDataUrl(url);
      } catch {
        /* ignore transient encode errors */
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [ready, debouncedData, debouncedStyle, useCustomPattern, setQrDataUrl]);

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

async function bareQrDataUrl(style: QrStyle, data: string, size: number) {
  if (isCustomDotType(style.dotType)) {
    return patternQrToDataUrl(data, style, size);
  }
  const mod = await import("qr-code-styling");
  const instance = new mod.default(
    buildQrOptions({ data, style, size }),
  );
  const blob = (await instance.getRawData("png")) as Blob | null;
  if (!blob) throw new Error("Failed to render QR");
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("Failed to read QR"));
    reader.readAsDataURL(blob);
  });
}

function triggerDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export async function downloadQr(
  type: QrExportType,
  currentStyle: QrStyle,
  data: string,
  frame: FrameKind = "none",
  frameLabel = "Scan Me!",
) {
  const bare = await bareQrDataUrl(currentStyle, data, frame === "none" ? 1024 : 800);

  if (frame !== "none") {
    if (type === "svg") {
      const svg = composeFramedSvg(bare, frame, frameLabel);
      triggerDownload(
        new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
        "qrverse-framed.svg",
      );
      return;
    }
    const blob = await composeFramedPng(bare, frame, frameLabel, 3);
    triggerDownload(blob, "qrverse-framed.png");
    return;
  }

  if (isCustomDotType(currentStyle.dotType)) {
    if (type === "svg") {
      const svg = renderPatternQrSvg(data, currentStyle, 1024);
      triggerDownload(
        new Blob([svg], { type: "image/svg+xml;charset=utf-8" }),
        "qrverse-code.svg",
      );
      return;
    }
    const blob = await patternQrToBlob(
      data,
      currentStyle,
      1024,
      type === "jpeg" ? "jpeg" : type === "webp" ? "webp" : "png",
    );
    triggerDownload(blob, `qrverse-code.${type === "jpeg" ? "jpg" : type}`);
    return;
  }

  const mod = await import("qr-code-styling");
  const QR = mod.default;
  const instance = new QR(
    buildQrOptions({ data, style: currentStyle, size: 1024 }),
  );
  await instance.download({ name: "qrverse-code", extension: type });
}

export type QrExportType = "png" | "svg" | "jpeg" | "webp";
