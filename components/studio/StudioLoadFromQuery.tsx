"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQrStore } from "@/lib/store";
import { sanitizeDesign, type SavedQrDesign } from "@/lib/qr/design";
import type { DynamicResult } from "@/lib/store";
import type { QrContentType, QrFields } from "@/lib/qr/types";

/**
 * Loads a dynamic code (?load=&token=) or a saved project (?project=1) into
 * Studio after localStorage rehydration.
 */
export function StudioLoadFromQuery() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const hasHydrated = useQrStore((s) => s._hasHydrated);
  const applySavedDesign = useQrStore((s) => s.applySavedDesign);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">(
    "idle",
  );
  const [message, setMessage] = useState<string | null>(null);
  const ranFor = useRef<string | null>(null);

  useEffect(() => {
    if (!hasHydrated) return;

    // Saved project from dashboard
    if (searchParams.get("project") === "1") {
      const key = "project:session";
      if (ranFor.current === key) return;
      ranFor.current = key;
      setStatus("loading");
      try {
        const raw = sessionStorage.getItem("vyntrix_load_project");
        sessionStorage.removeItem("vyntrix_load_project");
        if (!raw) throw new Error("No project payload found.");
        const payload = JSON.parse(raw) as {
          type?: QrContentType;
          fields?: Partial<QrFields>;
          design?: unknown;
          dynamicSlug?: string | null;
          kind?: string;
        };
        const design = sanitizeDesign(payload.design);
        if (!design) throw new Error("Project has no valid design.");

        applySavedDesign(design, {
          destination:
            typeof payload.fields?.url === "string"
              ? payload.fields.url
              : undefined,
        });
        useQrStore.setState((s) => ({
          type: payload.type ?? s.type,
          fields: { ...s.fields, ...(payload.fields ?? {}) },
          dynamicEnabled: payload.kind === "dynamic",
        }));
        setMessage("Project loaded into Studio.");
        setStatus("done");
        router.replace("/studio", { scroll: false });
      } catch (e) {
        setStatus("error");
        setMessage(e instanceof Error ? e.message : "Failed to load project.");
      }
      return;
    }

    const slug = searchParams.get("load");
    const token = searchParams.get("token");
    if (!slug || !token) return;
    const key = `${slug}:${token}`;
    if (ranFor.current === key) return;
    ranFor.current = key;

    let active = true;
    setStatus("loading");
    setMessage(null);

    (async () => {
      try {
        const res = await fetch(
          `/api/qr/${encodeURIComponent(slug)}?token=${encodeURIComponent(token)}`,
        );
        const json = await res.json();
        if (!res.ok) throw new Error(json.error ?? "Could not load code.");
        if (!active) return;

        const design: SavedQrDesign | null = sanitizeDesign(json.design);

        if (!design) {
          applySavedDesign(
            {
              style: useQrStore.getState().style,
              material: useQrStore.getState().material,
              sceneMode: useQrStore.getState().sceneMode,
              view2dMode: useQrStore.getState().view2dMode,
              frame: useQrStore.getState().frame,
              frameLabel: useQrStore.getState().frameLabel,
            },
            {
              destination: json.destination,
              dynamic: toDynamic(json),
            },
          );
          setMessage(
            "Link loaded. This code has no saved design yet — style it and tap Save design.",
          );
        } else {
          applySavedDesign(design, {
            destination: json.destination,
            dynamic: toDynamic(json),
          });
          setMessage(`Loaded design for /r/${json.slug}`);
        }
        setStatus("done");
        router.replace("/studio", { scroll: false });
      } catch (e) {
        if (!active) return;
        setStatus("error");
        setMessage(e instanceof Error ? e.message : "Failed to load code.");
      }
    })();

    return () => {
      active = false;
    };
  }, [searchParams, hasHydrated, applySavedDesign, router]);

  if (status === "idle" || (!message && status !== "loading")) return null;

  return (
    <div
      className={`mx-auto mb-4 w-[min(1200px,95vw)] rounded-xl border px-4 py-2.5 text-sm ${
        status === "error"
          ? "border-red-500/40 bg-red-500/10 text-red-300"
          : "border-[var(--brand)]/30 bg-[var(--brand)]/10 text-[var(--brand-2)]"
      }`}
    >
      {status === "loading" ? "Loading…" : message}
    </div>
  );
}

function toDynamic(json: {
  slug: string;
  shortUrl: string;
  manageUrl: string;
  editToken: string;
  destination: string;
}): DynamicResult {
  return {
    slug: json.slug,
    shortUrl: json.shortUrl,
    manageUrl: json.manageUrl,
    editToken: json.editToken,
    destination: json.destination,
  };
}
