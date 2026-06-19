import type { MetadataRoute } from "next";
import { getCachedPayload } from "@/lib/payload";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://beckett.vercel.app";

  // Base pages
  const routes = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    },
  ];

  // Dynamic project pages
  try {
    const payload = await getCachedPayload();
    const { docs: projects } = await payload.find({
      collection: "projects",
      depth: 0,
      limit: 1000,
    });

    const projectRoutes = projects
      .map((project: any) => {
        const slug = project.projectBehaviour?.slug;
        if (!slug) return null;
        return {
          url: `${baseUrl}/projects/${slug}`,
          lastModified: new Date(project.updatedAt || new Date()),
          changeFrequency: "monthly" as const,
          priority: 0.6,
        };
      })
      .filter((route): route is Exclude<typeof route, null> => route !== null);

    return [...routes, ...projectRoutes];
  } catch (error) {
    console.error("Error generating sitemap dynamic routes:", error);
    return routes;
  }
}
