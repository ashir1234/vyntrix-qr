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
