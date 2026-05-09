import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const routes = [
    { path: "/", priority: 1.0, changeFreq: "weekly" as const },
    { path: "/contact", priority: 0.8, changeFreq: "monthly" as const },
    { path: "/security", priority: 0.7, changeFreq: "monthly" as const },
    { path: "/research", priority: 0.6, changeFreq: "monthly" as const },
    { path: "/docs", priority: 0.9, changeFreq: "weekly" as const },
    { path: "/legal/terms", priority: 0.3, changeFreq: "yearly" as const },
    { path: "/legal/privacy", priority: 0.3, changeFreq: "yearly" as const },
    { path: "/legal/license", priority: 0.3, changeFreq: "yearly" as const },
  ];

  return routes.map((r) => ({
    url: `${siteConfig.url}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFreq,
    priority: r.priority,
  }));
}
