"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { CONTENT_TYPE_META } from "@/lib/qr/content";
import type { MaterialKind, QrContentType, SceneMode, View2dMode } from "@/lib/qr/types";
import { selectEncodedData, useQrStore } from "@/lib/store";
import { QRPreview, downloadQr } from "./QRPreview";
import { Preview2DFun } from "./Preview2DFun";
import { FramedPreview } from "./FramedPreview";
import { ContentForm } from "./ContentForm";
import { StyleControls } from "./StyleControls";
import { DynamicPanel } from "./DynamicPanel";
import { Toggle } from "@/components/ui/controls";
import { trackEvent } from "@/lib/analytics";

const QRScene = dynamic(() => import("@/components/three/QRScene"), {
  ssr: false,
  loading: () => (
    <div className="grid h-full w-full place-items-center text-sm text-[var(--muted)]">
      Loading 3D engine…
    </div>
  ),
});

const MATERIALS: { value: MaterialKind; label: string }[] = [
  { value: "matte", label: "Matte" },
  { value: "glass", label: "Glass" },
  { value: "metallic", label: "Metallic" },
  { value: "holographic", label: "Holographic" },
];

const SCENES: { value: SceneMode; label: string; hint: string }[] = [
  {
    value: "showcase",
    label: "Showcase",
    hint: "Drag to orbit · scroll to zoom",
  },
  {
    value: "runaway",
    label: "Runaway",
    hint: "Move your cursor near the QR — it flees!",
  },
  {
    value: "sticky",
    label: "Magnet",
    hint: "Opposite of runaway — the QR sticks to your cursor",
  },
  {
    value: "buddy",
    label: "Buddy",
    hint: "A chibi cartoon buddy holds your code",
  },
  {
    value: "bounce",
    label: "Trampoline",
    hint: "QR bouncing on a padded trampoline",
  },
  {
    value: "ufo",
    label: "UFO",
    hint: "Aliens are beaming up your QR",
  },
  {
    value: "rocket",
    label: "Rocket",
    hint: "QR strapped to a rocket — 3… 2… 1…",
  },
  {
    value: "disco",
    label: "Disco",
    hint: "Saturday night fever for barcodes",
  },
  {
    value: "sandwich",
    label: "Sandwich",
    hint: "Sesame burger with QR as the secret filling",
  },
  {
    value: "balloon",
    label: "Balloon",
    hint: "Hot-air balloon tourism, QR edition",
  },
  {
    value: "duck",
    label: "Rubber duck",
    hint: "Debug rubber duck… with a QR on its head",
  },
  {
    value: "rain",
    label: "QR Rain",
    hint: "Clouds, raining QR codes, and a couple on the road",
  },
  {
    value: "gift",
    label: "Gift box",
    hint: "QR perched on a gift box",
  },
  {
    value: "package",
    label: "Package",
    hint: "QR on a shipping package",
  },
];

const MODES_2D: { value: View2dMode; label: string; hint: string }[] = [
  { value: "clean", label: "Clean", hint: "Plain live preview" },
  { value: "neon", label: "Neon", hint: "Pulsing neon glow frame" },
  { value: "glitch", label: "Glitch", hint: "Cyberpunk RGB glitch vibes" },
  { value: "polaroid", label: "Polaroid", hint: "Instant photo frame" },
  { value: "sticker", label: "Sticker", hint: "Taped-on sticker look" },
  { value: "matrix", label: "Matrix", hint: "Digital rain behind the code" },
  { value: "sparkle", label: "Sparkle", hint: "Twinkly fairy dust" },
  { value: "runaway", label: "Runaway", hint: "Cursor near? It scoots away" },
  { value: "bounce", label: "Bounce", hint: "Boing boing boing" },
  { value: "comic", label: "Comic", hint: "POW! Halftone comic frame" },
  { value: "crt", label: "CRT", hint: "Retro TV scanlines" },
  { value: "zoom", label: "Zoom lens", hint: "Hover to magnify details" },
];

function playChime(enabled: boolean) {
  if (!enabled || typeof window === "undefined") return;
  try {
    const Ctx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    const ctx = new Ctx();
    const notes = [523.25, 659.25, 783.99];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = freq;
      osc.type = "sine";
      osc.connect(gain);
      gain.connect(ctx.destination);
      const t = ctx.currentTime + i * 0.09;
      gain.gain.setValueAtTime(0.0001, t);
      gain.gain.exponentialRampToValueAtTime(0.15, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
      osc.start(t);
      osc.stop(t + 0.36);
    });
  } catch {
    /* audio not available */
  }
}

export function Studio() {
  const type = useQrStore((s) => s.type);
  const setType = useQrStore((s) => s.setType);
  const style = useQrStore((s) => s.style);
  const fields = useQrStore((s) => s.fields);
  const dynamicEnabled = useQrStore((s) => s.dynamicEnabled);
  const dynamic = useQrStore((s) => s.dynamic);
  const material = useQrStore((s) => s.material);
  const setMaterial = useQrStore((s) => s.setMaterial);
  const sceneMode = useQrStore((s) => s.sceneMode);
  const setSceneMode = useQrStore((s) => s.setSceneMode);
  const view2dMode = useQrStore((s) => s.view2dMode);
  const setView2dMode = useQrStore((s) => s.setView2dMode);
  const frame = useQrStore((s) => s.frame);
  const frameLabel = useQrStore((s) => s.frameLabel);
  const settings = useQrStore((s) => s.settings);
  const setSetting = useQrStore((s) => s.setSetting);
  const bumpGeneration = useQrStore((s) => s.bumpGeneration);

  const [tab, setTab] = useState<"content" | "design">("content");
  const [view, setView] = useState<"3d" | "2d">("3d");
  const [scanning, setScanning] = useState(false);
  const [flip, setFlip] = useState(false);
  const [showHint, setShowHint] = useState(false);

  useEffect(() => {
    try {
      setShowHint(localStorage.getItem("vyntrix_onboarded") !== "1");
    } catch {
      setShowHint(true);
    }
    trackEvent("studio_start");
  }, []);

  const dismissHint = () => {
    setShowHint(false);
    try {
      localStorage.setItem("vyntrix_onboarded", "1");
    } catch {
      /* storage unavailable */
    }
  };

  const data = useMemo(
    () => selectEncodedData({ type, fields, dynamicEnabled, dynamic }),
    [type, fields, dynamicEnabled, dynamic],
  );

  const reveal = () => {
    bumpGeneration();
    playChime(settings.soundEnabled);
    if (!settings.reducedMotion) {
      setFlip(true);
      setTimeout(() => setFlip(false), 900);
    }
  };

  const testScan = () => {
    setScanning(true);
    playChime(settings.soundEnabled);
    setTimeout(() => setScanning(false), 1800);
  };

  return (
    <>
      {showHint && (
        <div className="mx-auto mt-4 w-[min(1200px,95vw)]">
          <div className="glass flex flex-col items-start justify-between gap-3 rounded-2xl px-4 py-3 sm:flex-row sm:items-center">
            <p className="text-sm text-[var(--muted)]">
              <span className="font-medium text-[var(--foreground)]">
                New here?
              </span>{" "}
              1) Choose a type &amp; fill the form · 2) Open{" "}
              <span className="text-[var(--foreground)]">Design </span> to add a
              logo &amp; colors · 3) Hit{" "}
              <span className="text-[var(--foreground)]">PNG / SVG</span> to
              download.
            </p>
            <button
              onClick={dismissHint}
              className="shrink-0 rounded-lg border border-[var(--border)] px-3 py-1.5 text-xs font-medium transition hover:border-[var(--brand)]"
            >
              Got it
            </button>
          </div>
        </div>
      )}
      <div className="mx-auto grid w-[min(1200px,95vw)] gap-5 py-6 lg:grid-cols-[minmax(0,380px)_1fr]">
        {/* Left: controls */}
      <div className="glass rounded-2xl p-4">
        <div className="mb-4 flex flex-wrap gap-1.5">
          {(Object.keys(CONTENT_TYPE_META) as QrContentType[]).map((t) => {
            const meta = CONTENT_TYPE_META[t];
            const active = t === type;
            return (
              <button
                key={t}
                onClick={() => setType(t)}
                title={meta.hint}
                className={`rounded-lg px-2.5 py-1.5 text-xs font-medium transition ${
                  active
                    ? "bg-[var(--brand)] text-white"
                    : "bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                <span className="mr-1">{meta.icon}</span>
                {meta.label}
              </button>
            );
          })}
        </div>

        <div className="mb-4 grid grid-cols-2 gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-1">
          {(["content", "design"] as const).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium capitalize transition ${
                tab === t
                  ? "bg-[var(--brand)] text-white"
                  : "text-[var(--muted)] hover:text-[var(--foreground)]"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
          >
            {tab === "content" ? (
              <div className="space-y-4">
                <ContentForm />
                {type === "url" && <DynamicPanel />}
              </div>
            ) : (
              <StyleControls />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="mt-5 space-y-2 border-t border-[var(--border)] pt-4">
          <SettingRow label="Sound effects">
            <Toggle
              label="Sound effects"
              checked={settings.soundEnabled}
              onChange={(v) => setSetting("soundEnabled", v)}
            />
          </SettingRow>
          <SettingRow label="Auto-rotate 3D">
            <Toggle
              label="Auto-rotate"
              checked={settings.autoRotate}
              onChange={(v) => setSetting("autoRotate", v)}
            />
          </SettingRow>
          <SettingRow label="Reduced motion">
            <Toggle
              label="Reduced motion"
              checked={settings.reducedMotion}
              onChange={(v) => setSetting("reducedMotion", v)}
            />
          </SettingRow>
        </div>
      </div>

      {/* Right: preview */}
      <div className="glass flex flex-col rounded-2xl p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="grid grid-cols-2 gap-1 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-1">
            {(["3d", "2d"] as const).map((v) => (
              <button
                key={v}
                onClick={() => setView(v)}
                className={`rounded-lg px-4 py-1.5 text-sm font-medium uppercase transition ${
                  view === v
                    ? "bg-[var(--brand)] text-white"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {v}
              </button>
            ))}
          </div>
          <span className="hidden text-xs text-[var(--muted)] sm:block">
            {view === "3d"
              ? (SCENES.find((s) => s.value === sceneMode)?.hint ??
                "Drag to orbit · scroll to zoom")
              : (MODES_2D.find((m) => m.value === view2dMode)?.hint ??
                "Live preview")}
          </span>
        </div>

        <div className="relative grid min-h-[360px] flex-1 place-items-center overflow-hidden rounded-2xl bg-[radial-gradient(circle_at_50%_20%,rgba(124,92,255,0.14),transparent_60%)]">
          {view === "3d" ? (
            <div className="absolute inset-0">
              <QRScene />
            </div>
          ) : (
            <motion.div
              animate={flip ? { rotateY: 360 } : { rotateY: 0 }}
              transition={{ duration: 0.9, ease: "easeInOut" }}
              className="relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <Preview2DFun>
                <FramedPreview>
                  <QRPreview />
                </FramedPreview>
              </Preview2DFun>
              <AnimatePresence>
                {scanning && (
                  <motion.div
                    initial={{ top: "0%" }}
                    animate={{ top: ["0%", "100%", "0%"] }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.6, ease: "easeInOut" }}
                    className="pointer-events-none absolute left-0 right-0 h-1 rounded-full"
                    style={{
                      background:
                        "linear-gradient(90deg,transparent,#10b981,transparent)",
                      boxShadow: "0 0 18px 4px rgba(33,212,253,0.8)",
                    }}
                  />
                )}
              </AnimatePresence>
              <AnimatePresence>
                {scanning && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 1.2 }}
                    className="absolute inset-0 grid place-items-center"
                  >
                    <span className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/90 text-3xl text-white shadow-lg">
                      ✓
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
          {/* hidden 2D renderer keeps the 3D texture fed even in 3D view */}
          {view === "3d" && (
            <div className="pointer-events-none absolute -left-[9999px] opacity-0">
              <QRPreview />
            </div>
          )}
        </div>

        {view === "3d" && (
          <div className="mt-3 space-y-2">
            <div>
              <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">
                Fun scenes
              </p>
              <div className="flex flex-wrap gap-1.5">
                {SCENES.map((s) => (
                  <button
                    key={s.value}
                    onClick={() => setSceneMode(s.value)}
                    title={s.hint}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      sceneMode === s.value
                        ? "btn-primary"
                        : "border border-[var(--border)] bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">
                Material
              </p>
              <div className="flex flex-wrap gap-1.5">
                {MATERIALS.map((m) => (
                  <button
                    key={m.value}
                    onClick={() => setMaterial(m.value)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      material === m.value
                        ? "btn-primary"
                        : "border border-[var(--border)] bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  >
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {view === "2d" && (
          <div className="mt-3">
            <p className="mb-1.5 text-[10px] font-medium uppercase tracking-wider text-[var(--muted)]">
              Fun 2D effects
            </p>
            <div className="flex flex-wrap gap-1.5">
              {MODES_2D.map((m) => (
                <button
                  key={m.value}
                  onClick={() => setView2dMode(m.value)}
                  title={m.hint}
                  className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                    view2dMode === m.value
                      ? "btn-primary"
                      : "border border-[var(--border)] bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          <button onClick={reveal} className="btn-primary rounded-xl px-4 py-2 text-sm font-semibold">
            ✨ Reveal
          </button>
          <button
            onClick={testScan}
            className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-sm font-medium transition hover:border-[var(--brand)]"
          >
            📱 Test scan
          </button>
          <div className="ml-auto flex gap-2">
            <button
              onClick={() => {
                trackEvent("qr_download", { format: "png", type });
                downloadQr("png", style, data, frame, frameLabel);
              }}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-sm font-medium transition hover:border-[var(--brand)]"
            >
              PNG{frame !== "none" ? " + frame" : ""}
            </button>
            <button
              onClick={() => {
                trackEvent("qr_download", { format: "svg", type });
                downloadQr("svg", style, data, frame, frameLabel);
              }}
              className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-2 text-sm font-medium transition hover:border-[var(--brand)]"
            >
              SVG{frame !== "none" ? " + frame" : ""}
            </button>
          </div>
        </div>
        </div>
      </div>
    </>
  );
}

function SettingRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-sm text-[var(--muted)]">{label}</span>
      {children}
    </div>
  );
}
