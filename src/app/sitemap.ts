import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { CHINA_MODELS, getAllComparisonPairs } from "@/data/models";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const base = siteConfig.url;

  const modelRoutes: MetadataRoute.Sitemap = CHINA_MODELS.map((m) => ({
    url: `${base}/models/${m.slug}/`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  const compareRoutes: MetadataRoute.Sitemap = getAllComparisonPairs().map(
    (pair) => ({
      url: `${base}/compare/${pair.slug}/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    })
  );

  const legalRoutes: MetadataRoute.Sitemap = [
    "/terms/",
    "/privacy/",
    "/refund/",
  ].map((p) => ({
    url: `${base}${p}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.4,
  }));

  return [
    {
      url: `${base}/`,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${base}/playbook/`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    ...modelRoutes,
    ...compareRoutes,
    ...legalRoutes,
  ];
}
