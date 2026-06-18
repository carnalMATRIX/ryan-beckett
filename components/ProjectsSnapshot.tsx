import React from "react";
import SectionHeading from "./SectionHeading";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Button } from "./ui/button";
import { PROJECTS } from "@/constants/projects";
import { cn } from "@/lib/utils";

function ProjectsSnapshot() {
  return (
    <section className="bg-bg-dark py-24">
      <div className="w-full max-w-7xl mx-auto">
        <SectionHeading number="02" title="Projects" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-10 pb-16">
          {PROJECTS.map((project, index) => (
            <Link
              key={project.id}
              href={project.link}
              className={cn(
                "relative group overflow-hidden p-5 md:p-8 md:min-h-70 flex flex-col justify-between",
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
                  src={project.featuredImage}
                  alt={project.title}
                  fill
                  sizes="(max-w-768px) 100vw, 50vw"
                  className="object-cover h-full w-full object-top"
                />
                {/* Dark Vignette Overlay for Readability */}
                <div className="absolute inset-0 bg-linear-to-r from-black/95 via-black/70 to-transparent left-0 right-0" />
              </div>

              {/* Title & Subtitle Group */}
              <div className="max-w-[95%] z-10">
                <h3 className="font-outfit uppercase text-[17px] leading-snug">
                  <span className="text-white font-bold tracking-[15%]">
                    {project.title}
                  </span>
                  <span className="text-crimson-bright mx-2 font-normal">
                    {"//"}
                  </span>
                  <br className="block md:hidden" />
                  <span className="text-base-light font-light tracking-[3%]">
                    {project.subtitle}
                  </span>
                </h3>
                {/* Description */}
                <p className="hidden md:block text-zinc-400 text-[13.5px] md:text-[14px] leading-relaxed mt-4 font-light max-w-[95%]">
                  {project.description}
                </p>
              </div>

              {/* Bottom Row: Tags & Link Indicator */}
              <div className="flex justify-between items-end md:mt-6 z-10">
                {/* Tags array */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-crimson-dark text-base-light px-2.5 py-0.5 text-xs font-roboto-flex font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Floating Arrow Link Indicator */}
                <div
                  className={
                    "p-3 rounded-full bg-crimson-bright/40 text-crimson-bright transition-all duration-500 transform hover:bg-crimson-bright hover:text-white! opacity-0 group-hover:opacity-100"
                  }
                >
                  <ArrowUpRight className="w-5 h-5 text-white z-20" />
                </div>
              </div>
            </Link>
          ))}
        </div>

        <Link href="/projects" className="mx-5 md:mx-0">
          <Button>View All Projects</Button>
        </Link>
      </div>
    </section>
  );
}

export default ProjectsSnapshot;
