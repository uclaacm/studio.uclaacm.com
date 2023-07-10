import { defineConfig } from "tinacms";

const host = process.env.HOST || "http://localhost:3000"

const isLocal = process.env.TINA_PUBLIC_IS_LOCAL === "true";

const config = defineConfig({
  contentApiUrlOverride: `${host}/api/gql`,
  // admin: {
  //   auth: {
  //     useLocalAuth: process.env.TINA_PUBLIC_IS_LOCAL === "true",

  //     // Uncomment this to use custom auth
  //     customAuth: true,
  //     authenticate: async () => {
  //       // Add your authentication logic here
  //       localStorage.setItem(LOCAL_KEY, "some-token");
  //     },
  //     getToken: async () => {
  //       // Add your own getting token
  //       const token = localStorage.getItem(LOCAL_KEY);
  //       if (!token) {
  //         return { id_token: "" };
  //       }
  //       return { id_token: token };
  //     },
  //     getUser: async () => {
  //       // Add your own getting user
  //       // if this function returns a truthy value, the user is logged in and if it rutnrs
  //       if (localStorage.getItem(LOCAL_KEY)) {
  //         return true;
  //       }
  //       return false;
  //     },
  //     logout: async () => {
  //       // add your own logout logic
  //       localStorage.removeItem(LOCAL_KEY);
  //     },
  //   },
  // },
  clientId: process.env.NEXT_PUBLIC_TINA_CLIENT_ID!,
  branch:
    process.env.NEXT_PUBLIC_TINA_BRANCH! || // custom branch env override
    process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF! || // Vercel branch env
    process.env.HEAD!, // Netlify branch env
  token: process.env.TINA_TOKEN! || "foo",
  media: {
    ...isLocal ? {
      tina: {
        mediaRoot: "media",
        publicFolder: "public",
      }
    } : {
      loadCustomStore: async () => {
        const pack = await import("next-tinacms-cloudinary");
        return pack.TinaCloudCloudinaryMediaStore;
      },
    }
  },
  build: {
    publicFolder: "public", // The public asset folder for your framework
    outputFolder: "admin", // within the public folder
  },
  schema: {
    collections: [

      {
        label: "Byte Sized Tutorials",
        name: "tutorial",
        path: "tutorials",
        fields: [
          {
            type: "string",
            label: "Title",
            name: "title",
            required: true,
          },
          {
            type: "string",
            label: "Author",
            name: "author",
            description: `
              Author metadata.
              The name of the document's author.
            `,
            required: true,
          },
          {
            type: "string",
            label: "Description",
            name: "description",
            description: `
              Description metadata.
              A short and accurate summary of the content of the page.
              Several browsers, like Firefox and Opera, use this as the default description of bookmarked pages.
            `,
            required: true,
          },
          {
            type: "image",
            label: "Image",
            name: "image",
            description: `Image`,
            required: true,
          },
          {
            type: "string",
            label: "Keywords",
            name: "keywords",
            description: `
              Keywords metadata.
            `,
            list: true,
          },
          {
            type: "object",
            label: "Open Graph Metadata",
            name: "og",
            description: `Metadata used by the OpenGraph protocol. See https://ogp.me/`,
            fields: [
              {
                type: "string",
                label: "Type",
                name: "type",
                description: `The type of your object, e.g., "video.movie". Depending on the type you specify, other properties may also be required.`,
                options: [
                  {
                    value: "video.movie",
                    label: "Video",
                  },
                  {
                    value: "article",
                    label: "Article",
                  },
                  {
                    value: "website",
                    label: "Website"
                  }
                ],
                required: true,
              },
            ]
          },
          {
            type: "string",
            label: "Body",
            name: "body",
            isBody: true,
            required: true,
          },
        ]
      }
    ],
  },
});

export default config;
