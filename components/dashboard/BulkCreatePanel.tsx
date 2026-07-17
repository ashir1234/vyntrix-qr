"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useQrStore } from "@/lib/store";
import { snapshotDesign } from "@/lib/qr/design";
import { trackEvent } from "@/lib/analytics";

type ParsedRow = {
  destination: string;
  title?: string;
  customSlug?: string;
};

function parseCsv(text: string): ParsedRow[] {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter(Boolean);
  if (lines.length === 0) return [];

  const split = (line: string) => {
    const cells: string[] = [];
    let cur = "";
    let inQuotes = false;
    for (let i = 0; i < line.length; i++) {
      const ch = line[i];
      if (ch === '"') {
        inQuotes = !inQuotes;
        continue;
      }
      if (ch === "," && !inQuotes) {
        cells.push(cur.trim());
        cur = "";
        continue;
      }
      cur += ch;
    }
    cells.push(cur.trim());
    return cells;
  };

  const header = split(lines[0]).map((h) => h.toLowerCase());
  const hasHeader =
    header.includes("destination") ||
    header.includes("url") ||
    header.includes("title");

  const rows: ParsedRow[] = [];
  const start = hasHeader ? 1 : 0;
  const destIdx = hasHeader
    ? Math.max(header.indexOf("destination"), header.indexOf("url"), 0)
    : 0;
  const titleIdx = hasHeader ? header.indexOf("title") : 1;
  const slugIdx = hasHeader
    ? Math.max(header.indexOf("slug"), header.indexOf("customslug"))
    : 2;

  for (let i = start; i < lines.length; i++) {
    const cells = split(lines[i]);
    const destination = cells[destIdx] ?? "";
    if (!destination) continue;
    rows.push({
      destination,
      title:
        titleIdx >= 0 && cells[titleIdx] ? cells[titleIdx] : undefined,
      customSlug:
        slugIdx >= 0 && cells[slugIdx] ? cells[slugIdx] : undefined,
    });
  }
  return rows;
}

export function BulkCreatePanel({
  isPro,
  maxBulkRows,
}: {
  isPro: boolean;
  maxBulkRows: number;
}) {
  const router = useRouter();
  const [text, setText] = useState(
    "destination,title,slug\nhttps://example.com/menu,Lunch menu,lunch-menu\nhttps://example.com/wifi,Wi‑Fi card,",
  );
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<string | null>(null);

  if (!isPro) {
    return (
      <div className="glass rounded-2xl p-5">
        <h2 className="font-semibold">Bulk create</h2>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Create many dynamic QR codes from a CSV in one go.{" "}
          <Link href="/pricing" className="text-[var(--brand-2)] underline">
            Upgrade to Pro
          </Link>
        </p>
      </div>
    );
  }

  const run = async () => {
    const rows = parseCsv(text).slice(0, maxBulkRows);
    if (rows.length === 0) {
      setResult("No valid rows found. Need a destination/url column.");
      return;
    }
    setBusy(true);
    setResult(null);
    try {
      const s = useQrStore.getState();
      const design = snapshotDesign({
        style: s.style,
        material: s.material,
        sceneMode: s.sceneMode,
        view2dMode: s.view2dMode,
        frame: s.frame,
        frameLabel: s.frameLabel,
      });
      const res = await fetch("/api/qr/bulk", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ rows, design }),
      });
      const json = await res.json();
      if (!res.ok && !json.createdCount) {
        throw new Error(json.error ?? "Bulk create failed.");
      }
      const created = json.createdCount ?? 0;
      const failed = (json.errors ?? []).length;
      setResult(
        `Created ${created} code${created === 1 ? "" : "s"}${
          failed ? `, ${failed} failed` : ""
        }.`,
      );
      trackEvent("bulk_create", { created, failed });
      if (created > 0) router.refresh();
    } catch (e) {
      setResult(e instanceof Error ? e.message : "Bulk create failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="glass rounded-2xl p-5">
      <h2 className="font-semibold">Bulk create</h2>
      <p className="mt-1 text-xs text-[var(--muted)]">
        Paste CSV with columns <span className="font-mono">destination</span>{" "}
        (required), <span className="font-mono">title</span>,{" "}
        <span className="font-mono">slug</span>. Uses your current Studio
        design. Max {maxBulkRows} rows.
      </p>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={6}
        className="input-field mt-3 font-mono text-xs"
      />
      <button
        onClick={run}
        disabled={busy}
        className="btn-primary mt-3 rounded-xl px-5 py-2 text-sm font-semibold disabled:opacity-60"
      >
        {busy ? "Creating…" : "Create dynamic codes"}
      </button>
      {result && (
        <p
          className={`mt-2 text-sm ${
            /fail|error|invalid|quota/i.test(result)
              ? "text-red-400"
              : "text-emerald-400"
          }`}
        >
          {result}
        </p>
      )}
    </div>
  );
}
