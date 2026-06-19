import React from "react";
import {
  defaultJSXConverters,
  JSXConverters,
} from "@payloadcms/richtext-lexical/react";
import { RichText } from "@payloadcms/richtext-lexical/react";
import Image from "next/image";
import {
  Media,
  TwoColumnBlock as TwoColumnBlockType,
  ThreeColumnBlock as ThreeColumnBlockType,
} from "@/payload-types";

import { ArticleImage } from "@/components/ArticleImage";
import { Button } from "@/components/ui/button";

const SubBlockRenderer = ({ block }: { block: any }) => {
  switch (block.blockType) {
    case "text-block":
      return block.content ? (
        <RichText data={block.content} converters={jsxConverters} />
      ) : null;
    case "image-block": {
      const media = block.image;
      if (!media || typeof media === "number" || !media.url) return null;

      // Extract or fallback to native dimensions so the browser knows the aspect ratio
      const nativeWidth = media.width || 1600;
      const nativeHeight = media.height || 1000;

      return (
        <ArticleImage
          src={media.url}
          alt={media.alt || ""}
          width={nativeWidth}
          height={nativeHeight}
        />
      );
    }
    case "quote-block":
      return (
        <blockquote className="border-l-4 border-crimson-bright bg-bg-light pl-6 py-4 my-8 italic text-zinc-300 rounded-none relative">
          <p className="text-xl font-roboto font-light leading-relaxed">"{block.quote}"</p>
          {block.author && (
            <cite className="block mt-2 text-sm not-italic opacity-60 font-roboto font-normal uppercase tracking-wider text-zinc-400">
              — {block.author}
            </cite>
          )}
        </blockquote>
      );
    case "list-block": {
      const Tag = block.type === "ordered" ? "ol" : "ul";
      return (
        <Tag
          className={`list-outside ml-6 my-4 space-y-2 font-roboto font-light text-[14.5px] leading-relaxed text-zinc-300 ${
            block.type === "ordered"
              ? "list-decimal marker:text-crimson-bright/60 marker:font-bold"
              : "list-disc marker:text-crimson-bright/60"
          }`}
        >
          {block.items?.map((item: any, i: number) => (
            <li key={i}>{item.item}</li>
          ))}
        </Tag>
      );
    }
    case "code-block":
      return (
        <div className="my-6 rounded-none overflow-hidden bg-bg-light border border-zinc-800">
          <div className="px-4 py-2 bg-black/40 border-b border-zinc-850 flex justify-between items-center">
            <span className="text-xs font-mono text-zinc-450 uppercase tracking-widest">
              {block.language}
            </span>
          </div>
          <pre className="p-4 overflow-x-auto">
            <code className="text-sm font-mono text-zinc-200">
              {block.code}
            </code>
          </pre>
        </div>
      );
    default:
      return null;
  }
};

export const jsxConverters: JSXConverters = {
  ...defaultJSXConverters,
  blocks: {
    ...defaultJSXConverters.blocks,
    "two-column": ({ node }: { node: any }) => {
      const { leftColumn, rightColumn } = node.fields;
      return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-12 my-0">
          <div className="flex flex-col gap-4">
            {leftColumn?.map((block: any, i: number) => (
              <SubBlockRenderer key={i} block={block} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {rightColumn?.map((block: any, i: number) => (
              <SubBlockRenderer key={i} block={block} />
            ))}
          </div>
        </div>
      );
    },
    "three-column": ({ node }: { node: any }) => {
      const { leftColumn, centerColumn, rightColumn } = node.fields;
      return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 my-0">
          <div className="flex flex-col gap-4">
            {leftColumn?.map((block: any, i: number) => (
              <SubBlockRenderer key={i} block={block} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {centerColumn?.map((block: any, i: number) => (
              <SubBlockRenderer key={i} block={block} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {rightColumn?.map((block: any, i: number) => (
              <SubBlockRenderer key={i} block={block} />
            ))}
          </div>
        </div>
      );
    },
    "Call To Action": ({ node }: { node: any }) => {
      const { heading, link } = node.fields;
      return (
        <div className="my-12 p-8 rounded-none bg-bg-light border border-zinc-800 flex flex-col items-center text-center gap-6">
          <h3 className="text-2xl font-roboto font-bold uppercase text-white tracking-widest">{heading}</h3>
          {link && (
            <Button asChild size="lg" className="tracking-widest text-[11px] font-bold uppercase rounded-none">
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Get Started
              </a>
            </Button>
          )}
        </div>
      );
    },
  },
  code: ({ node }: { node: any }) => {
    return (
      <pre className="my-6 p-4 rounded-none bg-bg-light border border-zinc-800 overflow-x-auto">
        <code className="text-sm font-mono text-zinc-200">
          {node.fields?.code || node.text}
        </code>
      </pre>
    );
  },
  upload: ({ node }: { node: any }) => {
    const media = node.value as Media;
    if (!media || typeof media === "number" || !media.url) return null;

    if (media.mimeType?.startsWith("image/")) {
      return (
        <ArticleImage
          src={media.url}
          alt={media.alt || ""}
          width={1600}
          height={1000}
          className="max-w-[768px] mx-auto"
          captionClassName="max-w-[768px] mx-auto"
        />
      );
    }
    return null;
  },
};
