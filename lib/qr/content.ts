import type { QrContentType, QrFields } from "./types";

function escapeWifi(value: string): string {
  return value.replace(/([\\;,:"])/g, "\\$1");
}

/**
 * Framework-agnostic: turn structured fields into the raw string that gets
 * encoded into the QR. Kept pure so it can be unit-tested and reused server-side.
 */
export function buildQrData(type: QrContentType, f: QrFields): string {
  switch (type) {
    case "url":
      return f.url.trim();

    case "text":
      return f.text;

    case "wifi": {
      const parts = [
        `T:${f.wifiEncryption}`,
        `S:${escapeWifi(f.wifiSsid)}`,
        f.wifiEncryption !== "nopass"
          ? `P:${escapeWifi(f.wifiPassword)}`
          : "",
        f.wifiHidden ? "H:true" : "",
      ].filter(Boolean);
      return `WIFI:${parts.join(";")};;`;
    }

    case "vcard": {
      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${f.vcLastName};${f.vcFirstName};;;`,
        `FN:${`${f.vcFirstName} ${f.vcLastName}`.trim()}`,
        f.vcOrg ? `ORG:${f.vcOrg}` : "",
        f.vcTitle ? `TITLE:${f.vcTitle}` : "",
        f.vcPhone ? `TEL;TYPE=CELL:${f.vcPhone}` : "",
        f.vcEmail ? `EMAIL:${f.vcEmail}` : "",
        f.vcUrl ? `URL:${f.vcUrl}` : "",
        "END:VCARD",
      ].filter(Boolean);
      return lines.join("\n");
    }

    case "email": {
      const params = new URLSearchParams();
      if (f.emailSubject) params.set("subject", f.emailSubject);
      if (f.emailBody) params.set("body", f.emailBody);
      const query = params.toString();
      return `mailto:${f.emailTo}${query ? `?${query}` : ""}`;
    }

    case "sms":
      return `SMSTO:${f.smsTo}:${f.smsBody}`;

    case "phone":
      return `tel:${f.phoneNumber}`;

    default:
      return "";
  }
}

export const CONTENT_TYPE_META: Record<
  QrContentType,
  { label: string; icon: string; hint: string }
> = {
  url: { label: "URL", icon: "🔗", hint: "Link to any website" },
  text: { label: "Text", icon: "📝", hint: "Plain text message" },
  wifi: { label: "WiFi", icon: "📶", hint: "Auto-connect to a network" },
  vcard: { label: "vCard", icon: "👤", hint: "Contact card" },
  email: { label: "Email", icon: "✉️", hint: "Pre-filled email" },
  sms: { label: "SMS", icon: "💬", hint: "Pre-filled text message" },
  phone: { label: "Phone", icon: "📞", hint: "Dial a number" },
};
