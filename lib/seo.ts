import { siteConfig } from "./site";

/** Guide pages used for SEO + Generative Engine Optimization (GEO). */
export const guides = [
  {
    slug: "wifi-qr-code",
    title: "How to Create a WiFi QR Code (Free)",
    description:
      "Generate a free WiFi QR code so guests can connect without typing a password. Works on iPhone and Android. Download PNG or SVG instantly.",
    keywords: [
      "WiFi QR code",
      "WiFi QR code generator",
      "QR code for WiFi",
      "share WiFi password QR",
    ],
    h1: "How to Create a Free WiFi QR Code",
    short: "WiFi QR code",
  },
  {
    slug: "qr-code-with-logo",
    title: "How to Make a QR Code with Your Logo",
    description:
      "Add your brand logo to a custom QR code without breaking scan reliability. Free logo QR generator with colors, gradients, and PNG/SVG export.",
    keywords: [
      "QR code with logo",
      "custom QR code logo",
      "branded QR code",
      "QR code generator with logo",
    ],
    h1: "How to Make a QR Code with Your Logo",
    short: "QR with logo",
  },
  {
    slug: "dynamic-qr-code",
    title: "What Is a Dynamic QR Code? (Editable + Analytics)",
    description:
      "Learn how dynamic QR codes let you change the destination after printing and track scans. Create an editable QR with free analytics on Vyntrix QR.",
    keywords: [
      "dynamic QR code",
      "editable QR code",
      "QR code analytics",
      "change QR code URL",
    ],
    h1: "What Is a Dynamic QR Code?",
    short: "Dynamic QR",
  },
  {
    slug: "vcard-qr-code",
    title: "How to Create a vCard / Contact QR Code",
    description:
      "Build a free vCard QR code so people can save your contact details with one scan. Perfect for business cards, email signatures, and networking events.",
    keywords: [
      "vCard QR code",
      "contact QR code",
      "business card QR code",
      "QR code for contact",
    ],
    h1: "How to Create a Free vCard QR Code",
    short: "vCard QR",
  },
  {
    slug: "qr-code-for-restaurant-menu",
    title: "How to Make a QR Code Menu for Your Restaurant",
    description:
      "Create a free QR code menu so diners can view your menu on their phone. Link to a PDF or web menu and update it anytime with a dynamic QR code.",
    keywords: [
      "QR code menu",
      "restaurant QR code",
      "QR code for menu",
      "digital menu QR code",
    ],
    h1: "How to Make a QR Code Menu for Your Restaurant",
    short: "Restaurant menu",
  },
  {
    slug: "qr-code-for-instagram",
    title: "How to Create an Instagram QR Code",
    description:
      "Make a free QR code for your Instagram profile so people can follow you with one scan. Perfect for posters, packaging, and business cards.",
    keywords: [
      "Instagram QR code",
      "QR code for Instagram",
      "Instagram profile QR code",
      "social media QR code",
    ],
    h1: "How to Create an Instagram QR Code",
    short: "Instagram QR",
  },
  {
    slug: "qr-code-for-whatsapp",
    title: "How to Create a WhatsApp QR Code (Click to Chat)",
    description:
      "Generate a free WhatsApp QR code that opens a chat with your number and a pre-filled message. Great for support, sales, and lead generation.",
    keywords: [
      "WhatsApp QR code",
      "QR code for WhatsApp",
      "click to chat QR code",
      "WhatsApp business QR code",
    ],
    h1: "How to Create a WhatsApp QR Code",
    short: "WhatsApp QR",
  },
  {
    slug: "qr-code-for-google-reviews",
    title: "How to Make a Google Review QR Code",
    description:
      "Create a free QR code that sends customers straight to your Google review page. Get more reviews with a scan on receipts, tables, and flyers.",
    keywords: [
      "Google review QR code",
      "QR code for reviews",
      "review QR code",
      "get more Google reviews",
    ],
    h1: "How to Make a Google Review QR Code",
    short: "Google reviews QR",
  },
  {
    slug: "qr-code-for-pdf",
    title: "How to Create a QR Code for a PDF",
    description:
      "Turn any PDF into a scannable QR code. Host the file, link it, and update the document later with a dynamic QR code — no reprinting required.",
    keywords: [
      "QR code for PDF",
      "PDF QR code",
      "QR code to PDF file",
      "link PDF QR code",
    ],
    h1: "How to Create a QR Code for a PDF",
    short: "PDF QR",
  },
  {
    slug: "qr-code-for-business-card",
    title: "How to Add a QR Code to Your Business Card",
    description:
      "Add a QR code to your business card so contacts save your details instantly. Compare vCard and dynamic link options and download print-ready files.",
    keywords: [
      "business card QR code",
      "QR code for business card",
      "digital business card QR",
      "networking QR code",
    ],
    h1: "How to Add a QR Code to Your Business Card",
    short: "Business card QR",
  },
  {
    slug: "qr-code-size-for-print",
    title: "QR Code Size for Print: The Complete Guide",
    description:
      "Learn the right QR code size for print — from business cards to billboards. Use the 10:1 distance rule, quiet zone, and DPI tips for reliable scans.",
    keywords: [
      "QR code size",
      "QR code size for print",
      "how big should a QR code be",
      "QR code print resolution",
    ],
    h1: "QR Code Size for Print: The Complete Guide",
    short: "QR size for print",
  },
  {
    slug: "qr-code-for-youtube",
    title: "How to Create a QR Code for a YouTube Video or Channel",
    description:
      "Make a free QR code that opens your YouTube video or channel. Perfect for thumbnails, packaging, and events — track scans with a dynamic QR code.",
    keywords: [
      "YouTube QR code",
      "QR code for YouTube",
      "QR code for video",
      "YouTube channel QR code",
    ],
    h1: "How to Create a QR Code for YouTube",
    short: "YouTube QR",
  },
  {
    slug: "qr-code-for-event-tickets",
    title: "How to Use QR Codes for Event Tickets",
    description:
      "Add QR codes to event tickets for fast, contactless check-in. Learn how to link tickets, track entries, and design scannable codes that always work.",
    keywords: [
      "QR code for event tickets",
      "event ticket QR code",
      "QR code check-in",
      "ticket QR code generator",
    ],
    h1: "How to Use QR Codes for Event Tickets",
    short: "Event ticket QR",
  },
  {
    slug: "static-vs-dynamic-qr-code",
    title: "Static vs Dynamic QR Codes: Which Should You Use?",
    description:
      "Understand the difference between static and dynamic QR codes — editability, scan analytics, and cost — so you pick the right one for your project.",
    keywords: [
      "static vs dynamic QR code",
      "difference static dynamic QR",
      "dynamic QR code vs static",
      "which QR code to use",
    ],
    h1: "Static vs Dynamic QR Codes: Which Should You Use?",
    short: "Static vs dynamic",
  },
] as const;

export type GuideSlug = (typeof guides)[number]["slug"];

export function getGuide(slug: string) {
  return guides.find((g) => g.slug === slug);
}

export function absoluteUrl(path = "") {
  const p = path.startsWith("/") ? path : path ? `/${path}` : "";
  return `${siteConfig.url}${p}`;
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: absoluteUrl("/logo.svg"),
    sameAs: [siteConfig.parentCompany.url],
    parentOrganization: {
      "@type": "Organization",
      name: siteConfig.parentCompany.name,
      url: siteConfig.parentCompany.url,
      description: siteConfig.parentCompany.description,
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: `hello@${siteConfig.domain}`,
      availableLanguage: ["English"],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    inLanguage: "en",
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/studio"),
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function softwareAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    applicationCategory: "UtilitiesApplication",
    applicationSubCategory: "QR Code Generator",
    operatingSystem: "Web Browser",
    url: siteConfig.url,
    description: siteConfig.description,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    featureList: [
      "Free QR code generator",
      "Custom logo embedding",
      "Color gradients and styles",
      "3D live preview",
      "WiFi, vCard, URL, email, SMS, phone QR types",
      "Dynamic editable QR codes with scan analytics",
      "PNG and SVG export",
    ],
  };
}

export function howToJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to create a free custom QR code with Vyntrix QR",
    description:
      "Create a branded QR code with logo, colors, and optional 3D preview in three steps.",
    totalTime: "PT2M",
    tool: {
      "@type": "HowToTool",
      name: siteConfig.name,
    },
    step: [
      {
        "@type": "HowToStep",
        name: "Pick a QR type",
        text: "Choose URL, WiFi, vCard, email, SMS, phone, or text and fill in the form fields.",
        url: absoluteUrl("/studio"),
      },
      {
        "@type": "HowToStep",
        name: "Customize the design",
        text: "Add your logo, colors, gradients, and dot styles. Preview the code in 2D or 3D.",
        url: absoluteUrl("/studio"),
      },
      {
        "@type": "HowToStep",
        name: "Download and share",
        text: "Export a high-resolution PNG or scalable SVG. Optional: enable Dynamic QR for editable links and scan analytics.",
        url: absoluteUrl("/studio"),
      },
    ],
  };
}

export function breadcrumbJsonLd(
  items: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleJsonLd(input: {
  title: string;
  description: string;
  path: string;
  datePublished?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: input.title,
    description: input.description,
    url: absoluteUrl(input.path),
    datePublished: input.datePublished ?? "2026-07-16",
    dateModified: new Date().toISOString().slice(0, 10),
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/logo.svg"),
      },
    },
    mainEntityOfPage: absoluteUrl(input.path),
    inLanguage: "en",
  };
}
