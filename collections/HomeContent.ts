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
              name: "heroCreativeLabel",
              type: "text",
              label: "Creative Label (e.g., Digital Creative)",
              required: true,
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
          label: "Tech Stacks",
          fields: [
            {
              name: "techStacks",
              type: "array",
              fields: [
                {
                  name: "name",
                  type: "text",
                  label: "Stack Name (e.g., Web / Dev)",
                  required: true,
                },
                {
                  name: "theme",
                  type: "select",
                  label: "Theme",
                  options: [
                    { label: "Purple", value: "purple" },
                    { label: "Green", value: "green" },
                    { label: "Red", value: "red" },
                    { label: "Blue", value: "blue" },
                    { label: "Orange", value: "orange" },
                  ],
                  required: true,
                },
                {
                  name: "items",
                  type: "array",
                  label: "Stack Items",
                  fields: [
                    {
                      name: "label",
                      type: "text",
                      required: true,
                    },
                    {
                      name: "icon",
                      type: "upload",
                      relationTo: "media",
                      required: true,
                    },
                  ],
                },
              ],
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
                  name: "description",
                  type: "text",
                  required: true,
                },
                {
                  name: "image",
                  type: "upload",
                  relationTo: "media",
                  required: true,
                },
                {
                  name: "link",
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
              name: "socialCards",
              type: "array",
              label: "Social Cards",
              fields: [
                {
                  name: "platform",
                  type: "select",
                  options: [
                    { label: "GitHub", value: "github" },
                    { label: "LinkedIn", value: "linkedin" },
                    { label: "Instagram", value: "instagram" },
                  ],
                  required: true,
                },
                {
                  name: "link",
                  type: "text",
                  required: true,
                },
              ],
            },
            {
              name: "spotifyDescription",
              type: "textarea",
              label: "Spotify Description",
              required: true,
            },
            {
              name: "spotifyProfileUrl",
              type: "text",
              label: "Spotify Profile URL",
              required: true,
            },
            {
              name: "spotifyListenUrl",
              type: "text",
              label: "Spotify Listen URL",
              required: true,
            },
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
