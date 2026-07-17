"use client";

import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";
import { authEnabled } from "@/lib/authFlags";
import { switchStudioStorage, useQrStore } from "@/lib/store";

/**
 * Keeps Studio design state in localStorage, keyed per Clerk user so each
 * account restores its own last design. Guests share a guest bucket.
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
  useEffect(() => {
    if (!isLoaded) return;
    switchStudioStorage(userId);
  }, [isLoaded, userId]);
  return null;
}

/** True once zustand has finished reading from localStorage. */
export function useStudioHydrated() {
  return useQrStore((s) => s._hasHydrated);
}
