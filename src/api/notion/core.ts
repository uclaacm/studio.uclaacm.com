/**
 * This file contains raw API helpers
 * 		getPagesInDatabase
 * 		getDatabaseProperties
 * It also contains a list of all databases
 */

import { Client } from "@notionhq/client";
import { QueryDatabaseParameters, QueryDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

const secret = process.env.NOTION_SECRET;
export const databaseIDs = {
	officers: process.env.NOTION_OFFICERS_DATABASE_ID,
	socialLinks: process.env.NOTION_OFFICER_SOCIAL_LINKS_DATABASE_ID,
};

const client = new Client({
	auth: secret,
});

export type GetPagesInDatabaseParams = Omit<QueryDatabaseParameters, "start_cursor" | "page_size">

export async function getPagesInDatabase(params: GetPagesInDatabaseParams) {
	const results: QueryDatabaseResponse["results"] = [];
    let cursor: string = undefined;
    while(true){
        const { results: pageResults, next_cursor, has_more } = await client.databases.query({
            ...params,
            start_cursor: cursor
        });
        results.push(...pageResults);
        if(has_more){
            cursor = next_cursor;
        }
        else{
            break;
        }
    }
	return results;
}

export type GetDatabasePropertiesParams = {
	database_id: string,
};

export async function getDatabaseProperties({ database_id }: GetDatabasePropertiesParams) {
	return (await client.databases.retrieve({ database_id })).properties;
}
