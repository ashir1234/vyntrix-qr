import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/manage/", "/r/", "/wifi/"],
      },
      // Explicitly welcome major AI / generative search crawlers (GEO).
      {
        userAgent: "GPTBot",
        allow: "/",
        disallow: ["/api/", "/manage/", "/r/", "/wifi/"],
      },
      {
        userAgent: "ChatGPT-User",
        allow: "/",
        disallow: ["/api/", "/manage/", "/r/", "/wifi/"],
      },
      {
        userAgent: "Google-Extended",
        allow: "/",
        disallow: ["/api/", "/manage/", "/r/", "/wifi/"],
      },
      {
        userAgent: "PerplexityBot",
        allow: "/",
        disallow: ["/api/", "/manage/", "/r/", "/wifi/"],
      },
      {
        userAgent: "ClaudeBot",
        allow: "/",
        disallow: ["/api/", "/manage/", "/r/", "/wifi/"],
      },
      {
        userAgent: "Anthropic-AI",
        allow: "/",
        disallow: ["/api/", "/manage/", "/r/", "/wifi/"],
      },
    ],
    sitemap: `${siteConfig.url}/sitemap.xml`,
    host: siteConfig.url,
  };
}
