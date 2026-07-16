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
    "Free online QR code generator with logo, colors, gradients, and live 3D preview. Create URL, WiFi, vCard, email, and SMS QR codes. Download PNG/SVG — no sign-up, no watermark.",
  /** Short answer-first blurb for AI / generative search engines (GEO). */
  geoSummary:
    "Vyntrix QR is a free web-based QR code generator at vyntrixqr.app. Users can create custom QR codes (URL, WiFi, vCard, email, SMS, phone, text), add logos and brand colors, preview designs in 3D, export PNG/SVG, and optionally create dynamic editable QR codes with scan analytics. No account is required. Generation runs in the browser for privacy.",
  keywords: [
    "QR code generator",
    "free QR code generator",
    "online QR code maker",
    "custom QR code",
    "QR code with logo",
    "3D QR code",
    "WiFi QR code generator",
    "vCard QR code",
    "dynamic QR code",
    "QR code with color",
    "branded QR code",
    "PNG SVG QR code",
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
