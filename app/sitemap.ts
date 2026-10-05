import type { MetadataRoute } from "next";
import { alternatives } from "@/lib/alternatives";
import { SITE_URL } from "@/lib/site";
import { useCases } from "@/lib/use-cases";

/** Bump when page copy changes meaningfully, so lastmod stays honest. */
const UPDATED = new Date("2026-10-05");

export default function sitemap(): MetadataRoute.Sitemap {
  const page = (path: string, priority: number, changeFrequency: "weekly" | "monthly" | "yearly" = "monthly") => ({
    url: `${SITE_URL}${path}`,
    lastModified: UPDATED,
    changeFrequency,
    priority
  });
  return [
    page("/", 1, "weekly"),
    page("/compare", 0.9),
    ...useCases.map((u) => page(`/for/${u.slug}`, 0.8)),
    page("/alternatives", 0.8),
    ...alternatives.map((a) => page(`/alternatives/${a.slug}`, 0.7)),
    page("/watch", 0.6),
    page("/privacy", 0.2, "yearly"),
    page("/terms", 0.2, "yearly")
  ];
}
