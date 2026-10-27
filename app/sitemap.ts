import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";
import { guides } from "@/lib/seo";
import { qrPlatforms } from "@/lib/qr-platforms";
import { blogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteConfig.url,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/studio`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${siteConfig.url}/gallery`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/guides`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/blog`,
      lastModified: new Date("2026-10-27"),
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${siteConfig.url}/qr-code-for`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteConfig.url}/pricing`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/contact`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${siteConfig.url}/privacy`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/terms`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const guideRoutes: MetadataRoute.Sitemap = guides.map((g) => ({
    url: `${siteConfig.url}/guides/${g.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  // blogPosts includes: qr-codes-with-logo-more-scans (2026-10-27), qr-code-met-logo-maken (2026-10-23, Dutch), qr-code-with-logo-guide (2026-10-16), youtube-qr-code-guide (2026-10-13), linkedin-qr-code-guide, etc.
  const blogRoutes: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${siteConfig.url}/blog/${p.slug}`,
    lastModified: new Date(p.date),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  // Explicitly include the latest blog post URL for clarity
  const explicitBlogPosts: MetadataRoute.Sitemap = [
    {
      url: `${siteConfig.url}/blog/qr-codes-with-logo-more-scans`,
      lastModified: new Date("2026-10-27"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
  ];

  // Merge explicit posts with auto-generated, avoiding duplicates
  const allBlogRoutes = [
    ...explicitBlogPosts,
    ...blogRoutes.filter(
      (r) => !explicitBlogPosts.some((e) => e.url === r.url)
    ),
  ];

  // Only index platform URLs that do not already have a deeper /guides article.
  const platformRoutes: MetadataRoute.Sitemap = qrPlatforms
    .filter((p) => !p.relatedGuideSlug)
    .map((p) => ({
      url: `${siteConfig.url}/qr-code-for/${p.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

  return [...staticRoutes, ...guideRoutes, ...allBlogRoutes, ...platformRoutes];
}
