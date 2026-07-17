"use client";

import { useState } from "react";
import { StaticQr } from "@/components/gallery/StaticQr";
import {
  buildWifiJoinString,
  type WifiPayload,
} from "@/lib/qr/wifiPayload";
import { defaultSavedDesign } from "@/lib/qr/design";

export function WifiLandingClient({
  title,
  wifi,
}: {
  title: string;
  wifi: WifiPayload;
}) {
  const [copied, setCopied] = useState<"ssid" | "password" | null>(null);
  const joinString = buildWifiJoinString(wifi);
  const style = defaultSavedDesign().style;

  const copy = async (kind: "ssid" | "password", value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard blocked */
    }
  };

  return (
    <div className="glass rounded-3xl p-6 text-center">
      <p className="text-xs font-medium uppercase tracking-wide text-[var(--muted)]">
        WiFi network
      </p>
      <h1 className="mt-1 text-2xl font-bold tracking-tight">{title}</h1>
      <p className="mt-2 text-sm text-[var(--muted)]">
        Connect using the details below. Scan analytics count page opens — not
        whether you joined the network.
      </p>

      <div className="mt-6 space-y-3 text-left">
        <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-3">
          <p className="text-[11px] text-[var(--muted)]">Network name (SSID)</p>
          <div className="mt-1 flex items-center justify-between gap-2">
            <p className="font-mono text-sm font-semibold">{wifi.ssid}</p>
            <button
              type="button"
              onClick={() => copy("ssid", wifi.ssid)}
              className="shrink-0 rounded-lg border border-[var(--border)] px-2.5 py-1 text-xs font-medium transition hover:border-[var(--brand)]"
            >
              {copied === "ssid" ? "Copied" : "Copy"}
            </button>
          </div>
        </div>

        {wifi.encryption !== "nopass" && (
          <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-3">
            <p className="text-[11px] text-[var(--muted)]">Password</p>
            <div className="mt-1 flex items-center justify-between gap-2">
              <p className="break-all font-mono text-sm font-semibold">
                {wifi.password}
              </p>
              <button
                type="button"
                onClick={() => copy("password", wifi.password)}
                className="shrink-0 rounded-lg border border-[var(--border)] px-2.5 py-1 text-xs font-medium transition hover:border-[var(--brand)]"
              >
                {copied === "password" ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        )}

        <p className="text-[11px] text-[var(--muted)]">
          Security: {wifi.encryption === "nopass" ? "Open" : wifi.encryption}
          {wifi.hidden ? " · Hidden network" : ""}
        </p>
      </div>

      <div className="mx-auto mt-6 w-fit overflow-hidden rounded-2xl border border-[var(--border)] bg-white p-3">
        <StaticQr data={joinString} style={style} size={180} />
      </div>
      <p className="mt-2 text-[11px] text-[var(--muted)]">
        Prefer one-tap join? Scan this smaller WiFi QR with your camera.
      </p>
    </div>
  );
}
