/**
 * This file contains raw API helpers
 * 		getPagesInDatabase
 * 		getDatabaseProperties
 * It also contains a list of all databases
 */

import { Client } from "@notionhq/client";
import {
  BlockObjectResponse,
  ListBlockChildrenResponse,
  QueryDatabaseParameters,
  QueryDatabaseResponse,
} from "@notionhq/client/build/src/api-endpoints";
import { Block } from "./blocks";

export const secret = process.env.NOTION_SECRET;

const client = new Client({
  auth: secret,
});

export type GetPagesInDatabaseParams = Omit<
  QueryDatabaseParameters,
  "start_cursor" | "page_size"
>;

export type PropertyFilter = Extract<
  QueryDatabaseParameters["filter"],
  { type?: string }
>;

export async function getPagesInDatabase(params: GetPagesInDatabaseParams) {
  const results: QueryDatabaseResponse["results"] = [];
  let cursor: string = undefined;
  while (true) {
    const {
      results: pageResults,
      next_cursor,
      has_more,
    } = await client.databases.query({
      ...params,
      start_cursor: cursor,
    });
    results.push(...pageResults);
    if (has_more) {
      cursor = next_cursor;
    } else {
      break;
    }
  }
  return results;
}

export type GetDatabasePropertiesParams = {
  database_id: string;
};

export async function getDatabaseProperties({
  database_id,
}: GetDatabasePropertiesParams) {
  return (await client.databases.retrieve({ database_id })).properties;
}

export type GetPageBlocksParams = {
  pageID: string;
};

export async function getPageBlocks({
  pageID,
}: GetPageBlocksParams): Promise<Block[]> {
  const results: ListBlockChildrenResponse["results"] = [];
  let cursor: string = undefined;
  while (true) {
    const {
      results: pageResults,
      next_cursor,
      has_more,
    } = await client.blocks.children.list({
      block_id: pageID,
      start_cursor: cursor,
    });
    results.push(...pageResults);
    if (has_more) {
      cursor = next_cursor;
    } else {
      break;
    }
  }
  return results
    .map((v) => {
      if (!("type" in v)) return null;

      const {
        object,
        parent,
        created_time,
        created_by,
        last_edited_time,
        last_edited_by,
        has_children,
        archived,
        ...rest
      } = v as BlockObjectResponse;
      return rest;
    })
    .filter((v) => v !== null);
}
