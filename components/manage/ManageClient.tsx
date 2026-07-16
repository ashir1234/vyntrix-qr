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
  total: number;
  byDay: { date: string; count: number }[];
  byDevice: Bucket[];
  byBrowser: Bucket[];
  byOs: Bucket[];
  recent: ScanRow[];
}

const COLORS = ["#7c5cff", "#21d4fd", "#ff5cf0", "#00ffa3", "#ffb020"];

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
  const [saving, setSaving] = useState(false);
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
        {savedMsg && <p className="mt-2 text-sm text-emerald-400">{savedMsg}</p>}
      </div>

      {/* Scans over time */}
      <div className="glass rounded-2xl p-5">
        <h2 className="mb-3 font-semibold">Scans over time (30 days)</h2>
        <ResponsiveContainer width="100%" height={260}>
          <AreaChart data={data.byDay}>
            <defs>
              <linearGradient id="scanFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7c5cff" stopOpacity={0.6} />
                <stop offset="100%" stopColor="#7c5cff" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#23284d" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#9aa0c7", fontSize: 11 }}
              tickFormatter={(d: string) => d.slice(5)}
              interval="preserveStartEnd"
            />
            <YAxis allowDecimals={false} tick={{ fill: "#9aa0c7", fontSize: 11 }} />
            <Tooltip
              contentStyle={{
                background: "#0d1024",
                border: "1px solid #23284d",
                borderRadius: 12,
                color: "#eef0ff",
              }}
            />
            <Area
              type="monotone"
              dataKey="count"
              stroke="#7c5cff"
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
                tick={{ fill: "#9aa0c7", fontSize: 12 }}
                width={80}
              />
              <Tooltip
                cursor={{ fill: "rgba(124,92,255,0.1)" }}
                contentStyle={{
                  background: "#0d1024",
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
