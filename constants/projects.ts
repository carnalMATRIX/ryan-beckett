export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  featuredImage: string;
  tags: string[];
  link: string;
}

export const PROJECTS: Project[] = [
  {
    id: "mantle",
    title: "PROJECT MANTLE",
    subtitle: "CURING SAAS FATIGUE WITH A CENTRALISED OBSIDIAN WORKSPACE",
    description:
      "Consolidating fragmented task tracking, calendar planning, contextual intelligence, and modern design into a single, cohesive human interface.",
    featuredImage: "/images/about/about_1.JPG",
    tags: ["Design", "HCI", "Obsidian", "Article"],
    link: "/projects/mantle",
  },
  {
    id: "project-2",
    title: "PROJECT MANTLE",
    subtitle: "CURING SAAS FATIGUE WITH A CENTRALISED OBSIDIAN WORKSPACE",
    description:
      "Consolidating fragmented task tracking, calendar planning, contextual intelligence, and modern design into a single, cohesive human interface.",
    featuredImage: "/images/about/about_2.JPG",
    tags: ["Design", "HCI", "Obsidian", "Article"],
    link: "/projects/project-2",
  },
  {
    id: "project-3",
    title: "PROJECT MANTLE",
    subtitle: "CURING SAAS FATIGUE WITH A CENTRALISED OBSIDIAN WORKSPACE",
    description:
      "Consolidating fragmented task tracking, calendar planning, contextual intelligence, and modern design into a single, cohesive human interface.",
    featuredImage: "/images/about/about_3.JPG",
    tags: ["Design", "HCI", "Obsidian", "Article"],
    link: "/projects/project-3",
  },
  {
    id: "project-4",
    title: "PROJECT MANTLE",
    subtitle: "CURING SAAS FATIGUE WITH A CENTRALISED OBSIDIAN WORKSPACE",
    description:
      "Consolidating fragmented task tracking, calendar planning, contextual intelligence, and modern design into a single, cohesive human interface.",
    featuredImage: "/images/hero/hero_bg.JPG",
    tags: ["Design", "HCI", "Obsidian", "Article"],
    link: "/projects/project-4",
  },
];
