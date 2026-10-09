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
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function blogPostUrl(slug: string) {
  return `${siteConfig.url}/blog/${slug}`;
}
