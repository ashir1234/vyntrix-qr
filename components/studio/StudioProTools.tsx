"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { selectEncodedData, useQrStore } from "@/lib/store";
import { snapshotDesign } from "@/lib/qr/design";
import { downloadPrintPdf, downloadQr } from "@/components/studio/QRPreview";
import { trackEvent } from "@/lib/analytics";
import { authEnabled } from "@/lib/authFlags";

/** Pro-only Studio actions: save project + print pack exports. */
export function StudioProTools() {
  const [isPro, setIsPro] = useState(false);
  const [checked, setChecked] = useState(!authEnabled);
  const [projectName, setProjectName] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);

  const type = useQrStore((s) => s.type);
  const fields = useQrStore((s) => s.fields);
  const style = useQrStore((s) => s.style);
  const material = useQrStore((s) => s.material);
  const sceneMode = useQrStore((s) => s.sceneMode);
  const view2dMode = useQrStore((s) => s.view2dMode);
  const frame = useQrStore((s) => s.frame);
  const frameLabel = useQrStore((s) => s.frameLabel);
  const dynamic = useQrStore((s) => s.dynamic);
  const dynamicEnabled = useQrStore((s) => s.dynamicEnabled);
  const data = useQrStore(selectEncodedData);

  useEffect(() => {
    if (!authEnabled) return;
    let active = true;
    fetch("/api/billing/plan")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (active) {
          setIsPro(j?.plan === "pro");
          setChecked(true);
        }
      })
      .catch(() => {
        if (active) setChecked(true);
      });
    return () => {
      active = false;
    };
  }, []);

  if (!checked) return null;

  if (!isPro) {
    return (
      <div className="mt-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2.5 text-xs text-[var(--muted)]">
        Pro unlocks cloud sync, saved projects, bulk create, and print pack (4K
        PNG + PDF).{" "}
        <Link href="/pricing" className="text-[var(--brand-2)] underline">
          Upgrade
        </Link>
      </div>
    );
  }

  const design = () =>
    snapshotDesign({
      style,
      material,
      sceneMode,
      view2dMode,
      frame,
      frameLabel,
    });

  const saveProject = async () => {
    const name =
      projectName.trim() ||
      fields.url ||
      dynamic?.slug ||
      `${type} project`;
    setBusy("project");
    setMsg(null);
    try {
      const res = await fetch("/api/projects", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          name,
          kind: dynamicEnabled && dynamic ? "dynamic" : "static",
          contentType: type,
          fields,
          design: design(),
          dynamicSlug: dynamic?.slug ?? null,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Save failed.");
      setMsg(`Saved “${json.name}” to your projects.`);
      setProjectName("");
      trackEvent("project_save", { kind: json.kind });
    } catch (e) {
      setMsg(e instanceof Error ? e.message : "Save failed.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="mt-3 space-y-3 rounded-xl border border-[var(--brand)]/25 bg-[var(--brand)]/5 p-3">
      <p className="text-xs font-semibold text-[var(--brand-2)]">Pro tools</p>

      <div className="flex flex-col gap-2 sm:flex-row">
        <input
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          placeholder="Project name (optional)"
          className="input-field text-sm"
          maxLength={80}
        />
        <button
          onClick={saveProject}
          disabled={busy === "project"}
          className="btn-primary shrink-0 rounded-xl px-4 py-2 text-sm font-semibold disabled:opacity-60"
        >
          {busy === "project" ? "Saving…" : "Save project"}
        </button>
      </div>

      <div className="flex flex-wrap gap-2">
        <button
          disabled={Boolean(busy)}
          onClick={async () => {
            setBusy("4k");
            try {
              trackEvent("qr_download", { format: "png_4k", type });
              await downloadQr("png", style, data, frame, frameLabel, 2048);
            } finally {
              setBusy(null);
            }
          }}
          className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-xs font-medium transition hover:border-[var(--brand)] disabled:opacity-60"
        >
          4K PNG
        </button>
        <button
          disabled={Boolean(busy)}
          onClick={async () => {
            setBusy("pdf");
            try {
              trackEvent("qr_download", { format: "pdf", type });
              await downloadPrintPdf(style, data, frame, frameLabel);
            } finally {
              setBusy(null);
            }
          }}
          className="rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-1.5 text-xs font-medium transition hover:border-[var(--brand)] disabled:opacity-60"
        >
          Print PDF
        </button>
      </div>

      {msg && (
        <p
          className={`text-xs ${
            /fail|error|limit|pro/i.test(msg)
              ? "text-red-400"
              : "text-emerald-400"
          }`}
        >
          {msg}
        </p>
      )}
    </div>
  );
}
