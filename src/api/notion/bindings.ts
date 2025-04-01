/**
 * By binding, I mean:
 * 		We have TypeScript types (a NotionSchema) and we have a Notion database
 * 		Bindings (NotionSchemaBinding) map the database pages to a TypeScript type
 * 		This requires specifying data type (since no runtime type information) and
 * 		data sources (eg. properties or IDs)
 *
 * The way this file works is:
 * 		There are helpers to parse Notion properties
 * 			richTextToString
 * 			propertyTryGetStrings
 * 			propertyTryGetString
 * 			propertyTryGetNumber
 * 			propertyTryGetUrl
 * 			propertyTryGetImage
 * 			propertyTryGet (routes to the above)
 * 		There are binding types
 * 			NotionSchema
 * 			NotionSchemaBinding
 */

import {
  PageObjectResponse,
  RichTextItemResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { getPagesInDatabase, GetPagesInDatabaseParams } from "./core";

export type NotionSchema = Record<any, any>;

/**
 * For a schema T, a binding that maps
 * each key of T to a specifier noting
 * how to populate T from notion.
 * It supports IDs and properties that can
 * be parsed as string, string[], and number
 */
export type NotionSchemaBinding<T extends NotionSchema> = {
  [K in keyof T]: {
    // this forces a property with key K and type P to
    // have a `type` value that can be parsed to type P
    // ie. if T["name"] is string, then `type` has type
    // "string" | "image" | "url", so it cannot be, eg.
    // "number"
    type: PropertyTypeName<T[K]>;
  } & SchemaTypeBinding;
};

type PropertyTypeNamesMap = {
  string: string;
  image: string;
  url: string;
  date: string;
  strings: string[];
  number: number;
  checkbox: boolean;
};

export type PropertyTypeName<T = any> = {
  [P in keyof PropertyTypeNamesMap]: PropertyTypeNamesMap[P] extends T
    ? P
    : never;
}[keyof PropertyTypeNamesMap];

export type SchemaTypeBinding =
  | {
      source: "property";
      propertyName: string;
      type:
        | "string"
        | "strings"
        | "number"
        | "image"
        | "url"
        | "date"
        | "checkbox";
      // Property name on the table this property refers to
      relation?: {
        propertyName: string;
      };
    }
  | {
      source: "id";
      type: "string";
    };

export type PropertyType = PropertyTypeNamesMap[PropertyTypeName];

export function richTextToString(richText: RichTextItemResponse[]) {
  return richText.reduce((acc, cur) => acc + cur.plain_text, "");
}

export function propertyTryGetStrings(
  prop: PageObjectResponse["properties"][string],
): Array<string> | null {
  if (prop.type === "multi_select") {
    return prop.multi_select.map((v) => v.name);
  } else if (prop.type === "relation") {
    return prop.relation.map((v) => v.id);
  }
  return null;
}

export function propertyTryGetString(
  prop: PageObjectResponse["properties"][string],
): string | null {
  if (prop.type === "title") {
    return richTextToString(prop.title);
  } else if (prop.type === "rich_text") {
    return richTextToString(prop.rich_text);
  } else if (prop.type === "select") {
    return prop.select?.name ?? null;
  } else if (prop.type === "relation") {
    if (prop.relation.length === 0) return null;
    return prop.relation[0].id;
  }
  return null;
}

export function propertyTryGetNumber(
  prop: PageObjectResponse["properties"][string],
): number | null {
  if (prop.type === "number") {
    return prop.number;
  }
  return null;
}

export function propertyTryGetUrl(
  prop: PageObjectResponse["properties"][string],
): string | null {
  if (prop.type === "files" && prop.files.length > 0) {
    return prop.files[0].name;
  } else if (prop.type === "url") {
    return prop.url;
  }
  return null;
}

export function propertyTryGetImage(
  prop: PageObjectResponse["properties"][string],
): string | null {
  if (prop.type === "files" && prop.files.length > 0) {
    const file = prop.files[0];
    if (file.type === "external") return file.external.url;
    else return file.file.url;
  }
  return null;
}

export function propertyTryGetDate(
  prop: PageObjectResponse["properties"][string],
): string | null {
  if (prop.type === "date") {
    const date = prop.date?.start ?? prop.date?.end ?? null;
    return date;
  }
  return null;
}

export function propertyTryGetCheckbox(
  prop: PageObjectResponse["properties"][string],
): boolean | null {
  if (prop.type === "checkbox") {
    return prop.checkbox;
  }
  return null;
}

export async function propertyTryGet<T extends PropertyTypeName>(
  prop: PageObjectResponse["properties"][string],
  type: T,
): Promise<PropertyType | null> {
  if (!prop) return undefined;
  if (type === "number") {
    return propertyTryGetNumber(prop) as PropertyType;
  } else if (type === "string") {
    return propertyTryGetString(prop) as PropertyType;
  } else if (type === "strings") {
    return propertyTryGetStrings(prop) as PropertyType;
  } else if (type === "url") {
    return propertyTryGetUrl(prop) as PropertyType;
  } else if (type === "image") {
    return propertyTryGetImage(prop) as PropertyType;
  } else if (type === "date") {
    return propertyTryGetDate(prop) as PropertyType;
  } else if (type === "checkbox") {
    return propertyTryGetCheckbox(prop) as PropertyType;
  }
  return null;
}

export type ParsePageParams<T extends NotionSchema> = {
  schemaTypes: NotionSchemaBinding<T>;
  page: PageObjectResponse;
};

export async function pageGetType<T extends NotionSchema>(
  page: PageObjectResponse,
  typeInfo: NotionSchemaBinding<T>[any],
) {
  if (typeInfo.source === "property") {
    return propertyTryGet(
      page.properties[typeInfo.propertyName],
      typeInfo.type,
    );
  } else if (typeInfo.source === "id") {
    return page.id;
  }
}

export async function parsePage<T extends NotionSchema>({
  page,
  schemaTypes,
}: ParsePageParams<T>): Promise<T | null> {
  return Object.fromEntries(
    await Promise.all(
      Object.entries(schemaTypes).map(async ([k, typeInfo]) => [
        k,
        await pageGetType(page, typeInfo),
      ]),
    ),
  ) as T;
}

export async function querySchema<T extends NotionSchema>(
  schemaTypes: NotionSchemaBinding<T>,
  options: GetPagesInDatabaseParams,
): Promise<T[]> {
  const pages = await getPagesInDatabase(options);

  const parsed = await Promise.all(
    pages.map(async (v) => {
      if (v.object === "page" && "properties" in v) {
        // generic is required here since officerSchemaTypes only satisfies DatabaseTypes
        return parsePage<T>({ page: v, schemaTypes: schemaTypes });
      }
      return null;
    }),
  );
  return parsed;
}

export async function querySchemaWithID<T extends NotionSchema>(
  schemaTypes: NotionSchemaBinding<T>,
  options: GetPagesInDatabaseParams,
): Promise<(T & { notionID: string })[]> {
  const pages = await getPagesInDatabase(options);

  const parsed = await Promise.all(
    pages.map(async (v) => {
      if (v.object === "page" && "properties" in v) {
        // generic is required here since officerSchemaTypes only satisfies DatabaseTypes
        return parsePage<T & { notionID: string }>({
          page: v,
          schemaTypes: {
            ...schemaTypes,
            notionID: { source: "id", type: "string" },
          } as NotionSchemaBinding<T & { notionID: string }>,
        });
      }
      return null;
    }),
  );
  return parsed;
}
