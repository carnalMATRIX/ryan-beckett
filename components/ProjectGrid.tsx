"use client";

import { useState } from "react";
import { Project } from "@/constants/projects";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

function ProjectGrid({ projects }: { projects: Project[] }) {
  const [visibleCount, setVisibleCount] = useState(4);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const visibleProjects = projects.slice(0, visibleCount);

  return (
    <div className="flex flex-col items-center w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-16 w-full">
        {visibleProjects.map((project) => (
          <Link
            key={project.id}
            href={project.link}
            className="relative group overflow-hidden p-5 md:p-8 md:min-h-70 flex flex-col justify-between bg-bg-dark transition-all duration-300"
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
                <span className="text-base-light font-light tracking-[3%] group-hover:text-white">
                  {project.subtitle}
                </span>
              </h3>
              {/* Description */}
              <p className="hidden md:block text-[#8F8F8F] text-[13.5px] md:text-[14px] leading-relaxed mt-4 font-medium max-w-[95%] text-left group-hover:text-base-light transition-all duration-300">
                {project.description}
              </p>
            </div>

            {/* Bottom Row: Tags & Link Indicator */}
            <div className="flex justify-between items-end mt-4 md:mt-6 z-10 w-full">
              {/* Tags array */}
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
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
        ))}
      </div>

      {/* Load More Button in Crimson Style */}
      {visibleCount < projects.length && (
        <div className="pb-16 flex justify-center w-full">
          <button
            onClick={handleLoadMore}
            className="group/btn flex items-center justify-center gap-3 bg-crimson-bright hover:bg-crimson-dark text-white px-8 py-4 rounded-none transition-all duration-300 font-roboto font-bold text-xs tracking-widest uppercase cursor-pointer min-w-50"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default ProjectGrid;
