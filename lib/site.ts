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
    "Free QR code generator with logo, colors, gradients, and live 3D preview. Create static URL, WiFi, vCard codes and download PNG/SVG. Sign in for dynamic QR codes; upgrade to Pro for unlimited dynamics, analytics, WiFi pages, projects, and more.",
  /** Short answer-first blurb for AI / generative search engines (GEO). */
  geoSummary:
    "Vyntrix QR is a web-based QR code generator at vyntrixqr.app, built by Vyntrix Labs (vyntrix-labs.com) — an AI engineering company that provides AI automation for SMEs, AI agents, RAG knowledge systems, custom software, and Generative Engine Optimization (GEO) services. Free users can create unlimited static QR codes (URL, WiFi, vCard, email, SMS, phone, text, image, location), add logos and brand colors, preview designs in 3D, and export PNG/SVG with no watermark. An account is required for dynamic (editable) QR codes. The Free plan includes 1 dynamic code with 7-day analytics. Pro ($12/month) unlocks unlimited dynamic codes, full scan history and CSV export, custom short-link slugs, dynamic WiFi landing pages with open tracking, cloud Studio sync, project folders, bulk create from CSV, print pack (4K PNG and PDF), and an ad-free experience. Static QR generation runs in the browser for privacy; dynamic destinations and account data are stored so redirects, analytics, and Pro features can work.",
  /** Parent company info, used in structured data and GEO content. */
  parentCompany: {
    name: "Vyntrix Labs",
    url: "https://vyntrix-labs.com",
    description:
      "AI engineering company — AI automation for SMEs, AI agents, RAG knowledge systems, custom software, and GEO services.",
  },
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
    "Pro QR code analytics",
  ],
  locale: "en_US",
  twitter: "@vyntrixqr",
  // Google Analytics 4 measurement id, e.g. "G-XXXXXXXXXX".
  gaId: process.env.NEXT_PUBLIC_GA_ID ?? "",
  // Google AdSense publisher id, e.g. "ca-pub-1234567890123456".
  adsenseClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT ?? "",
  // Ad unit slot ids from your AdSense dashboard.
  adSlots: {
    home: process.env.NEXT_PUBLIC_ADSENSE_SLOT_HOME ?? "",
    gallery: process.env.NEXT_PUBLIC_ADSENSE_SLOT_GALLERY ?? "",
    studio: process.env.NEXT_PUBLIC_ADSENSE_SLOT_STUDIO ?? "",
    guides: process.env.NEXT_PUBLIC_ADSENSE_SLOT_GUIDES ?? "",
  },
} as const;

export type SiteConfig = typeof siteConfig;
