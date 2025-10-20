/**
 * This file implements bindings in Bindings.
 * This is where you would modify *specific* bindings, such as what properties
 * are set from the Officers table, or from which property they are set.
 *
 * To create a binding, first create a Schema type.
 * This is the typescript type for your binding that will be the result of parsing the page.
 * Each field in the schema must be a supported type.
 * @see {PropertyTypeName} for supported types.
 *
 * After that, create the bindings. This is an object whose keys are the keys of your schema
 * and whose values are a @see {SchemaTypeBinding}. This specifies what the source of the
 * data is, the format of it, and where it can be found. Right now, it supports string IDs and
 * properties, with types like string, strings, numbers, images, and urls.
 * @see {NotionSchemaBinding}
 *
 * After that, you can optionally create a function that calls @see {querySchema} for your schema type
 * with the bindings and the database
 * @see {getOfficers} for an example
 */

import { PRODUCTION } from "~/Env";
import {
  NotionSchemaBinding,
  querySchema,
  PropertyTypeName,
  SchemaTypeBinding,
  querySchemaWithID,
  NotionSchema,
} from "./bindings";
import { Block } from "./blocks";
import {
  getPageBlocks,
  GetPagesInDatabaseParams,
  PropertyFilter,
} from "./core";

import { databaseIDs } from "./databases";

export type NotionSchemaWithBlocks<T extends NotionSchema> = T & {
  blocks: Block[];
};

export type NotionOfficerSchema = {
  id: string;
  name: string;
  boardStatus: string;
  majors: string[] | null;
  minors: string[] | null;
  roles: string[] | null;
  selfIntro: string | null;
  gradYear: number | null;
  yearsActive: string | null;
  image: string | null;
  category: string | null;
  title: string | null;
  favoriteGame: string | null;
};

const officerSchemaBinding = {
  id: { source: "id", type: "string" },
  name: { source: "property", type: "string", propertyName: "Name" },
  boardStatus: {
    source: "property",
    type: "string",
    propertyName: "Board Status",
  },
  majors: {
    source: "property",
    type: "strings",
    propertyName: "Majors",
  },
  minors: {
    source: "property",
    type: "strings",
    propertyName: "Minors",
  },
  roles: { source: "property", type: "strings", propertyName: "Roles" },
  selfIntro: { source: "property", type: "string", propertyName: "Self intro" },
  gradYear: { source: "property", type: "number", propertyName: "Grad Year" },
  yearsActive: {
    source: "property",
    type: "string",
    propertyName: "Years Active",
  },
  image: { source: "property", type: "image", propertyName: "Image" },
  category: {
    source: "property",
    type: "string",
    propertyName: "Website Category",
  },
  title: { source: "property", type: "string", propertyName: "Website Title" },
  favoriteGame: {
    source: "property",
    type: "string",
    propertyName: "Favorite Game",
  },
  // note: we use satisfies to be able to still use static type information not encoded by DatabaseTypes
  // eg. so we can do officerSchemaTypes.name.propertyName instead of having to cast
} satisfies NotionSchemaBinding<NotionOfficerSchema>;

export type NotionSocialLinksSchema = {
  social: string;
  url: string;
  officer: string;
};

const socialLinksBinding: NotionSchemaBinding<NotionSocialLinksSchema> = {
  social: { source: "property", propertyName: "Social", type: "string" },
  url: { source: "property", propertyName: "URL", type: "url" },
  officer: { source: "property", propertyName: "Officer", type: "string" },
};

export type NotionArticleSchema = {
  notionID: string;
  id: string;
  date: string;
  category: string;
  image?: string;
  title: string;
  description: string;
  authors: string[];
  tags: string[];
  published: boolean;
};

const articleBinding = {
  notionID: { source: "id", type: "string" },
  id: { source: "property", propertyName: "ID", type: "string" },
  date: { source: "property", propertyName: "Date", type: "date" },
  category: { source: "property", propertyName: "Category", type: "string" },
  image: { source: "property", propertyName: "Image", type: "image" },
  title: { source: "property", propertyName: "Title", type: "string" },
  description: {
    source: "property",
    propertyName: "Description",
    type: "string",
  },
  authors: { source: "property", propertyName: "Authors", type: "strings" },
  tags: { source: "property", propertyName: "Tags", type: "strings" },
  published: {
    source: "property",
    propertyName: "Published",
    type: "checkbox",
  },
} satisfies NotionSchemaBinding<NotionArticleSchema>;

export type NotionEventSchema = {
  name: string,
  date: string,
  category: string,
  subcategory: string,
  description: string,
};

const eventSchemaBinding = {
  name: { source: "property", propertyName: "Name", type: "string" },
  date: { source: "property", propertyName: "Date", type: "date" },
  category: { source: "property", propertyName: "Category", type: "string" },
  subcategory: { source: "property", propertyName: "Subcategory", type: "string" },
  description: { source: "property", propertyName: "Description", type: "string" },
} satisfies NotionSchemaBinding<NotionEventSchema>;

// Database of a few upcoming events for the front page
export type CurrentEventsSchema = {
  title: string,
  date: string,
  location: string,
  description: string,
};

const currentEventSchemaBinding = {
  title: { source: 'property', propertyName: 'Event Title', type: 'string' },
  date: { source: 'property', propertyName: 'Event Date/Time', type: 'string' },
  location: { source: 'property', propertyName: 'Event Location', type: 'string' },
  description: { source: 'property', propertyName: 'Description', type: 'string' },
} satisfies NotionSchemaBinding<CurrentEventsSchema>;

export async function getOfficers() {
  return querySchema<NotionOfficerSchema>(officerSchemaBinding, {
    database_id: databaseIDs.officers,
    sorts: [
      {
        property: officerSchemaBinding.name.propertyName,
        direction: "ascending",
      },
    ],
  });
}

export async function getOfficerSocialLinks() {
  return querySchema<NotionSocialLinksSchema>(socialLinksBinding, {
    database_id: databaseIDs.socialLinks,
  });
}

const articleCategorySelectMap = {
  byteSizedTutorials: "Byte Sized Tutorials",
  scoop: "Studio Scoop",
  sblog: "Sblog", 
  miscellaneous: "Miscellaneous",
} as const;

export type ArticleCategory = keyof typeof articleCategorySelectMap;

export type GetArticlesOptions = {
  databaseId?: string;
  category?: ArticleCategory;
};

export async function getArticles({
  databaseId,
  category,
}: GetArticlesOptions = {}) {
  databaseId ??= databaseIDs.debugArticles;

  const publishedFilter: PropertyFilter = PRODUCTION
    ? {
        type: "checkbox",
        property: articleBinding.published.propertyName,
        checkbox: {
          equals: true,
        },
      }
    : undefined;

  const categoryFilter: PropertyFilter = category
    ? {
        type: "select",
        property: articleBinding.category.propertyName,
        select: {
          equals: articleCategorySelectMap[category],
        },
      }
    : undefined;

  const filter =
    publishedFilter && categoryFilter
      ? { and: [publishedFilter, categoryFilter] }
      : publishedFilter || categoryFilter;

  return querySchema<NotionArticleSchema>(articleBinding, {
    database_id: databaseId,
    sorts: [
      {
        property: "Date",
        direction: "descending",
      },
    ],
    filter,
  });
}

export type GetArticleOptions = {
  databaseId?: string;
  category?: ArticleCategory;
  id: string;
};

export async function getArticle({
  id,
  databaseId,
  category,
}: GetArticleOptions): Promise<NotionSchemaWithBlocks<NotionArticleSchema>> {
  databaseId ??= databaseIDs.debugArticles;
  const filterList: PropertyFilter[] = [
    ...(category
      ? [
          {
            type: "select",
            property: articleBinding.category.propertyName,
            select: {
              equals: articleCategorySelectMap[category],
            },
          } as const,
        ]
      : []),
    {
      type: "title",
      property: articleBinding.id.propertyName,
      title: {
        equals: id,
      },
    },
  ];

  const articles = await querySchemaWithID<NotionArticleSchema>(
    articleBinding,
    {
      database_id: databaseId,
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
      filter: { and: filterList },
    },
  );

  if (articles.length === 0) return null;

  const article = articles[0];

  const blocks = await getPageBlocks({ pageID: article.notionID });

  return {
    ...article,
    blocks,
  };
}

export type GetEventsOptions = {
  databaseId?: string,
  category?: string,
  after?: Date,
};

export async function getEvents(options: GetEventsOptions = {}) {
  const {
    databaseId = databaseIDs.events,
    category = undefined,
    after = undefined,
  } = options;

  const filters: PropertyFilter[] = [];

  if(category) {
    filters.push({
      type: "select",
      property: eventSchemaBinding.category.propertyName,
      select: {
        equals: category,
      }
    });
  }

  if(after){
    filters.push({
      type: "date",
      property: eventSchemaBinding.date.propertyName,
      date: {
        after: after.toISOString(),
      }
    });
  }

  return querySchema<NotionEventSchema>(eventSchemaBinding, {
    database_id: databaseId,
    sorts: [
      {
        property: eventSchemaBinding.date.propertyName,
        direction: "ascending",
      },
    ],
    filter: {
      and: filters,
    }
  });
}

export async function getCurrentEvents() {
  return querySchema<CurrentEventsSchema>(currentEventSchemaBinding, {
    database_id: databaseIDs.currentEvents,
  });
}