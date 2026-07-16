"use client";

import { useMemo, useState } from "react";
import { FRAME_META, frameThumbSvg } from "@/lib/qr/frames";
import type { FrameKind } from "@/lib/qr/types";
import { useQrStore } from "@/lib/store";
import { Field, TextInput } from "@/components/ui/controls";

export function FramePicker() {
  const [open, setOpen] = useState(false);
  const frame = useQrStore((s) => s.frame);
  const frameLabel = useQrStore((s) => s.frameLabel);
  const setFrame = useQrStore((s) => s.setFrame);
  const setFrameLabel = useQrStore((s) => s.setFrameLabel);
  const selected = FRAME_META.find((f) => f.id === frame) ?? FRAME_META[0];

  const thumbs = useMemo(() => {
    const map: Partial<Record<FrameKind, string>> = {};
    for (const f of FRAME_META) {
      const svg = frameThumbSvg(f.id);
      map[f.id] = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
    }
    return map;
  }, []);

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-left transition hover:border-[var(--brand)]"
        aria-expanded={open}
      >
        <span>
          <span className="block text-xs font-medium text-[var(--muted)]">
            Frame style
          </span>
          <span className="text-sm font-semibold text-[var(--foreground)]">
            {selected.label}
          </span>
          <span className="ml-2 text-xs text-[var(--muted)]">
            {selected.hint}
          </span>
        </span>
        <span
          className={`text-lg text-[var(--muted)] transition ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        >
          ⌄
        </span>
      </button>

      {open && (
        <Field label={`Choose frame — ${FRAME_META.length} styles`}>
          <div className="grid max-h-72 grid-cols-3 gap-2 overflow-y-auto pr-1 sm:grid-cols-4">
            {FRAME_META.map((f) => {
              const active = frame === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  title={f.hint}
                  onClick={() => {
                    setFrame(f.id);
                    setOpen(false);
                  }}
                  className={`flex flex-col items-center gap-1 rounded-xl border p-1.5 transition ${
                    active
                      ? "border-[var(--brand)] bg-[var(--brand)]/10 ring-2 ring-[var(--brand)]/40"
                      : "border-[var(--border)] bg-[var(--surface-2)] hover:border-[var(--brand)]"
                  }`}
                >
                  {f.id === "none" ? (
                    <span className="grid h-14 w-full place-items-center text-lg text-[var(--muted)]">
                      ⌀
                    </span>
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={thumbs[f.id]}
                      alt=""
                      className="h-14 w-full object-contain"
                    />
                  )}
                  <span className="text-[10px] font-medium text-[var(--muted)]">
                    {f.label}
                  </span>
                </button>
              );
            })}
          </div>
        </Field>
      )}

      {!open && frame !== "none" && thumbs[frame] && (
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={thumbs[frame]}
            alt=""
            className="mx-auto h-24 w-full object-contain"
          />
        </div>
      )}

      {frame !== "none" && (
        <Field label="Frame caption" hint="Shown on the frame">
          <TextInput
            value={frameLabel}
            maxLength={24}
            placeholder="Scan Me!"
            onChange={(e) => setFrameLabel(e.target.value)}
          />
        </Field>
      )}
    </div>
  );
}
