import type { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

const siteUrl = "https://grupocevan.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const jobs = await prisma.job.findMany({
    where: { status: "ACTIVE" },
    select: { slug: true, updatedAt: true },
    orderBy: { updatedAt: "desc" },
  });

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: siteUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1.0 },
    { url: `${siteUrl}/jobs`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${siteUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
    { url: `${siteUrl}/servicos`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    { url: `${siteUrl}/how-it-works`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.6 },
  ];

  const jobRoutes: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${siteUrl}/jobs/${job.slug}`,
    lastModified: job.updatedAt,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...jobRoutes];
}
