import ProjectsArchive from "@/components/ProjectsArchive";
import React from "react";
import { getCachedPayload } from "@/lib/payload";
import type {
  Project as PayloadProject,
  Media as PayloadMedia,
} from "@/payload-types";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects Archive",
  description: "Browse the dynamic archive of web design, development, and photography projects by Ryan Beckett.",
  alternates: {
    canonical: "/projects",
  },
  openGraph: {
    title: "Projects Archive | Ryan Beckett",
    description: "Browse the dynamic archive of web design, development, and photography projects by Ryan Beckett.",
    url: "https://beckett.vercel.app/projects",
  },
};

async function ProjectsPage() {
  const payload = await getCachedPayload();
  const { docs: projects } = await payload.find({
    collection: "projects",
    limit: 1000,
    sort: ["-createdAt"],
  });

  const mappedProjects = projects.map((project) => {
    const featuredImg = project.projectDetails?.featuredImage;
    let imageUrl = "/images/about/about_1.JPG";
    if (featuredImg && typeof featuredImg === "object" && featuredImg.url) {
      imageUrl = featuredImg.url;
    } else if (
      project.images?.[0]?.image &&
      typeof project.images[0].image === "object" &&
      project.images[0].image.url
    ) {
      imageUrl = project.images[0].image.url;
    }

    const tags = project.tags?.map((t) => t.label).filter(Boolean) || [];
    const subtitle = project.projectDetails?.subtitle || "";
    const description = project.projectDetails?.description || "";
    const slug = project.projectBehaviour?.slug || "#";
    const link = `/projects/${slug}`;

    return {
      id: project.id.toString(),
      title: project.title,
      subtitle,
      description,
      featuredImage: imageUrl,
      tags,
      link,
    };
  });

  return (
    <main className="min-h-screen bg-bg-light">
      <div className="max-w-7xl mx-auto py-10 md:py-20 p-5 md:p-0">
        <ProjectsArchive projects={mappedProjects} />
      </div>
    </main>
  );
}

export default ProjectsPage;
