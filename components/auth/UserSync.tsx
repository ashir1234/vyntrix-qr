"use client";

import { useEffect, useRef } from "react";
import { useAuth } from "@clerk/nextjs";
import { authEnabled } from "@/lib/authFlags";

/**
 * When a user is signed in, ping /api/me once so we store/refresh their row
 * in Turso (email, name, last_seen_at) for record keeping.
 */
export function UserSync() {
  if (!authEnabled) return null;
  return <UserSyncInner />;
}

function UserSyncInner() {
  const { isLoaded, userId } = useAuth();
  const lastSynced = useRef<string | null>(null);

  useEffect(() => {
    if (!isLoaded || !userId) return;
    if (lastSynced.current === userId) return;
    lastSynced.current = userId;

    void fetch("/api/me", { method: "POST" }).catch(() => {
      /* non-blocking record-keeping */
    });
  }, [isLoaded, userId]);

  return null;
}
