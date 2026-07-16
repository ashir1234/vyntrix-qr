"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

interface Bucket {
  name: string;
  count: number;
}
interface ScanRow {
  ts: number;
  device: string | null;
  os: string | null;
  browser: string | null;
  country: string | null;
}
interface Analytics {
  slug: string;
  title: string | null;
  destination: string;
  createdAt: number;
  plan?: "free" | "pro";
  analyticsWindowDays?: number | null;
  csvExport?: boolean;
  customSlug?: boolean;
  total: number;
  byDay: { date: string; count: number }[];
  byDevice: Bucket[];
  byBrowser: Bucket[];
  byOs: Bucket[];
  recent: ScanRow[];
}

const COLORS = ["#10b981", "#38bdf8", "#f59e0b", "#14b8a6", "#0ea5e9"];

export function ManageClient({
  slug,
  initialToken,
}: {
  slug: string;
  initialToken: string;
}) {
  const [token, setToken] = useState(initialToken);
  const [tokenInput, setTokenInput] = useState(initialToken);
  const [data, setData] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [destination, setDestination] = useState("");
  const [slugInput, setSlugInput] = useState(slug);
  const [saving, setSaving] = useState(false);
  const [savingSlug, setSavingSlug] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);

  const load = useCallback(
    async (t: string) => {
      if (!t) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `/api/qr/${slug}/analytics?token=${encodeURIComponent(t)}`,
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Failed to load.");
        setData(json);
        setDestination(json.destination);
        setSlugInput(json.slug);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load.");
        setData(null);
      } finally {
        setLoading(false);
      }
    },
    [slug],
  );

  useEffect(() => {
    if (initialToken) load(initialToken);
  }, [initialToken, load]);

  const save = async () => {
    setSaving(true);
    setSavedMsg(null);
    try {
      const res = await fetch(`/api/qr/${slug}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ destination, editToken: token }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to update.");
      setSavedMsg("Saved! New scans now redirect to this URL.");
      if (data) setData({ ...data, destination: json.destination });
    } catch (e) {
      setSavedMsg(e instanceof Error ? e.message : "Failed to update.");
    } finally {
      setSaving(false);
    }
  };

  const saveSlug = async () => {
    setSavingSlug(true);
    setSavedMsg(null);
    try {
      const res = await fetch(`/api/qr/${slug}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          destination,
          customSlug: slugInput,
          editToken: token,
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to rename.");
      if (json.slug !== slug) {
        // Slug changed — jump to the new manage URL so bookmarks stay valid.
        window.location.href = json.manageUrl;
        return;
      }
      setSavedMsg("Short link updated.");
      if (data) setData({ ...data, slug: json.slug });
    } catch (e) {
      setSavedMsg(e instanceof Error ? e.message : "Failed to rename.");
    } finally {
      setSavingSlug(false);
    }
  };

  if (!token || (!data && !loading)) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <h1 className="text-2xl font-bold">Manage QR code</h1>
        <p className="mt-2 text-sm text-[var(--muted)]">
          Enter the edit token you received when you created{" "}
          <span className="font-mono">{slug}</span>.
        </p>
        <div className="mt-6 flex gap-2">
          <input
            value={tokenInput}
            onChange={(e) => setTokenInput(e.target.value)}
            placeholder="Edit token"
            className="input-field font-mono text-sm"
          />
          <button
            onClick={() => {
              setToken(tokenInput);
              load(tokenInput);
            }}
            className="btn-primary shrink-0 rounded-xl px-4 py-2 text-sm font-semibold"
          >
            Unlock
          </button>
        </div>
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      </div>
    );
  }

  if (loading || !data) {
    return (
      <div className="py-24 text-center text-[var(--muted)]">
        Loading analytics…
      </div>
    );
  }

  const stat = (label: string, value: string | number) => (
    <div className="glass rounded-2xl p-4">
      <p className="text-xs text-[var(--muted)]">{label}</p>
      <p className="mt-1 text-2xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {data.title || "QR analytics"}
          </h1>
          <p className="mt-1 text-sm text-[var(--muted)]">
            Code <span className="font-mono">{data.slug}</span> · created{" "}
            {new Date(data.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-4">
        {stat("Total scans", data.total)}
        {stat(
          "Last 7 days",
          data.byDay.slice(-7).reduce((a, b) => a + b.count, 0),
        )}
        {stat("Top device", data.byDevice[0]?.name ?? "—")}
        {stat("Top browser", data.byBrowser[0]?.name ?? "—")}
      </div>

      {/* Plan-aware toolbar: retention notice (free) / CSV export (pro) */}
      {data.plan === "free" && data.analyticsWindowDays ? (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm">
          <span className="text-[var(--muted)]">
            Showing the last {data.analyticsWindowDays} days. Upgrade to Pro for
            full history and CSV export.
          </span>
          <a
            href="/pricing"
            className="btn-primary shrink-0 rounded-lg px-4 py-1.5 text-xs font-semibold"
          >
            Upgrade to Pro
          </a>
        </div>
      ) : null}
      {data.csvExport ? (
        <div className="flex justify-end">
          <a
            href={`/api/qr/${slug}/export?token=${encodeURIComponent(token)}`}
            className="rounded-lg border border-[var(--border)] px-4 py-1.5 text-xs font-medium transition hover:border-[var(--brand)]"
          >
            Export CSV
          </a>
        </div>
      ) : null}

      {/* Editable destination */}
      <div className="glass rounded-2xl p-5">
        <h2 className="font-semibold">Destination URL</h2>
        <p className="mt-1 text-xs text-[var(--muted)]">
          Change where this QR code points. The code itself stays the same.
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="input-field"
            inputMode="url"
          />
          <button
            onClick={save}
            disabled={saving}
            className="btn-primary shrink-0 rounded-xl px-5 py-2 text-sm font-semibold disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save"}
          </button>
        </div>
      </div>

      {/* Custom short-link slug (Pro) */}
      {data.customSlug ? (
        <div className="glass rounded-2xl p-5">
          <h2 className="font-semibold">Custom short link</h2>
          <p className="mt-1 text-xs text-[var(--muted)]">
            Change the path of your short URL. Printed QR codes that already use
            the old link will stop working — update them if needed.
          </p>
          <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="flex min-w-0 flex-1 items-center gap-1.5">
              <span className="shrink-0 text-sm text-[var(--muted)]">/r/</span>
              <input
                value={slugInput}
                onChange={(e) => setSlugInput(e.target.value)}
                className="input-field font-mono text-sm"
                maxLength={32}
              />
            </div>
            <button
              onClick={saveSlug}
              disabled={savingSlug || slugInput.trim() === data.slug}
              className="btn-primary shrink-0 rounded-xl px-5 py-2 text-sm font-semibold disabled:opacity-60"
            >
              {savingSlug ? "Saving…" : "Update slug"}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[var(--border)] bg-[var(--surface-2)] px-4 py-3 text-sm">
          <span className="text-[var(--muted)]">
            Short link: <span className="font-mono">/r/{data.slug}</span> —
            upgrade to Pro for a custom slug like{" "}
            <span className="font-mono">/r/my-menu</span>.
          </span>
          <a
            href="/pricing"
            className="btn-primary shrink-0 rounded-lg px-4 py-1.5 text-xs font-semibold"
          >
            Upgrade to Pro
          </a>
        </div>
      )}

      {savedMsg && (
        <p
          className={`text-sm ${
            /fail|error|taken|reserved|must|pro feature/i.test(savedMsg)
              ? "text-red-400"
              : "text-emerald-400"
          }`}
        >
          {savedMsg}
        </p>
      )}

      {/* Scans over time */}
      <div className="glass rounded-2xl p-5">
        <h2 className="mb-3 font-semibold">
          Scans over time ({data.byDay.length} days)
        </h2>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data.byDay}>
            <defs>
              <linearGradient id="scanFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10b981" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#10b981" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#23284d" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#8fb5a8", fontSize: 11 }}
              tickFormatter={(d: string) => d.slice(5)}
              interval="preserveStartEnd"
            />
            <YAxis allowDecimals={false} tick={{ fill: "#8fb5a8", fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: "#15241f",
                border: "1px solid #23284d",
                borderRadius: 12,
                color: "#eef0ff",
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#10b981"
              strokeWidth={2}
              fill="url(#scanFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <h2 className="mb-3 font-semibold">Devices</h2>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={data.byDevice} layout="vertical">
              <XAxis type="number" hide allowDecimals={false} />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fill: "#8fb5a8", fontSize: 12 }}
                width={80}
              />
              <Tooltip
                cursor={{ fill: "rgba(124,92,255,0.1)" }}
                contentStyle={{
                  background: "#15241f",
                  border: "1px solid #23284d",
                  borderRadius: 12,
                  color: "#eef0ff",
                }}
              />
              <Bar dataKey="count" radius={[0, 6, 6, 0]}>
                {data.byDevice.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="glass rounded-2xl p-5">
          <h2 className="mb-3 font-semibold">Recent scans</h2>
          {data.recent.length === 0 ? (
            <p className="py-10 text-center text-sm text-[var(--muted)]">
              No scans yet. Share your code to see live activity here.
            </p>
          ) : (
            <ul className="max-h-[220px] space-y-2 overflow-auto pr-1 text-sm">
              {data.recent.map((s, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-[var(--border)] bg-[var(--surface-2)] px-3 py-2"
                >
                  <span>
                    {s.device ?? "Unknown"} · {s.browser ?? "?"}
                    {s.country ? ` · ${s.country}` : ""}
                  </span>
                  <span className="text-xs text-[var(--muted)]">
                    {new Date(s.ts).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
