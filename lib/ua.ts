export interface ParsedUa {
  device: "Mobile" | "Tablet" | "Desktop" | "Bot";
  os: string;
  browser: string;
}

/** Minimal, dependency-free user-agent parser for analytics buckets. */
export function parseUa(ua: string | null): ParsedUa {
  const s = ua ?? "";

  if (/bot|crawler|spider|crawling|preview|facebookexternalhit/i.test(s)) {
    return { device: "Bot", os: "Unknown", browser: "Bot" };
  }

  let device: ParsedUa["device"] = "Desktop";
  if (/iPad|Tablet|PlayBook|Silk/i.test(s)) device = "Tablet";
  else if (/Mobi|Android|iPhone|iPod|Windows Phone/i.test(s)) device = "Mobile";

  let os = "Unknown";
  if (/Windows/i.test(s)) os = "Windows";
  else if (/iPhone|iPad|iPod/i.test(s)) os = "iOS";
  else if (/Mac OS X/i.test(s)) os = "macOS";
  else if (/Android/i.test(s)) os = "Android";
  else if (/Linux/i.test(s)) os = "Linux";

  let browser = "Unknown";
  if (/Edg\//i.test(s)) browser = "Edge";
  else if (/OPR\/|Opera/i.test(s)) browser = "Opera";
  else if (/Chrome\//i.test(s) && !/Chromium/i.test(s)) browser = "Chrome";
  else if (/Firefox\//i.test(s)) browser = "Firefox";
  else if (/Safari\//i.test(s) && !/Chrome/i.test(s)) browser = "Safari";

  return { device, os, browser };
}
