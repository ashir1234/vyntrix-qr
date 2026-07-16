"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { StaticQr } from "@/components/gallery/StaticQr";
import { PRESETS, useQrStore } from "@/lib/store";
import type { QrStyle } from "@/lib/qr/types";

const baseStyle: QrStyle = {
  fgColor: "#7c5cff",
  bgColor: "#0d1024",
  useGradient: true,
  gradientColor: "#21d4fd",
  gradientType: "linear",
  dotType: "rounded",
  cornerSquareType: "extra-rounded",
  cornerDotType: "dot",
  errorCorrection: "Q",
  margin: 6,
  logoDataUrl: null,
  logoSize: 0.4,
};

const SAMPLES = PRESETS.map((p, i) => ({
  preset: p,
  data: `https://vyntrixqr.com/design/${p.id}`,
  likes: 42 + i * 17,
}));

export function GalleryClient() {
  const applyPreset = useQrStore((s) => s.applyPreset);
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  return (
    <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {SAMPLES.map(({ preset, data, likes }, i) => {
        const style = { ...baseStyle, ...preset.style };
        const isLiked = liked[preset.id];
        return (
          <motion.div
            key={preset.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="glass flex flex-col rounded-2xl p-4"
          >
            <div
              className="grid place-items-center rounded-xl p-4"
              style={{ background: style.bgColor }}
            >
              <StaticQr data={data} style={style} />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <div>
                <p className="font-semibold">{preset.name}</p>
                <p className="text-xs capitalize text-[var(--muted)]">
                  {preset.material} material
                </p>
              </div>
              <button
                onClick={() =>
                  setLiked((l) => ({ ...l, [preset.id]: !l[preset.id] }))
                }
                className="flex items-center gap-1 rounded-full border border-[var(--border)] px-3 py-1 text-sm transition hover:border-[var(--accent)]"
                aria-pressed={isLiked}
                aria-label={`Like ${preset.name}`}
              >
                <span>{isLiked ? "❤️" : "🤍"}</span>
                <span className="text-xs text-[var(--muted)]">
                  {likes + (isLiked ? 1 : 0)}
                </span>
              </button>
            </div>
            <Link
              href="/studio"
              onClick={() => applyPreset(preset)}
              className="btn-primary mt-3 rounded-xl py-2 text-center text-sm font-medium"
            >
              Use this design
            </Link>
          </motion.div>
        );
      })}
    </div>
  );
}
