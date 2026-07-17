"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { useQrStore } from "@/lib/store";
import { sanitizeDesign, type SavedQrDesign } from "@/lib/qr/design";
import type { DynamicResult } from "@/lib/store";

/**
 * When opened as /studio?load=slug&token=…, fetch that code's design from the
 * DB and restore it into the Studio store (after localStorage rehydration).
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
    const slug = searchParams.get("load");
    const token = searchParams.get("token");
    if (!slug || !token || !hasHydrated) return;
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
          // Legacy code with no saved look — still restore destination/link.
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
        // Drop query params so a refresh doesn't re-apply over newer edits.
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
      {status === "loading" ? "Loading saved design…" : message}
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
