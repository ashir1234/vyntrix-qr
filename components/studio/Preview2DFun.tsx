"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useQrStore } from "@/lib/store";
import type { View2dMode } from "@/lib/qr/types";

function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    const chars = "01アイウエオQR✦◆█";
    const fontSize = 12;
    let drops: number[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * devicePixelRatio;
      canvas.height = canvas.offsetHeight * devicePixelRatio;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      const cols = Math.ceil(canvas.offsetWidth / fontSize);
      drops = Array.from({ length: cols }, () => Math.random() * 20);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const draw = () => {
      ctx.fillStyle = "rgba(8, 3, 15, 0.18)";
      ctx.fillRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);
      ctx.fillStyle = "#10b981";
      ctx.font = `${fontSize}px monospace`;
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(ch, i * fontSize, drops[i] * fontSize);
        if (drops[i] * fontSize > canvas.offsetHeight && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full opacity-50"
      aria-hidden
    />
  );
}

function Sparkles() {
  const bits = Array.from({ length: 18 }, (_, i) => i);
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
      {bits.map((i) => (
        <span
          key={i}
          className="qr2d-sparkle"
          style={{
            left: `${8 + ((i * 37) % 84)}%`,
            top: `${10 + ((i * 53) % 80)}%`,
            animationDelay: `${(i % 7) * 0.25}s`,
            fontSize: `${8 + (i % 4) * 3}px`,
          }}
        >
          {i % 3 === 0 ? "✦" : i % 3 === 1 ? "✧" : "·"}
        </span>
      ))}
    </div>
  );
}

function Runaway2d({ children }: { children: ReactNode }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const reduced = useQrStore((s) => s.settings.reducedMotion);

  useEffect(() => {
    if (reduced) return;
    const el = wrap.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const onMove = (e: MouseEvent) => {
      const rect = parent.getBoundingClientRect();
      const cx = rect.left + rect.width / 2 + offset.x;
      const cy = rect.top + rect.height / 2 + offset.y;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < 140 && dist > 1) {
        const force = (140 - dist) / 140;
        setOffset((o) => ({
          x: Math.max(-90, Math.min(90, o.x - (dx / dist) * force * 18)),
          y: Math.max(-70, Math.min(70, o.y - (dy / dist) * force * 18)),
        }));
      } else {
        setOffset((o) => ({ x: o.x * 0.9, y: o.y * 0.9 }));
      }
    };
    parent.addEventListener("mousemove", onMove);
    return () => parent.removeEventListener("mousemove", onMove);
  }, [offset.x, offset.y, reduced]);

  return (
    <div
      ref={wrap}
      className="transition-transform duration-150 ease-out"
      style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}
    >
      {children}
    </div>
  );
}

function ZoomLens({ children }: { children: ReactNode }) {
  const [origin, setOrigin] = useState("50% 50%");
  const [zoomed, setZoomed] = useState(false);

  return (
    <div
      className="relative transition-transform duration-150 ease-out"
      style={{
        transform: zoomed ? "scale(1.45)" : "scale(1)",
        transformOrigin: origin,
      }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect();
        setOrigin(
          `${((e.clientX - r.left) / r.width) * 100}% ${((e.clientY - r.top) / r.height) * 100}%`,
        );
        setZoomed(true);
      }}
      onMouseLeave={() => setZoomed(false)}
    >
      {children}
      {zoomed && (
        <div
          className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-[var(--brand-2)]"
          style={{
            left: `calc(${origin.split(" ")[0]} - 56px)`,
            top: `calc(${origin.split(" ")[1]} - 56px)`,
            width: 112,
            height: 112,
            boxShadow: "0 0 24px rgba(16,185,129,0.45)",
          }}
          aria-hidden
        />
      )}
    </div>
  );
}

function shellClass(mode: View2dMode): string {
  switch (mode) {
    case "neon":
      return "qr2d-neon rounded-2xl p-1";
    case "glitch":
      return "qr2d-glitch";
    case "polaroid":
      return "relative bg-[#f7f2e8] p-3 pb-10 shadow-xl rotate-[-2deg]";
    case "sticker":
      return "qr2d-sticker rotate-[3deg]";
    case "bounce":
      return "qr2d-bounce";
    case "comic":
      return "qr2d-comic relative";
    case "crt":
      return "qr2d-crt rounded-lg overflow-hidden";
    default:
      return "";
  }
}

export function Preview2DFun({ children }: { children: ReactNode }) {
  const mode = useQrStore((s) => s.view2dMode);
  const reduced = useQrStore((s) => s.settings.reducedMotion);
  const effective: View2dMode = reduced && mode !== "clean" && mode !== "polaroid" && mode !== "sticker" && mode !== "comic"
    ? "clean"
    : mode;

  let inner: ReactNode = (
    <div className={shellClass(effective)}>
      {effective === "polaroid" && (
        <p className="pointer-events-none absolute bottom-2 left-0 right-0 text-center font-[cursive] text-sm text-[#333]">
          scan me ♥
        </p>
      )}
      {effective === "comic" && (
        <span className="pointer-events-none absolute -right-3 -top-4 z-10 rotate-12 rounded bg-accent px-2 py-0.5 text-[10px] font-black uppercase text-[#042016] shadow">
          POW!
        </span>
      )}
      {children}
    </div>
  );

  if (effective === "runaway") {
    inner = <Runaway2d>{inner}</Runaway2d>;
  }
  if (effective === "zoom") {
    inner = <ZoomLens>{inner}</ZoomLens>;
  }

  return (
    <div className="relative grid place-items-center p-6">
      {effective === "matrix" && <MatrixRain />}
      {effective === "sparkle" && <Sparkles />}
      <div className="relative z-[1]">{inner}</div>
    </div>
  );
}
