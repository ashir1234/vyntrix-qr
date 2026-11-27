import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { guides } from "@/lib/seo";
import { qrPlatforms } from "@/lib/qr-platforms";
import { blogPosts } from "@/lib/blog";

/** Stable lastmod for static/platform URLs (not build time). */
const STATIC_LAST_MODIFIED = new Date("2026-07-16");

/** Bumped when guide content was consolidated (2026-11-25). */
const GUIDE_LAST_MODIFIED = new Date("2026-11-25");

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/studio`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteConfig.url}/gallery`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/guides`,
      lastModified: GUIDE_LAST_MODIFIED,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date("2026-11-27"), // Email QR how-to
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/qr-code-for`,
      lastModified: new Date("2026-11-25"), // removed platforms that redirect to guides
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/pricing`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/site-map`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "weekly",
      priority: 0.4,
    },
  ];

  // Guides lastModified bumped 2026-11-25 after folding competing blog content.
  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${siteConfig.url}/guides/${g.slug}`,
    lastModified: GUIDE_LAST_MODIFIED,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // Kept blog posts only (competing how-tos redirect to guides and are omitted).
  // Includes: how-to-make-qr-code-for-waze-location, which-agency-issues-upc-codes-and-branded-qr-codes,
  // how-to-make-qr-code-for-google-maps-location, how-to-create-qr-code-for-website,
  // quishing-fake-qr-code-scams, gs1-sunrise-2027-qr-codes-packaging,
  // qr-codes-with-logo-more-scans, qr-code-met-logo-maken, qr-code-logo-design-best-practices,
  // error-correction-logos-pretty-qr-fail, print-qr-codes-that-scan, static-vs-dynamic-qr-cost,
  // static-qr-privacy-in-the-browser, small-business-qr-playbook, finish-the-qr-workflow.
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const explicitKeptBlogPosts: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}/blog/how-to-make-email-qr-code`,
      lastModified: new Date("2026-11-27"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteConfig.url}/blog/how-to-make-paypal-qr-code`,
      lastModified: new Date("2026-11-26"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteConfig.url}/blog/how-to-make-qr-code-for-waze-location`,
      lastModified: new Date("2026-11-25"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteConfig.url}/blog/which-agency-issues-upc-codes-and-branded-qr-codes`,
      lastModified: new Date("2026-11-24"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteConfig.url}/blog/how-to-make-qr-code-for-google-maps-location`,
      lastModified: new Date("2026-11-20"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteConfig.url}/blog/how-to-create-qr-code-for-website`,
      lastModified: new Date("2026-11-18"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteConfig.url}/blog/quishing-fake-qr-code-scams`,
      lastModified: new Date("2026-11-03"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteConfig.url}/blog/gs1-sunrise-2027-qr-codes-packaging`,
      lastModified: new Date("2026-10-30"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${siteConfig.url}/blog/qr-codes-with-logo-more-scans`,
      lastModified: new Date("2026-10-27"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  const allBlogRoutes = [
    ...explicitKeptBlogPosts,
    ...blogRoutes.filter(
      (r) => !explicitKeptBlogPosts.some((e) => e.url === r.url)
    ),
  ];

  // Only index platform URLs that do not redirect to a deeper /guides article.
  const platformRoutes: MetadataRoute.Sitemap = qrPlatforms
    .filter((p) => !p.relatedGuideSlug)
    .map((p) => ({
      url: `${siteConfig.url}/qr-code-for/${p.slug}`,
      lastModified: STATIC_LAST_MODIFIED,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...guideRoutes, ...allBlogRoutes, ...platformRoutes];
}
