import { Block } from "payload";

/**
 * SUB-BLOCKS
 * These are the content types available within each column
 */

const TextBlock: Block = {
  slug: "text-block",
  labels: { singular: "Text", plural: "Text Blocks" },
  fields: [{ name: "content", type: "richText" }],
};

const ImageBlock: Block = {
  slug: "image-block",
  labels: { singular: "Image", plural: "Image Blocks" },
  fields: [
    { name: "image", type: "upload", relationTo: "media", required: true },
  ],
};

const QuoteBlock: Block = {
  slug: "quote-block",
  labels: { singular: "Quote", plural: "Quotes" },
  fields: [
    { name: "quote", type: "textarea", required: true, label: "Quote Text" },
    { name: "author", type: "text", label: "Author / Citation" },
  ],
};

const ListBlock: Block = {
  slug: "list-block",
  labels: { singular: "List", plural: "Lists" },
  fields: [
    {
      name: "type",
      type: "select",
      defaultValue: "unordered",
      options: [
        { label: "Bullet Point (Unordered)", value: "unordered" },
        { label: "Numbered (Ordered)", value: "ordered" },
      ],
    },
    {
      name: "items",
      type: "array",
      required: true,
      fields: [{ name: "item", type: "text", required: true }],
    },
  ],
};

const CodeBlock: Block = {
  slug: "code-block",
  labels: { singular: "Code Snippet", plural: "Code Snippets" },
  fields: [
    {
      name: "language",
      type: "select",
      defaultValue: "typescript",
      options: [
        { label: "TypeScript", value: "typescript" },
        { label: "JavaScript", value: "javascript" },
        { label: "HTML/CSS", value: "html-css" },
        { label: "JSON", value: "json" },
      ],
    },
    {
      name: "code",
      type: "code", // Uses Payload's built-in Monaco editor
      required: true,
      admin: {
        language: "typescript",
      },
    },
  ],
};

// Common array for internal column blocks to avoid repetition
const columnBlocks = [TextBlock, ImageBlock, QuoteBlock, ListBlock, CodeBlock];

/**
 * MAIN LAYOUT BLOCKS
 */

export const TwoColumnBlock: Block = {
  slug: "two-column",
  interfaceName: "TwoColumnBlock",
  labels: {
    singular: "Two Columns",
    plural: "Two Column Layouts",
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "leftColumn",
          label: "Left Column",
          type: "blocks",
          blocks: columnBlocks,
          admin: { width: "50%" },
        },
        {
          name: "rightColumn",
          label: "Right Column",
          type: "blocks",
          blocks: columnBlocks,
          admin: { width: "50%" },
        },
      ],
    },
  ],
};

export const ThreeColumnBlock: Block = {
  slug: "three-column",
  interfaceName: "ThreeColumnBlock",
  labels: {
    singular: "Three Columns",
    plural: "Three Column Layouts",
  },
  fields: [
    {
      type: "row",
      fields: [
        {
          name: "leftColumn",
          label: "Left Column",
          type: "blocks",
          blocks: columnBlocks,
          admin: { width: "33.33%" },
        },
        {
          name: "centerColumn",
          label: "Center Column",
          type: "blocks",
          blocks: columnBlocks,
          admin: { width: "33.33%" },
        },
        {
          name: "rightColumn",
          label: "Right Column",
          type: "blocks",
          blocks: columnBlocks,
          admin: { width: "33.33%" },
        },
      ],
    },
  ],
};
