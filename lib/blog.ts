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
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}

export function blogPostUrl(slug: string) {
  return `${siteConfig.url}/blog/${slug}`;
}
