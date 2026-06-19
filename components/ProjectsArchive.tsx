"use client";

import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProjectGrid from "@/components/ProjectGrid";
import { Project } from "@/constants/projects";
import { SlidersHorizontal, X, Check, RotateCcw, Home } from "lucide-react";

interface ProjectsArchiveProps {
  projects: Project[];
}

export default function ProjectsArchive({ projects }: ProjectsArchiveProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  // Extract all unique tags dynamically from the available projects
  const allTags = useMemo(() => {
    const tagsSet = new Set<string>();
    projects.forEach((project) => {
      project.tags.forEach((tag) => {
        if (tag) tagsSet.add(tag);
      });
    });
    return Array.from(tagsSet).sort();
  }, [projects]);

  // Filter projects: show projects that match ANY of the selected tags (OR filter)
  // If no tags are selected, show all projects.
  const filteredProjects = useMemo(() => {
    if (selectedTags.length === 0) return projects;
    return projects.filter((project) =>
      project.tags.some((tag) => selectedTags.includes(tag))
    );
  }, [projects, selectedTags]);

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
  };

  return (
    <div className="w-full">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between">
        <div>
          <h1 className="uppercase font-roboto font-bold tracking-[5%] text-[26px] md:text-[40px] flex flex-row items-center gap-3 text-white">
            <span className="text-crimson-bright text-[35px] md:text-[45px]">
              {"// "}
            </span>
            Project Archive
          </h1>
          <p className="font-roboto font-light text-[13.5px] md:text-[15px] leading-5 pt-1 md:max-w-118.75 text-zinc-400">
            Browse through a collection of projects by Ryan Beckett, ranging
            from web development to photography and design. Some are project
            showcases, while others include more in-depth articles.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-4 md:gap-2 mt-5 md:mt-0 w-full md:w-auto">
          <Link href="/" className="w-full md:w-fit">
            <Button variant="secondary" className="w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer">
              <Home className="w-4 h-4" />
              Return to Base
            </Button>
          </Link>
          <Button
            onClick={() => setIsFilterOpen((prev) => !prev)}
            className={`w-full md:w-fit flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 ${
              isFilterOpen ? "bg-crimson-dark! text-white!" : ""
            }`}
          >
            <motion.div
              animate={{ rotate: isFilterOpen ? 90 : 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center justify-center"
            >
              {isFilterOpen ? (
                <X className="w-4 h-4" />
              ) : (
                <SlidersHorizontal className="w-4 h-4" />
              )}
            </motion.div>
            <span>
              {isFilterOpen ? "Hide Filters" : "Filter Projects"}
              {selectedTags.length > 0 && ` (${selectedTags.length})`}
            </span>
          </Button>
        </div>
      </div>

      {/* Sliding Filter Menu - Normal Document Flow, Pushes Content Down */}
      <AnimatePresence initial={false}>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden w-full"
          >
            <div className="mt-6 p-6 bg-bg-dark/95 backdrop-blur-md border border-crimson-special/20 rounded-none shadow-[0_10px_35px_-10px_rgba(0,0,0,0.8)]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-zinc-800/80">
                <div>
                  <h2 className="uppercase font-roboto font-bold tracking-[5%] text-[14px] md:text-[16px] flex flex-row items-center gap-2 text-white">
                    <span className="text-crimson-bright font-bold">
                      {"// "}
                    </span>
                    Filter by Tag
                  </h2>
                  <p className="text-xs text-zinc-500 font-roboto font-light mt-0.5">
                    Select tags to sort through the project listings.
                  </p>
                </div>
                {selectedTags.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs font-roboto font-medium text-crimson-bright hover:text-crimson-special flex items-center gap-1.5 transition-colors cursor-pointer self-start md:self-auto"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reset Filters
                  </button>
                )}
              </div>

              {/* Tag Selection Pills */}
              <div className="flex flex-wrap gap-2.5 mt-5">
                {allTags.map((tag) => {
                  const isSelected = selectedTags.includes(tag);
                  return (
                    <motion.button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className={`px-4 py-2 text-xs font-roboto-flex font-medium uppercase tracking-wider transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                        isSelected
                          ? "bg-crimson-bright text-white border border-crimson-bright shadow-[0_0_12px_rgba(223,0,2,0.25)] font-bold"
                          : "bg-bg-light text-zinc-400 border border-zinc-800/80 hover:border-crimson-special/40 hover:text-white"
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3px]" />}
                      {tag}
                    </motion.button>
                  );
                })}
              </div>

              {/* Status Summary & Selected List */}
              <div className="mt-4 pt-3 border-t border-zinc-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <span className="text-xs text-zinc-500 font-roboto font-light">
                  Showing {filteredProjects.length} of {projects.length} projects
                </span>
                {selectedTags.length > 0 && (
                  <div className="flex gap-1.5 flex-wrap items-center">
                    <span className="text-[10px] uppercase font-bold text-zinc-600 tracking-wider font-roboto">
                      Active:
                    </span>
                    {selectedTags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-crimson-dark/40 text-crimson-muted text-[10px] px-2 py-0.5 font-roboto font-normal tracking-wide uppercase border border-crimson-dark/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <hr className="border-crimson-special/50 my-8" />

      {/* Projects Grid Display */}
      {filteredProjects.length > 0 ? (
        <ProjectGrid key={selectedTags.join(",")} projects={filteredProjects} />
      ) : (
        <div className="flex flex-col items-center justify-center py-20 border border-dashed border-zinc-800 text-center">
          <p className="text-zinc-500 font-roboto font-light text-sm mb-4">
            No projects found matching the selected tags.
          </p>
          <Button onClick={clearFilters} variant="default" className="flex items-center justify-center gap-2 cursor-pointer">
            <RotateCcw className="w-4 h-4" />
            Clear All Filters
          </Button>
        </div>
      )}
    </div>
  );
}
