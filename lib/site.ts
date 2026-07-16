/**
 * Central site configuration. Override the URL and AdSense client via env vars
 * at deploy time (Vercel → Project Settings → Environment Variables).
 */
export const siteConfig = {
  name: "Vyntrix QR",
  shortName: "Vyntrix",
  domain: "vyntrixqr.app",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://vyntrixqr.app",
  tagline: "Immersive 3D QR Code Generator",
  description:
    "Create free, custom QR codes in seconds. Add logos, gradients, and colors, then preview and share them on a stunning real-time 3D tile. No sign-up required.",
  keywords: [
    "QR code generator",
    "free QR code",
    "custom QR code",
    "QR code with logo",
    "3D QR code",
    "WiFi QR code",
    "vCard QR code",
    "QR code maker",
    "QR code with color",
    "Vyntrix QR",
  ],
  locale: "en_US",
  twitter: "@vyntrixqr",
  // Google AdSense publisher id, e.g. "ca-pub-1234567890123456".
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  // Ad unit slot ids from your AdSense dashboard.
  adSlots: {
    home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME ?? "",
    gallery: process.env.NEXT_PUBLIC_ADSENSE_SLOT_GALLERY ?? "",
    studio: process.env.NEXT_PUBLIC_ADSENSE_SLOT_STUDIO ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
