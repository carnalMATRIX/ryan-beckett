import type { CollectionConfig } from "payload";

export const ProjectsContent: CollectionConfig = {
  slug: "projects-content",
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      defaultValue: "Project Archive",
      label: "Main Header Title",
    },
    {
      name: "description",
      type: "textarea",
      required: true,
      label: "Header Description",
      defaultValue:
        "Some of my past projects, ranging from Web Development to Photography. Filter through to find exactly what you're looking for, or get in touch to find out more.",
    },
  ],
};
