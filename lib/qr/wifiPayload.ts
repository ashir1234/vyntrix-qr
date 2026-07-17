/** WiFi credentials stored on a dynamic landing-page QR code. */

export interface WifiPayload {
  ssid: string;
  password: string;
  encryption: "WPA" | "WEP" | "nopass";
  hidden: boolean;
}

export const WIFI_DESTINATION_SENTINEL = "vyntrix:wifi";

export function isWifiDestination(destination: string): boolean {
  return destination === WIFI_DESTINATION_SENTINEL || destination.startsWith("vyntrix:wifi");
}

export function sanitizeWifiPayload(raw: unknown): WifiPayload | null {
  if (!raw || typeof raw !== "object") return null;
  const o = raw as Record<string, unknown>;
  const ssid = typeof o.ssid === "string" ? o.ssid.trim() : "";
  if (!ssid || ssid.length > 64) return null;
  const encryption =
    o.encryption === "WEP" || o.encryption === "nopass" || o.encryption === "WPA"
      ? o.encryption
      : "WPA";
  const password =
    typeof o.password === "string" ? o.password.slice(0, 128) : "";
  if (encryption !== "nopass" && !password) return null;
  return {
    ssid,
    password: encryption === "nopass" ? "" : password,
    encryption,
    hidden: Boolean(o.hidden),
  };
}

export function wifiPayloadToJson(p: WifiPayload): string {
  return JSON.stringify(p);
}

export function parseWifiPayloadJson(
  raw: string | null | undefined,
): WifiPayload | null {
  if (!raw) return null;
  try {
    return sanitizeWifiPayload(JSON.parse(raw));
  } catch {
    return null;
  }
}

/** WIFI: string for optional secondary “join network” QR on the landing page. */
export function buildWifiJoinString(p: WifiPayload): string {
  const esc = (s: string) =>
    s.replace(/\\/g, "\\\\").replace(/;/g, "\\;").replace(/,/g, "\\,").replace(/:/g, "\\:");
  const parts = [
    `T:${p.encryption}`,
    `S:${esc(p.ssid)}`,
    p.encryption !== "nopass" ? `P:${esc(p.password)}` : "",
    p.hidden ? "H:true" : "",
  ].filter(Boolean);
  return `WIFI:${parts.join(";")};`;
}
