"use client";

import { useRef } from "react";
import { PRESETS, useQrStore } from "@/lib/store";
import type {
  CornerDotType,
  CornerSquareType,
  DotType,
  ErrorCorrection,
  GradientType,
} from "@/lib/qr/types";
import {
  ColorInput,
  Field,
  Segmented,
  Slider,
  Toggle,
} from "@/components/ui/controls";

export function StyleControls() {
  const style = useQrStore((s) => s.style);
  const setStyle = useQrStore((s) => s.setStyle);
  const setLogo = useQrStore((s) => s.setLogo);
  const applyPreset = useQrStore((s) => s.applyPreset);
  const fileRef = useRef<HTMLInputElement>(null);

  const onLogoPick = (file: File | undefined) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setLogo(reader.result as string);
    reader.readAsDataURL(file);
    if (style.errorCorrection === "L" || style.errorCorrection === "M") {
      setStyle("errorCorrection", "H");
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-xs font-medium text-[var(--muted)]">Presets</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS.map((p) => (
            <button
              key={p.id}
              onClick={() => applyPreset(p)}
              className="rounded-full border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-xs font-medium text-[var(--foreground)] transition hover:border-[var(--brand)] hover:text-white"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <Field label="Foreground">
          <ColorInput
            value={style.fgColor}
            onChange={(v) => setStyle("fgColor", v)}
          />
        </Field>

        <div className="flex items-center justify-between rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2">
          <span className="text-sm text-[var(--muted)]">Gradient</span>
          <Toggle
            label="Use gradient"
            checked={style.useGradient}
            onChange={(v) => setStyle("useGradient", v)}
          />
        </div>

        {style.useGradient && (
          <>
            <Field label="Gradient color">
              <ColorInput
                value={style.gradientColor}
                onChange={(v) => setStyle("gradientColor", v)}
              />
            </Field>
            <Field label="Gradient type">
              <Segmented<GradientType>
                ariaLabel="Gradient type"
                value={style.gradientType}
                onChange={(v) => setStyle("gradientType", v)}
                options={[
                  { value: "linear", label: "Linear" },
                  { value: "radial", label: "Radial" },
                ]}
              />
            </Field>
          </>
        )}

        <Field label="Background">
          <ColorInput
            value={style.bgColor}
            onChange={(v) => setStyle("bgColor", v)}
          />
        </Field>
      </div>

      <Field label="Dot style">
        <Segmented<DotType>
          ariaLabel="Dot style"
          value={style.dotType}
          onChange={(v) => setStyle("dotType", v)}
          options={[
            { value: "rounded", label: "Rounded" },
            { value: "dots", label: "Dots" },
            { value: "classy", label: "Classy" },
            { value: "classy-rounded", label: "Classy+" },
            { value: "square", label: "Square" },
            { value: "extra-rounded", label: "Extra" },
          ]}
        />
      </Field>

      <div className="grid grid-cols-2 gap-3">
        <Field label="Corner frame">
          <Segmented<CornerSquareType>
            ariaLabel="Corner frame"
            value={style.cornerSquareType}
            onChange={(v) => setStyle("cornerSquareType", v)}
            options={[
              { value: "square", label: "Square" },
              { value: "dot", label: "Dot" },
              { value: "extra-rounded", label: "Round" },
            ]}
          />
        </Field>
        <Field label="Corner dot">
          <Segmented<CornerDotType>
            ariaLabel="Corner dot"
            value={style.cornerDotType}
            onChange={(v) => setStyle("cornerDotType", v)}
            options={[
              { value: "square", label: "Square" },
              { value: "dot", label: "Dot" },
            ]}
          />
        </Field>
      </div>

      <Field
        label="Error correction"
        hint="Higher = more logo-friendly"
      >
        <Segmented<ErrorCorrection>
          ariaLabel="Error correction"
          value={style.errorCorrection}
          onChange={(v) => setStyle("errorCorrection", v)}
          options={[
            { value: "L", label: "L" },
            { value: "M", label: "M" },
            { value: "Q", label: "Q" },
            { value: "H", label: "H" },
          ]}
        />
      </Field>

      <Field label={`Quiet-zone margin — ${style.margin}px`}>
        <Slider
          ariaLabel="Margin"
          value={style.margin}
          min={0}
          max={40}
          onChange={(v) => setStyle("margin", v)}
        />
      </Field>

      <div className="space-y-2">
        <p className="text-xs font-medium text-[var(--muted)]">Logo</p>
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onLogoPick(e.target.files?.[0])}
        />
        <div className="flex items-center gap-2">
          <button
            onClick={() => fileRef.current?.click()}
            className="flex-1 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-sm font-medium transition hover:border-[var(--brand)]"
          >
            {style.logoDataUrl ? "Replace logo" : "Upload logo"}
          </button>
          {style.logoDataUrl && (
            <button
              onClick={() => setLogo(null)}
              className="rounded-xl border border-[var(--border)] px-3 py-2 text-sm text-[var(--muted)] transition hover:text-white"
            >
              Remove
            </button>
          )}
        </div>
        {style.logoDataUrl && (
          <Field label={`Logo size — ${Math.round(style.logoSize * 100)}%`}>
            <Slider
              ariaLabel="Logo size"
              value={style.logoSize}
              min={0.1}
              max={0.6}
              step={0.05}
              onChange={(v) => setStyle("logoSize", v)}
            />
          </Field>
        )}
      </div>
    </div>
  );
}
