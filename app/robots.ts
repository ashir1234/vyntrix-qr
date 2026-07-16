import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/manage/", "/r/"],
      },
      // Explicitly welcome major AI / generative search crawlers (GEO).
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/manage/", "/r/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/manage/", "/r/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/manage/", "/r/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/manage/", "/r/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/manage/", "/r/"],
      },
      {
        userAgent: "Anthropic-AI",
        allow: "/",
        disallow: ["/api/", "/manage/", "/r/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
