"use client";

import { useEffect } from "react";
import { siteConfig } from "@/lib/site";

const SCRIPT_ID = "adsbygoogle-js";

/**
 * Loads the AdSense library once via a plain <script> tag.
 * Avoids next/script's `data-nscript` attribute, which AdSense rejects.
 */
export function AdSenseScript() {
  const client = siteConfig.adsenseClient;

  useEffect(() => {
    if (!client) return;
    if (document.getElementById(SCRIPT_ID)) return;

    const s = document.createElement("script");
    s.id = SCRIPT_ID;
    s.async = true;
    s.crossOrigin = "anonymous";
    s.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`;
    document.body.appendChild(s);
  }, [client]);

  return null;
}
