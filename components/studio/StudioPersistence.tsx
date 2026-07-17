"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { authEnabled } from "@/lib/authFlags";
import { switchStudioStorage, useQrStore } from "@/lib/store";
import { snapshotDesign } from "@/lib/qr/design";
import type { StudioCloudState } from "@/lib/qr/studioCloud";

/**
 * Keeps Studio design state in localStorage, keyed per Clerk user.
 * Pro users also sync the latest snapshot to Turso for cross-device restore.
 */
export function StudioPersistence() {
  if (!authEnabled) return <GuestHydration />;
  return <AuthedHydration />;
}

function GuestHydration() {
  useEffect(() => {
    switchStudioStorage(null);
  }, []);
  return null;
}

function AuthedHydration() {
  const { isLoaded, userId } = useAuth();
  const hasHydrated = useQrStore((s) => s._hasHydrated);
  const cloudEnabled = useRef(false);
  const pulled = useRef(false);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const applyingCloud = useRef(false);

  useEffect(() => {
    if (!isLoaded) return;
    pulled.current = false;
    cloudEnabled.current = false;
    switchStudioStorage(userId);
  }, [isLoaded, userId]);

  // Pull cloud state once after local rehydrate (Pro only).
  useEffect(() => {
    if (!userId || !hasHydrated || pulled.current) return;
    pulled.current = true;

    let active = true;
    (async () => {
      try {
        const res = await fetch("/api/studio/sync");
        if (!active) return;
        if (res.status === 402) {
          cloudEnabled.current = false;
          return;
        }
        if (!res.ok) return;
        cloudEnabled.current = true;

        const json = (await res.json()) as {
          state: StudioCloudState | null;
          updatedAt: number | null;
        };
        if (!json.state) return;

        const localUpdated = readLocalUpdatedAt(userId);
        const cloudUpdated = json.state.updatedAt ?? json.updatedAt ?? 0;
        if (cloudUpdated >= localUpdated) {
          applyingCloud.current = true;
          applyCloudState(json.state);
          writeLocalUpdatedAt(userId, cloudUpdated);
          queueMicrotask(() => {
            applyingCloud.current = false;
          });
        }
      } catch {
        /* offline */
      }
    })();

    return () => {
      active = false;
    };
  }, [userId, hasHydrated]);

  // Debounced push of studio changes to the cloud (Pro).
  useEffect(() => {
    if (!userId || !hasHydrated) return;

    const unsub = useQrStore.subscribe(() => {
      if (!cloudEnabled.current || applyingCloud.current) return;
      if (saveTimer.current) clearTimeout(saveTimer.current);
      saveTimer.current = setTimeout(() => {
        void pushCloud(userId, cloudEnabled);
      }, 1500);
    });

    return () => {
      unsub();
      if (saveTimer.current) clearTimeout(saveTimer.current);
    };
  }, [userId, hasHydrated]);

  return null;
}

function applyCloudState(state: StudioCloudState) {
  useQrStore.getState().applySavedDesign(state.design, {
    destination:
      typeof state.fields.url === "string" ? state.fields.url : undefined,
  });
  useQrStore.setState((s) => ({
    type: state.type,
    fields: { ...s.fields, ...state.fields },
    dynamicEnabled: state.dynamicEnabled ?? s.dynamicEnabled,
    frameLabel: state.frameLabel ?? state.design.frameLabel,
  }));
}

async function pushCloud(
  userId: string,
  cloudEnabled: { current: boolean },
) {
  const s = useQrStore.getState();
  const updatedAt = Date.now();
  const payload: StudioCloudState = {
    updatedAt,
    type: s.type,
    fields: s.fields,
    design: snapshotDesign({
      style: s.style,
      material: s.material,
      sceneMode: s.sceneMode,
      view2dMode: s.view2dMode,
      frame: s.frame,
      frameLabel: s.frameLabel,
    }),
    dynamicEnabled: s.dynamicEnabled,
    frameLabel: s.frameLabel,
  };

  try {
    const res = await fetch("/api/studio/sync", {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.status === 402) {
      cloudEnabled.current = false;
      return;
    }
    if (res.ok) writeLocalUpdatedAt(userId, updatedAt);
  } catch {
    /* ignore */
  }
}

function readLocalUpdatedAt(userId: string): number {
  try {
    const v = localStorage.getItem(`vyntrix_studio_cloud_ts_${userId}`);
    return v ? Number(v) || 0 : 0;
  } catch {
    return 0;
  }
}

function writeLocalUpdatedAt(userId: string, ts: number) {
  try {
    localStorage.setItem(`vyntrix_studio_cloud_ts_${userId}`, String(ts));
  } catch {
    /* ignore */
  }
}

/** True once zustand has finished reading from localStorage. */
export function useStudioHydrated() {
  return useQrStore((s) => s._hasHydrated);
}
