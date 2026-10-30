import { siteConfig } from "./site";

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  /** ISO date YYYY-MM-DD */
  date: string;
  readingMinutes: number;
  keywords: string[];
  /** Short eyebrow label for cards */
  topic: string;
};

/** Original editorial posts — keep these substantial and unique. */
export const blogPosts: BlogPost[] = [
  {
    slug: "static-qr-privacy-in-the-browser",
    title: "How Static QR Generation Stays Private in Your Browser",
    description:
      "What “client-side QR generation” actually means, what we store for dynamic codes, and how to choose a privacy-friendly workflow.",
    date: "2026-07-20",
    readingMinutes: 8,
    topic: "Privacy",
    keywords: [
      "QR code privacy",
      "client-side QR generator",
      "static QR code privacy",
    ],
  },
  {
    slug: "print-qr-codes-that-scan",
    title: "Print QR Codes That Actually Scan: A Field Checklist",
    description:
      "A practical pre-press checklist for size, contrast, quiet zone, proofs, and when to use SVG vs PNG — based on how phones fail in the real world.",
    date: "2026-07-22",
    readingMinutes: 9,
    topic: "Print",
    keywords: [
      "QR code print checklist",
      "QR code not scanning",
      "print-ready QR code",
    ],
  },
  {
    slug: "static-vs-dynamic-qr-cost",
    title: "When Free QR Codes Become Expensive",
    description:
      "Why reprinting static codes costs more than a Pro plan, and a simple decision framework for marketing, menus, and packaging.",
    date: "2026-07-25",
    readingMinutes: 7,
    topic: "Strategy",
    keywords: [
      "static vs dynamic QR cost",
      "QR code reprinting",
      "dynamic QR worth it",
    ],
  },
  {
    slug: "error-correction-logos-pretty-qr-fail",
    title: "Error Correction, Logos, and Why Pretty QR Codes Fail",
    description:
      "How QR error correction works, why logos and low contrast burn that budget, and a simple decision tree for branded print.",
    date: "2026-08-05",
    readingMinutes: 8,
    topic: "Design",
    keywords: [
      "QR code error correction",
      "QR code with logo scanning",
      "branded QR code fails",
    ],
  },
  {
    slug: "small-business-qr-playbook",
    title: "A Small-Business QR Playbook: Five Codes That Matter",
    description:
      "Reviews, menus, WiFi, WhatsApp, and one social profile — where to place them, when to use dynamic, and a one-afternoon rollout.",
    date: "2026-08-07",
    readingMinutes: 9,
    topic: "Playbook",
    keywords: [
      "QR code for small business",
      "restaurant QR code setup",
      "Google review QR code",
    ],
  },
  {
    slug: "finish-the-qr-workflow",
    title: "Building a QR Workflow People Actually Finish",
    description:
      "Where generators lose users between design and print — and how we designed Vyntrix QR around watermarks, SVG, and editable dynamics.",
    date: "2026-08-10",
    readingMinutes: 7,
    topic: "Product",
    keywords: [
      "QR code generator workflow",
      "print ready QR SVG",
      "no watermark QR code",
    ],
  },
  {
    slug: "linkedin-qr-code-guide",
    title: "How to Make a LinkedIn QR Code (Profile, Company Page, Business Card)",
    description:
      "A practical guide to creating LinkedIn QR codes — from finding your profile URL to printing branded codes on business cards, badges, slides, and email signatures.",
    date: "2026-10-09",
    readingMinutes: 10,
    topic: "Guide",
    keywords: [
      "linkedin qr code",
      "business card qr code",
      "linkedin profile qr code",
      "linkedin company page qr code",
      "networking qr code",
    ],
  },
  {
    slug: "youtube-qr-code-guide",
    title: "How to Make a YouTube QR Code (Channel, Video, Subscribe & Print)",
    description:
      "A complete guide to creating YouTube QR codes — channel URLs, video links, Shorts, playlists, the ?sub_confirmation=1 subscribe prompt, static vs dynamic for campaigns, and a print/scan checklist for packaging, posters, merch, and events.",
    date: "2026-10-13",
    readingMinutes: 10,
    topic: "Guide",
    keywords: [
      "youtube qr code",
      "youtube channel qr code",
      "youtube video qr code",
      "subscribe qr code youtube",
      "qr code for youtube",
    ],
  },
  {
    slug: "qr-code-with-logo-guide",
    title: "How to Create a QR Code with a Logo (Step-by-Step Guide)",
    description:
      "A practical walkthrough for creating a QR code with a logo inside — preparing your logo file, uploading it, choosing error correction, testing scans, and exporting for print or web using Vyntrix QR.",
    date: "2026-10-16",
    readingMinutes: 10,
    topic: "Guide",
    keywords: [
      "qr code with logo",
      "qr codes with logo",
      "how to create a qr code with a logo",
      "logo in qr code",
      "qr code with logo inside",
      "branded qr code",
    ],
  },
  {
    slug: "qr-code-logo-design-best-practices",
    title: "QR Code Logo Design: Size, Placement, Contrast & Error Correction Best Practices",
    description:
      "Concrete design rules for putting a logo in a QR code — logo size vs error correction, center placement, padding, color contrast, module styling limits, file formats, and a pre-launch testing checklist.",
    date: "2026-10-20",
    readingMinutes: 10,
    topic: "Design",
    keywords: [
      "qr code logo design",
      "logo in qr code",
      "qr code with logo inside",
      "qr codes with logo",
      "qr code logo placement",
      "qr code logo size",
      "branded qr code design",
    ],
  },
  {
    slug: "qr-code-met-logo-maken",
    title: "QR code met logo maken: stap voor stap (gratis)",
    description:
      "Leer hoe je gratis een QR code met logo maakt in Vyntrix QR Studio. Praktische handleiding voor Nederlandse en Belgische bedrijven: menukaarten, visitekaartjes, verpakkingen en meer.",
    date: "2026-10-23",
    readingMinutes: 7,
    topic: "Handleiding",
    keywords: [
      "qr code met logo",
      "qr code met logo maken",
      "qr met logo",
      "qr code maken met logo",
      "gratis qr code generator",
      "qr code generator met logo",
    ],
  },
  {
    slug: "qr-codes-with-logo-more-scans",
    title: "Do QR Codes with a Logo Get More Scans? What 46.9 Million Scans Reveal",
    description:
      "New research from Scanova's 2026 QR Code Benchmarks shows customized QR codes get 2.4× more scans than plain black-and-white ones. Here's what the data says about logo QR codes — and what else drives scans.",
    date: "2026-10-27",
    readingMinutes: 8,
    topic: "Research",
    keywords: [
      "qr codes with logo",
      "qr code with logo",
      "logo in qr code",
      "qr code with logo inside",
      "qr code scan rate",
      "branded qr code performance",
    ],
  },
  {
    slug: "gs1-sunrise-2027-qr-codes-packaging",
    title:
      "GS1 Sunrise 2027: What the Switch to QR Codes on Packaging Means for Your Brand",
    description:
      "Retailers are adopting 2D barcodes by end of 2027. Learn what GS1 Digital Link is, how to dual-code packaging, and why the QR on your product needs to deliver value — not just scan at checkout.",
    date: "2026-10-30",
    readingMinutes: 11,
    topic: "Packaging",
    keywords: [
      "gs1 sunrise 2027",
      "qr code on packaging",
      "2d barcode packaging",
      "gs1 digital link qr code",
      "upc to qr code",
      "product packaging qr code",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function blogPostUrl(slug: string) {
  return `${siteConfig.url}/blog/${slug}`;
}
