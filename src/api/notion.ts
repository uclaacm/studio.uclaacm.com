import { Client } from "@notionhq/client";
import { PageObjectResponse, PartialPageObjectResponse, QueryDatabaseParameters, QueryDatabaseResponse, RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";

/**
 * THIS IS THE IMPORTANT TABLE MAPPING NOTION DATA TO TYPESCRIPT
 * The OfficerSchema defines the type for an officer
 * The OfficerSchemaKeys is each key of the schema
 * This maps each key of the officer schema to a type and a name
 * THE NAME CORRESPONDS TO THE COLUMN NAME IN NOTION. If they ever get
 * changed, change the corresponding field here.
 */
const officerSchemaTypes: Record<NotionOfficerSchemaKeys, { type: PropertyTypeName, name: string }> = {
	name: { type: "string", name: "Name" },
	boardStatus: { type: "string", name: "Board Status" },
	majorsMinors: { type: "strings", name: "Majors / Minors" },
	roles: { type: "strings", name: "Roles" },
	selfIntro: { type: "string", name: "Self intro" },
	gradYear: { type: "number", name: "Grad Year" },
	yearsActive: { type: "string", name: "Years Active" },
}

const secret = process.env.NOTION_SECRET;
const databaseIDs = {
	officers: process.env.NOTION_OFFICERS_DATABASE_ID
};

const client = new Client({
	auth: secret,
});

type GetPagesInDatabaseParams = Omit<QueryDatabaseParameters, "start_cursor" | "page_size">

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

type GetDatabasePropertiesParams = {
	database_id: string,
};

export async function getDatabaseProperties({ database_id }: GetDatabasePropertiesParams) {
	return (await client.databases.retrieve({ database_id })).properties;
}

type PropertyTypeName = "string" | "strings" | "number";
type PropertyType<T> =
	T extends "string" ? string :
	T extends "strings" ? Array<string> :
	T extends "number" ? number :
	never;

function richTextToString(richText: RichTextItemResponse[]){
	return richText.reduce((acc, cur) => acc + cur.plain_text, "");
}

function propertyTryGetStrings(prop: PageObjectResponse["properties"][string]): Array<string> | undefined {
	if(prop.type === "multi_select"){
		return prop.multi_select.map(v => v.name);
	}
	return undefined;
}

function propertyTryGetString(prop: PageObjectResponse["properties"][string]): string | undefined {
	if(prop.type === "title"){
		return richTextToString(prop.title);
	}
	else if(prop.type === "rich_text"){
		return richTextToString(prop.rich_text);
	}
	else if(prop.type === "select"){
		return prop.select?.name ?? undefined;
	}
	return undefined;
}

function propertyTryGetNumber(prop: PageObjectResponse["properties"][string]): number | undefined {
	if(prop.type === "number"){
		return prop.number;
	}
	return undefined;
}

function propertyTryGet<T extends PropertyTypeName>(prop: PageObjectResponse["properties"][string], type: T): PropertyType<T> | undefined {
	if(!prop) return undefined;
	if(type === "number"){
		return propertyTryGetNumber(prop) as PropertyType<T>;
	}
	else if(type === "string"){
		return propertyTryGetString(prop) as PropertyType<T>;
	}
	else if(type === "strings"){
		return propertyTryGetStrings(prop) as PropertyType<T>;
	}
	return undefined;
}

type ParseOfficerPageParams = {
	page: PageObjectResponse
}


export type NotionOfficerSchema = {
	name: string,
	boardStatus: string,
	majorsMinors?: string[],
	roles?: string[],
	selfIntro?: string,
	gradYear?: number,
	yearsActive?: string,
}

type NotionOfficerSchemaKeys = keyof NotionOfficerSchema;

export function parseOfficerPage({ page }: ParseOfficerPageParams): NotionOfficerSchema | null {
	// return {
	// 	name: propertyTryGetString(page.properties["Name"])!,
	// 	boardStatus: propertyTryGetString(page.properties["Board Status"])!,
	// 	majorsMinors: propertyTryGetStrings(page.properties["Majors / Minors"]),
	// 	roles: propertyTryGetStrings(page.properties["Roles"]),
	// 	selfIntro: propertyTryGetString(page.properties["Self intro"]),
	// 	gradYear: propertyTryGetNumber(page.properties["Grad Year"]),
	// 	yearsActive: propertyTryGetString(page.properties["Years Active"])
	// }
	return (
		Object.fromEntries(
			Object.entries(officerSchemaTypes)
				.map(([k, { type, name }]) =>
					[k, propertyTryGet(page.properties[name], type)]
				)
		) as NotionOfficerSchema
	);
}

export async function getOfficers(){
	const pages = await getPagesInDatabase({ database_id: databaseIDs.officers, });
	return pages.map(v => {
		if(v.object === "page" && "properties" in v) {
			return parseOfficerPage({ page: v });
		}
		return null;
	}).filter(v => v !== null);
}

export default client;