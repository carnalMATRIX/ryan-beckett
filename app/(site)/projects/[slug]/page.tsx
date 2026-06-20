import { getCachedPayload } from "@/lib/payload";
import { notFound } from "next/navigation";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink, Undo2 } from "lucide-react";
import { ProjectGallery } from "@/components/ProjectGallery";
import { Project } from "@/payload-types";
import { jsxConverters } from "@/lib/RichTextConverters";
import Footer from "@/components/Footer";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import Image from "next/image";

export const revalidate = 3600; // revalidate every hour

export async function generateStaticParams() {
  const payload = await getCachedPayload();
  const { docs: projects } = await payload.find({
    collection: "projects",
    depth: 0,
    limit: 1000,
  });

  return projects.map((project) => ({
    slug: (project as any).projectBehaviour?.slug,
  }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const payload = await getCachedPayload();

  const { docs: projects } = (await payload.find({
    collection: "projects",
    where: {
      "projectBehaviour.slug": {
        equals: slug,
      },
    },
    limit: 1,
  })) as unknown as { docs: Project[] };

  if (!projects.length) {
    return {};
  }

  const project = projects[0];
  const title = `${project.title} | Ryan Beckett`;
  const description = project.projectDetails?.description || "";
  const hasArticle = !!project.projectArticle;

  const featuredImage = project.projectDetails?.featuredImage;
  const ogImages = [];

  if (featuredImage && typeof featuredImage !== "number") {
    ogImages.push({
      url: featuredImage.url || "",
      width: featuredImage.width || 1200,
      height: featuredImage.height || 630,
      alt: featuredImage.alt || project.title,
    });
  } else if (project.images && project.images.length > 0) {
    const firstImage = project.images[0].image;
    if (typeof firstImage !== "number") {
      ogImages.push({
        url: firstImage.url || "",
        width: firstImage.width || 1200,
        height: firstImage.height || 630,
        alt: firstImage.alt || project.title,
      });
    }
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || "https://beckett.vercel.app";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteUrl}/projects/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/projects/${slug}`,
      siteName: "Ryan Beckett",
      images: ogImages,
      type: hasArticle ? "article" : "website",
      ...(hasArticle
        ? {
            publishedTime: project.createdAt,
            modifiedTime: project.updatedAt,
            authors: ["Ryan Beckett"],
            section: "Projects",
            tags: project.tags?.map((t) => t.label).filter(Boolean) as string[],
          }
        : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImages.map((img) => img.url),
    },
  };
}

export default async function ProjectSinglePage({ params }: PageProps) {
  const { slug } = await params;
  const payload = await getCachedPayload();

  const { docs: projects } = (await payload.find({
    collection: "projects",
    where: {
      "projectBehaviour.slug": {
        equals: slug,
      },
    },
    limit: 1,
  })) as unknown as { docs: Project[] };

  if (!projects.length) {
    notFound();
  }

  const project = projects[0];
  const hasArticle = !!project.projectArticle;
  const hasImages = !!project.images?.length;
  const siteUrl =
    process.env.NEXT_PUBLIC_SERVER_URL || "https://beckett.vercel.app";

  const featuredImg = project.projectDetails?.featuredImage;
  let featuredImgUrl = "";
  if (featuredImg && typeof featuredImg === "object" && featuredImg.url) {
    featuredImgUrl = featuredImg.url;
  }

  const tags = project.tags?.map((t) => t.label).filter(Boolean) || [];
  const subtitle = project.projectDetails?.subtitle || "";
  const description = project.projectDetails?.description || "";

  const projectSchema = {
    "@context": "https://schema.org",
    "@type": hasArticle ? "Article" : "CreativeWork",
    name: project.title,
    description: project.projectDetails?.description,
    url: `${siteUrl}/projects/${slug}`,
    datePublished: project.createdAt,
    dateModified: project.updatedAt,
    author: {
      "@type": "Person",
      name: "Ryan Beckett",
    },
    ...(hasArticle
      ? {
          headline: project.title,
          mainEntityOfPage: {
            "@type": "WebPage",
            "@id": `${siteUrl}/projects/${slug}`,
          },
        }
      : {}),
  };

  return (
    <>
      <JsonLd data={projectSchema} />
      <main className="min-h-screen bg-bg-dark text-white py-20 px-4 md:px-8">
        <article className="max-w-5xl mx-auto flex flex-col items-start">
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="tracking-widest text-[11px] font-bold uppercase rounded-none"
          >
            <Link href="/projects" className="flex items-center gap-2">
              <Undo2 className="w-3.5 h-3.5 shrink-0" />
              Return to Project Archive
            </Link>
          </Button>

          {/* PROJECT TITLE & SUBTITLE */}
          <h1 className="uppercase font-roboto font-bold tracking-[5%] text-[30px] md:text-[38px] leading-tight mt-10 text-white text-left w-full">
            {project.title}
            {subtitle && (
              <>
                <span className="text-crimson-bright font-normal mx-2">
                  {"//"}
                </span>
                <br className="block md:hidden" />
                <span className="font-light text-base-light text-[22px] md:text-[30px] leading-tight">
                  {subtitle}
                </span>
              </>
            )}
          </h1>

          {/* PUBLISHED DATE */}
          <p className="font-roboto font-light text-[13px] tracking-widest text-zinc-400 mt-4 uppercase text-left w-full">
            Published{" "}
            <span className="text-crimson-bright font-normal mx-1">{"//"}</span>{" "}
            {new Date(project.createdAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </p>

          {/* INFORMATION GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12 mt-16 w-full text-left">
            {/* 01 // DESCRIPTION */}
            <div className="space-y-4">
              <h2 className="font-roboto font-bold tracking-[5%] text-[16px] text-white uppercase flex items-center gap-2">
                <span className="text-crimson-bright">01</span>
                <span className="text-crimson-bright font-normal">{"//"}</span>
                Description
              </h2>
              <p className="font-roboto font-light text-[14.5px] leading-relaxed text-zinc-300">
                {description}
              </p>
            </div>

            {/* 02 // TAGS */}
            <div className="space-y-4">
              <h2 className="font-roboto font-bold tracking-[5%] text-[16px] text-white uppercase flex items-center gap-2">
                <span className="text-crimson-bright">02</span>
                <span className="text-crimson-bright font-normal">{"//"}</span>
                Tags
              </h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-crimson-dark text-base-light px-2.5 py-0.5 text-xs font-roboto-flex font-medium uppercase"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* 04 // TECHNOLOGIES */}
            <div className="space-y-4">
              <h2 className="font-roboto font-bold tracking-[5%] text-[16px] text-white uppercase flex items-center gap-2">
                <span className="text-crimson-bright">04</span>
                <span className="text-crimson-bright font-normal">{"//"}</span>
                Technologies
              </h2>
              <ul className="list-disc list-outside ml-5 space-y-1.5 font-roboto font-light text-[14.5px] text-zinc-300">
                {project.technologies?.map((tech, i) => (
                  <li key={i} className="pl-1">
                    {tech.label}
                  </li>
                ))}
              </ul>
            </div>

            {/* 05 // EXTERNAL LINKS */}
            <div className="space-y-4">
              <h2 className="font-roboto font-bold tracking-[5%] text-[16px] text-white uppercase flex items-center gap-2">
                <span className="text-crimson-bright">05</span>
                <span className="text-crimson-bright font-normal">{"//"}</span>
                External Links
              </h2>
              <div className="flex flex-col gap-2 font-roboto font-light text-[14.5px] text-zinc-300">
                {project.externalLinks?.map((link, i) => (
                  <a
                    key={i}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-crimson-bright transition-colors flex items-center gap-1.5 w-fit"
                  >
                    {link.label}{" "}
                    <ExternalLink size={14} className="opacity-75" />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 03 // OVERVIEW */}
          {project.projectDetails?.overview && (
            <div className="space-y-4 mt-16 w-full text-left">
              <h2 className="font-roboto font-bold tracking-[5%] text-[16px] text-white uppercase flex items-center gap-2">
                <span className="text-crimson-bright">03</span>
                <span className="text-crimson-bright font-normal">{"//"}</span>
                Overview
              </h2>
              <div className="font-roboto font-light text-[14.5px] leading-relaxed text-zinc-300 project-overview-content">
                <RichText
                  data={project.projectDetails?.overview as any}
                  converters={jsxConverters}
                />
              </div>
            </div>
          )}

          {/* IMAGE / GALLERY SECTION */}
          <div className="mt-16 w-full">
            {hasImages ? (
              <div className="w-full flex items-center justify-center">
                <ProjectGallery images={project.images} />
              </div>
            ) : (
              featuredImgUrl && (
                <div className="relative w-full aspect-video overflow-hidden border border-zinc-800">
                  <Image
                    src={featuredImgUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 1024px"
                    priority
                  />
                </div>
              )
            )}
          </div>

          {/* 06 // ARTICLE */}
          {hasArticle && project.projectArticle && (
            <div className="space-y-4 mt-20 w-full text-left">
              <h2 className="font-roboto font-bold tracking-[5%] text-[16px] text-white uppercase flex items-center gap-2">
                <span className="text-crimson-bright">06</span>
                <span className="text-crimson-bright font-normal">{"//"}</span>
                Article
              </h2>
              <hr className="border-zinc-850 opacity-40 my-4 w-full" />
              <div className="font-roboto font-light text-[14.5px] leading-relaxed text-zinc-300 article-content">
                <RichText
                  data={project.projectArticle}
                  converters={jsxConverters}
                />
              </div>
            </div>
          )}
        </article>
      </main>
      <Footer />
    </>
  );
}
