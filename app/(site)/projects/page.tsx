import ProjectGrid from "@/components/ProjectGrid";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import { getCachedPayload } from "@/lib/payload";
import type {
  Project as PayloadProject,
  Media as PayloadMedia,
} from "@/payload-types";

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
        <div className="flex flex-col md:flex-row md:items-end justify-between">
          <div>
            <h1 className="uppercase font-roboto font-bold tracking-[5%] text-[26px] md:text-[40px] flex flex-row items-center gap-3">
              <span className="text-crimson-bright text-[35px] md:text-[45px]">
                {"// "}
              </span>
              Project Archive
            </h1>
            <p className="font-roboto font-light text-[13.5px] md:text-[15px] leading-5 pt-1 md:max-w-118.75">
              Browse through a collection of projects by Ryan Beckett, ranging
              from web development to photography and design. Some are project
              showcases, while others include more in-depth articles.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 mt-5 md:mt-0">
            <Link href="/" className="w-full md:w-fit">
              <Button className="w-full md:w-fit">Return to Base</Button>
            </Link>
            <Button className="w-full md:w-fit">Filter Projects</Button>
          </div>
        </div>

        <hr className="border-crimson-special/50 my-8" />

        <ProjectGrid projects={mappedProjects} />
      </div>
    </main>
  );
}

export default ProjectsPage;
