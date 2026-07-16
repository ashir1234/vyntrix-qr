"use client";

import { useState } from "react";
import { useQrStore, type DynamicResult } from "@/lib/store";
import { Toggle } from "@/components/ui/controls";

function saveCodeLocally(r: DynamicResult) {
  try {
    const raw = localStorage.getItem("vyntrix_codes");
    const list: DynamicResult[] = raw ? JSON.parse(raw) : [];
    const next = [r, ...list.filter((c) => c.slug !== r.slug)].slice(0, 50);
    localStorage.setItem("vyntrix_codes", JSON.stringify(next));
  } catch {
    /* storage unavailable */
  }
}

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked */
    }
  };
  return (
    <div>
      <p className="mb-1 text-xs font-medium text-[var(--muted)]">{label}</p>
      <div className="flex items-center gap-2">
        <input
          readOnly
          value={value}
          className="input-field font-mono text-xs"
          onFocus={(e) => e.target.select()}
        />
        <button
          onClick={copy}
          className="shrink-0 rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2 text-xs font-medium transition hover:border-[var(--brand)]"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export function DynamicPanel() {
  const dynamicEnabled = useQrStore((s) => s.dynamicEnabled);
  const setDynamicEnabled = useQrStore((s) => s.setDynamicEnabled);
  const dynamic = useQrStore((s) => s.dynamic);
  const setDynamic = useQrStore((s) => s.setDynamic);
  const url = useQrStore((s) => s.fields.url);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const create = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/qr", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ destination: url }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to create link.");
      const result: DynamicResult = {
        slug: json.slug,
        shortUrl: json.shortUrl,
        manageUrl: json.manageUrl,
        editToken: json.editToken,
        destination: json.destination,
      };
      setDynamic(result);
      saveCodeLocally(result);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const update = async () => {
    if (!dynamic) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/qr/${dynamic.slug}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ destination: url, editToken: dynamic.editToken }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to update.");
      setDynamic({ ...dynamic, destination: json.destination });
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setDynamic(null);
    setError(null);
  };

  const destinationChanged = dynamic ? url !== dynamic.destination : false;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium">Dynamic QR</p>
          <p className="mt-0.5 text-xs text-[var(--muted)]">
            Editable destination + scan analytics. The printed code never
            changes.
          </p>
        </div>
        <Toggle
          label="Enable dynamic QR"
          checked={dynamicEnabled}
          onChange={setDynamicEnabled}
        />
      </div>

      {dynamicEnabled && (
        <div className="mt-3 space-y-3">
          {!dynamic ? (
            <>
              <p className="text-xs text-[var(--muted)]">
                Generates a short link that redirects to your URL. You can change
                where it points anytime — no reprinting.
              </p>
              <button
                onClick={create}
                disabled={loading}
                className="btn-primary w-full rounded-xl py-2 text-sm font-semibold disabled:opacity-60"
              >
                {loading ? "Creating…" : "Create dynamic link"}
              </button>
            </>
          ) : (
            <>
              <CopyRow label="Short link (encoded in QR)" value={dynamic.shortUrl} />
              <CopyRow label="Manage & analytics link" value={dynamic.manageUrl} />
              <div className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-2">
                <p className="text-[11px] text-amber-300/90">
                  Save your edit token — it&apos;s the only way to edit this code
                  or view its analytics.
                </p>
                <input
                  readOnly
                  value={dynamic.editToken}
                  onFocus={(e) => e.target.select()}
                  className="input-field mt-1.5 font-mono text-[11px]"
                />
              </div>

              {destinationChanged && (
                <button
                  onClick={update}
                  disabled={loading}
                  className="btn-primary w-full rounded-xl py-2 text-sm font-semibold disabled:opacity-60"
                >
                  {loading ? "Updating…" : "Update destination"}
                </button>
              )}
              {saved && (
                <p className="text-xs text-emerald-400">Destination updated.</p>
              )}

              <div className="flex gap-2">
                <a
                  href={dynamic.manageUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 rounded-xl border border-[var(--border)] py-2 text-center text-xs font-medium transition hover:border-[var(--brand)]"
                >
                  Open analytics
                </a>
                <button
                  onClick={reset}
                  className="rounded-xl border border-[var(--border)] px-3 py-2 text-xs text-[var(--muted)] transition hover:text-white"
                >
                  New link
                </button>
              </div>
            </>
          )}

          {error && <p className="text-xs text-red-400">{error}</p>}
        </div>
      )}
    </div>
  );
}
