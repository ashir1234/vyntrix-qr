import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { siteConfig } from "@/lib/site";
import {
  organizationJsonLd,
  softwareAppJsonLd,
  websiteJsonLd,
} from "@/lib/seo";
import { CookieConsent } from "@/components/site/CookieConsent";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} — Free QR Code Generator with Logo & 3D Preview`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.name, url: siteConfig.url }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "technology",
  alternates: {
    canonical: "/",
    languages: {
      "en": siteConfig.url,
      "x-default": siteConfig.url,
    },
  },
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} — Free QR Code Generator with Logo & 3D Preview`,
    description: siteConfig.description,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Free QR Code Generator with Logo & 3D Preview`,
    description: siteConfig.description,
    creator: siteConfig.twitter,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: ["/favicon.ico"],
  },
  manifest: "/manifest.webmanifest",
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: siteConfig.adsenseClient
    ? { "google-adsense-account": siteConfig.adsenseClient }
    : undefined,
};

export const viewport: Viewport = {
  themeColor: "#08030f",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const adsClient = siteConfig.adsenseClient;
  const graph = {
    "@context": "https://schema.org",
    "@graph": [organizationJsonLd(), websiteJsonLd(), softwareAppJsonLd()],
  };

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
        />
        {adsClient && (
          <>
            {/* Plain <script> in the initial HTML so AdSense's crawler can
                verify without executing client-side JS. */}
            <script
              async
              src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClient}`}
              crossOrigin="anonymous"
            />
            <script
              dangerouslySetInnerHTML={{
                __html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}window.gtag=gtag;gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});`,
              }}
            />
          </>
        )}
      </head>
      <body className="min-h-full flex flex-col">
        {children}
        <CookieConsent />
      </body>
    </html>
  );
}
