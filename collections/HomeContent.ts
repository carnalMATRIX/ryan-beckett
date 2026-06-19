import type { CollectionConfig } from "payload";

export const HomeContent: CollectionConfig = {
  slug: "home-content",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "updatedAt"],
  },
  fields: [
    {
      name: "title",
      type: "text",
      defaultValue: "Home Page Content",
      admin: {
        hidden: true,
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          label: "Hero",
          fields: [
            {
              type: "row",
              fields: [
                {
                  name: "heroKeyword1",
                  type: "text",
                  label: "Keyword 1 (e.g., Developer)",
                  required: true,
                },
                {
                  name: "heroKeyword2",
                  type: "text",
                  label: "Keyword 2 (e.g., UX Designer)",
                  required: true,
                },
                {
                  name: "heroKeyword3",
                  type: "text",
                  label: "Keyword 3 (e.g., Photographer)",
                  required: true,
                },
              ],
            },
            {
              name: "heroDescription",
              type: "textarea",
              label: "Description Text",
              required: true,
            },
          ],
        },
        {
          label: "About",
          fields: [
            {
              name: "aboutCells",
              type: "array",
              label: "About Cells",
              minRows: 1,
              maxRows: 6,
              required: true,
              fields: [
                {
                  name: "heading",
                  type: "text",
                  required: true,
                },
                {
                  name: "content",
                  type: "textarea",
                  required: true,
                },
              ],
            },
            {
              name: "aboutDeveloperImage",
              type: "upload",
              relationTo: "media",
              required: true,
              label: "Left",
            },
            {
              name: "aboutStudentImage",
              type: "upload",
              relationTo: "media",
              required: true,
              label: "Centre",
            },
            {
              name: "aboutCreativeImage",
              type: "upload",
              relationTo: "media",
              required: true,
              label: "Right",
            },
          ],
        },
        {
          label: "Education",
          fields: [
            {
              name: "educationAsideImage",
              type: "upload",
              relationTo: "media",
              label: "Aside Background Image",
              required: true,
            },
            {
              name: "educationQuote",
              type: "text",
              required: true,
            },
            {
              name: "educationQuoteAuthor",
              type: "text",
              required: true,
            },
            {
              name: "educationBodyText",
              type: "richText",
              required: true,
            },
            {
              name: "extracurricularActivities",
              type: "array",
              label: "Extracurricular Activities",
              fields: [
                {
                  name: "activityName",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              name: "educationItems",
              type: "array",
              label: "Education Items",
              fields: [
                {
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  name: "completionYears",
                  type: "text",
                  required: true,
                },
                {
                  name: "focus",
                  type: "text",
                  required: true,
                },
                {
                  name: "providerLogo",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                {
                  name: "primarySubject",
                  type: "text",
                  required: true,
                },
                {
                  name: "secondarySubject",
                  type: "text",
                  required: true,
                },
                {
                  name: "tertiarySubject",
                  type: "text",
                  required: true,
                },
                {
                  name: "mission",
                  type: "richText",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "Inspiration",
          fields: [
            {
              name: "inspirationBodyText",
              type: "textarea",
              label: "Section Body Text",
              required: true,
            },
            {
              name: "inspirations",
              type: "array",
              fields: [
                {
                  name: "title",
                  type: "text",
                  required: true,
                },
                {
                  name: "url",
                  type: "text",
                  required: true,
                },
              ],
            },
          ],
        },
        {
          label: "Social",
          fields: [
            {
              name: "spotifyDescription",
              type: "textarea",
              label: "Spotify Description",
              required: true,
            },
          ],
        },
        {
          label: "Contact",
          fields: [
            {
              name: "contactDescription",
              type: "textarea",
              required: true,
            },
            {
              name: "location",
              type: "text",
              required: true,
            },
            {
              name: "email",
              type: "text",
              required: true,
            },
          ],
        },
      ],
    },
  ],
};
