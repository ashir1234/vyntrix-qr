"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useQrStore, type DynamicResult } from "@/lib/store";
import { snapshotDesign } from "@/lib/qr/design";
import { Toggle } from "@/components/ui/controls";
import { trackEvent } from "@/lib/analytics";
import { authEnabled } from "@/lib/authFlags";

function currentDesignSnapshot() {
  const s = useQrStore.getState();
  return snapshotDesign({
    style: s.style,
    material: s.material,
    sceneMode: s.sceneMode,
    view2dMode: s.view2dMode,
    frame: s.frame,
    frameLabel: s.frameLabel,
  });
}

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
  const type = useQrStore((s) => s.type);
  const dynamicEnabled = useQrStore((s) => s.dynamicEnabled);
  const setDynamicEnabled = useQrStore((s) => s.setDynamicEnabled);
  const dynamic = useQrStore((s) => s.dynamic);
  const setDynamic = useQrStore((s) => s.setDynamic);
  const url = useQrStore((s) => s.fields.url);
  const wifiSsid = useQrStore((s) => s.fields.wifiSsid);
  const wifiPassword = useQrStore((s) => s.fields.wifiPassword);
  const wifiEncryption = useQrStore((s) => s.fields.wifiEncryption);
  const wifiHidden = useQrStore((s) => s.fields.wifiHidden);

  const isWifi = type === "wifi";

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errorCode, setErrorCode] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [isPro, setIsPro] = useState(false);
  const [customSlug, setCustomSlug] = useState("");

  useEffect(() => {
    if (!authEnabled) return;
    let active = true;
    fetch("/api/billing/plan")
      .then((r) => (r.ok ? r.json() : null))
      .then((j) => {
        if (active && j?.plan === "pro") setIsPro(true);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  // Switching content type clears an incompatible dynamic link.
  useEffect(() => {
    if (!dynamic) return;
    // Keep dynamic across url↔wifi only if user recreates; safer to reset label.
  }, [type, dynamic]);

  const wifiPayload = () => ({
    ssid: wifiSsid,
    password: wifiPassword,
    encryption: wifiEncryption,
    hidden: wifiHidden,
  });

  const create = async () => {
    if (isWifi && !isPro) {
      setError("Dynamic WiFi pages with scan tracking are a Pro feature.");
      setErrorCode("upgrade_required");
      return;
    }
    setLoading(true);
    setError(null);
    setErrorCode(null);
    try {
      const res = await fetch("/api/qr", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          contentType: isWifi ? "wifi" : "url",
          design: currentDesignSnapshot(),
          ...(isWifi
            ? { wifi: wifiPayload(), title: wifiSsid }
            : { destination: url }),
          ...(isPro && customSlug.trim()
            ? { customSlug: customSlug.trim() }
            : {}),
        }),
      });
      const json = await res.json();
      if (!res.ok) {
        setErrorCode(json.code ?? null);
        throw new Error(json.error ?? "Failed to create link.");
      }
      const result: DynamicResult = {
        slug: json.slug,
        shortUrl: json.shortUrl,
        manageUrl: json.manageUrl,
        editToken: json.editToken,
        destination: json.destination,
      };
      setDynamic(result);
      saveCodeLocally(result);
      trackEvent("dynamic_create", {
        slug: result.slug,
        contentType: isWifi ? "wifi" : "url",
      });
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
        body: JSON.stringify({
          editToken: dynamic.editToken,
          design: currentDesignSnapshot(),
          ...(isWifi
            ? { wifi: wifiPayload(), title: wifiSsid }
            : { destination: url }),
        }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error ?? "Failed to update.");
      setDynamic({ ...dynamic, destination: json.destination });
      setSaved(true);
      setTimeout(() => setSaved(false), 1500);
      trackEvent("dynamic_design_save", { slug: dynamic.slug });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setDynamic(null);
    setCustomSlug("");
    setError(null);
  };

  const destinationChanged = dynamic
    ? isWifi
      ? true // always allow "save wifi & design" — we don't fingerprint wifi in store
      : url !== dynamic.destination
    : false;

  return (
    <div className="rounded-xl border border-[var(--border)] bg-[var(--surface-2)] p-3">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium">
            {isWifi ? "Dynamic WiFi page" : "Dynamic QR"}
          </p>
          <p className="mt-0.5 text-xs text-[var(--muted)]">
            {isWifi
              ? "Short link opens a page with WiFi details. Track how many people open it (not whether they joined)."
              : "Editable destination + scan analytics. The printed code never changes."}
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
                {isWifi
                  ? "Creates a short link to a WiFi landing page. Guests see SSID + password; you see scan analytics."
                  : "Generates a short link that redirects to your URL. You can change where it points anytime — no reprinting."}
              </p>

              {isWifi && !isPro && authEnabled ? (
                <p className="text-[11px] text-[var(--muted)]">
                  Dynamic WiFi pages are Pro.{" "}
                  <Link
                    href="/pricing"
                    className="text-[var(--brand-2)] underline"
                  >
                    Upgrade
                  </Link>{" "}
                  to track opens — or leave this off for a static WiFi QR.
                </p>
              ) : null}

              {isPro ? (
                <div>
                  <label className="mb-1 block text-xs font-medium text-[var(--muted)]">
                    Custom short link{" "}
                    <span className="opacity-60">(optional)</span>
                  </label>
                  <div className="flex items-center gap-1.5">
                    <span className="shrink-0 text-xs text-[var(--muted)]">
                      /r/
                    </span>
                    <input
                      value={customSlug}
                      onChange={(e) => setCustomSlug(e.target.value)}
                      placeholder={isWifi ? "cafe-wifi" : "my-menu"}
                      className="input-field font-mono text-xs"
                      maxLength={32}
                    />
                  </div>
                </div>
              ) : authEnabled && !isWifi ? (
                <p className="text-[11px] text-[var(--muted)]">
                  Want a branded link like{" "}
                  <span className="font-mono">/r/my-menu</span>?{" "}
                  <Link
                    href="/pricing"
                    className="text-[var(--brand-2)] underline"
                  >
                    Upgrade to Pro
                  </Link>
                  .
                </p>
              ) : null}

              <button
                onClick={create}
                disabled={loading || (isWifi && !isPro)}
                className="btn-primary w-full rounded-xl py-2 text-sm font-semibold disabled:opacity-60"
              >
                {loading
                  ? "Creating…"
                  : isWifi
                    ? "Create WiFi page link"
                    : "Create dynamic link"}
              </button>
            </>
          ) : (
            <>
              <CopyRow label="Short link (encoded in QR)" value={dynamic.shortUrl} />
              <CopyRow label="Manage & analytics link" value={dynamic.manageUrl} />
              {isWifi && (
                <p className="text-[11px] text-[var(--muted)]">
                  Guests land on{" "}
                  <span className="font-mono">/wifi/{dynamic.slug}</span> after
                  the short link.
                </p>
              )}
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

              {(!isWifi && destinationChanged) || isWifi ? (
                <button
                  onClick={() => update()}
                  disabled={loading}
                  className="btn-primary w-full rounded-xl py-2 text-sm font-semibold disabled:opacity-60"
                >
                  {loading
                    ? "Saving…"
                    : isWifi
                      ? "Update WiFi details & design"
                      : destinationChanged
                        ? "Update destination & design"
                        : "Save current design to this link"}
                </button>
              ) : (
                <button
                  onClick={() => update()}
                  disabled={loading}
                  className="w-full rounded-xl border border-[var(--border)] py-2 text-sm font-medium transition hover:border-[var(--brand)] disabled:opacity-60"
                >
                  {loading ? "Saving…" : "Save current design to this link"}
                </button>
              )}
              {saved && (
                <p className="text-xs text-emerald-400">Saved to your account.</p>
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
                  className="rounded-xl border border-[var(--border)] px-3 py-2 text-xs text-[var(--muted)] transition hover:text-[var(--foreground)]"
                >
                  New link
                </button>
              </div>
            </>
          )}

          {error && (
            <div className="space-y-2">
              <p className="text-xs text-red-400">{error}</p>
              {errorCode === "auth_required" && (
                <Link
                  href="/sign-in"
                  className="btn-primary inline-block rounded-lg px-3.5 py-1.5 text-xs font-semibold"
                >
                  Sign in to continue
                </Link>
              )}
              {(errorCode === "quota_exceeded" ||
                errorCode === "upgrade_required") && (
                <Link
                  href="/pricing"
                  className="btn-primary inline-block rounded-lg px-3.5 py-1.5 text-xs font-semibold"
                >
                  Upgrade to Pro
                </Link>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
