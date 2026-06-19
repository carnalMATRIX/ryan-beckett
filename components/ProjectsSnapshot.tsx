import React from "react";
import SectionHeading from "./SectionHeading";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { getCachedPayload } from "@/lib/payload";
import type {
  Project as PayloadProject,
  Media as PayloadMedia,
} from "@/payload-types";

async function ProjectsSnapshot() {
  const payload = await getCachedPayload();
  const { docs: dbProjects } = await payload.find({
    collection: "projects",
    limit: 4,
    sort: ["projectBehaviour.isFeatured", "-createdAt"],
  });

  return (
    <section className="bg-bg-dark py-24">
      <div className="w-full max-w-7xl mx-auto">
        <SectionHeading number="02" title="Projects" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 pb-16">
          {dbProjects.map((project, index) => {
            const featuredImg = project.projectDetails?.featuredImage;
            let imageUrl = "/images/about/about_1.JPG";
            if (
              featuredImg &&
              typeof featuredImg === "object" &&
              featuredImg.url
            ) {
              imageUrl = featuredImg.url;
            } else if (
              project.images?.[0]?.image &&
              typeof project.images[0].image === "object" &&
              project.images[0].image.url
            ) {
              imageUrl = project.images[0].image.url;
            }

            const tags =
              project.tags?.map((t) => t.label).filter(Boolean) || [];
            const subtitle = project.projectDetails?.subtitle || "";
            const description = project.projectDetails?.description || "";
            const slug = project.projectBehaviour?.slug || "#";
            const link = `/projects/${slug}`;

            return (
              <Link
                key={project.id}
                href={link}
                className={cn(
                  "relative group overflow-hidden p-5 md:p-8 md:min-h-70 flex flex-col justify-between bg-bg-dark transition-all duration-300",
                  index === 3 ? "hidden md:flex" : "flex",
                )}
              >
                {/* Background Image Layer (Hover Reveal) */}
                <div
                  className={
                    "absolute inset-0 z-5 transition-all duration-700 ease-out overflow-hidden opacity-0 group-hover:opacity-100 left-0 top-0"
                  }
                >
                  <Image
                    src={imageUrl}
                    alt={project.title}
                    fill
                    sizes="(max-w-768px) 100vw, 50vw"
                    className="object-cover h-full w-full object-top"
                  />
                  {/* Dark Vignette Overlay for Readability */}
                  <div className="absolute inset-0 bg-radial from-[#730001]/70 to-[#360000] left-0 right-0" />
                </div>

                {/* Title & Subtitle Group */}
                <div className="max-w-[95%] z-10">
                  <h3 className="font-outfit uppercase text-[17px] leading-snug text-left">
                    <span className="text-white font-bold tracking-[15%]">
                      {project.title}
                    </span>
                    <span className="text-crimson-bright mx-2 font-normal">
                      {"//"}
                    </span>
                    <br className="block md:hidden" />
                    <span className="text-[#8F8F8F] font-light tracking-[3%] group-hover:text-base-light">
                      {subtitle}
                    </span>
                  </h3>
                  {/* Description */}
                  <p className="hidden md:block text-zinc-400 text-[13.5px] md:text-[14px] leading-relaxed mt-4 font-medium max-w-[95%] text-left group-hover:text-base-light transition-all duration-300">
                    {description}
                  </p>
                </div>

                {/* Bottom Row: Tags & Link Indicator */}
                <div className="flex justify-between items-end md:mt-6 z-10 w-full">
                  {/* Tags array */}
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-crimson-dark text-base-light px-2.5 py-0.5 text-xs font-roboto-flex font-medium group-hover:bg-base-light group-hover:text-crimson-dark transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Floating Arrow Link Indicator */}
                  <div
                    className={
                      "p-3 rounded-full bg-bg-dark/50 text-crimson-bright transition-all duration-500 transform hover:bg-crimson-bright hover:text-white! opacity-0 group-hover:opacity-100"
                    }
                  >
                    <ArrowUpRight className="w-5 h-5 text-white z-20" />
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        <Link href="/projects" className="mx-5 md:mx-0">
          <Button>View All Projects</Button>
        </Link>
      </div>
    </section>
  );
}

export default ProjectsSnapshot;
