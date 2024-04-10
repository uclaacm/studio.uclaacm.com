/**
 * This file implements bindings in Bindings.
 * This is where you would modify *specific* bindings, such as what properties
 * are set from the Officers table, or from which property they are set.
 */

import { NotionSchemaBinding, querySchema } from "./bindings";
import { databaseIDs } from "./core";

export type NotionOfficerSchema = {
	id: string,
	name: string,
	boardStatus: string,
	majorsMinors: string[] | null,
	roles: string[] | null,
	selfIntro: string | null,
	gradYear: number | null,
	yearsActive: string | null,
	image: string | null,
	category: string | null,
	title: string | null,
}

/**
 * THIS IS THE IMPORTANT TABLE MAPPING NOTION DATA TO TYPESCRIPT
 * The OfficerSchema defines the type for an officer
 * The OfficerSchemaKeys is each key of the schema
 * This maps each key of the officer schema to a type and a name
 * THE NAME CORRESPONDS TO THE COLUMN NAME IN NOTION. If they ever get
 * changed, change the corresponding field here.
 */
const officerSchemaBinding = {
	id: { source: "id", type: "string" },
	name: { source: "property", type: "string", propertyName: "Name" },
	boardStatus: { source: "property", type: "string", propertyName: "Board Status" },
	majorsMinors: { source: "property", type: "strings", propertyName: "Majors / Minors" },
	roles: { source: "property", type: "strings", propertyName: "Roles" },
	selfIntro: { source: "property", type: "string", propertyName: "Self intro" },
	gradYear: { source: "property", type: "number", propertyName: "Grad Year" },
	yearsActive: { source: "property", type: "string", propertyName: "Years Active" },
	image: { source: "property", type: "image", propertyName: "Image" },
	category: { source: "property", type: "string", propertyName: "Website Category" },
	title: { source: "property", type: "string", propertyName: "Website Title" },
// note: we use satisfies to be able to still use static type information not encoded by DatabaseTypes
// eg. so we can do officerSchemaTypes.name.propertyName
} satisfies NotionSchemaBinding<NotionOfficerSchema>;


export type NotionSocialLinksSchema = {
	social: string,
	url: string,
	officer: string,
}

const socialLinksBinding: NotionSchemaBinding<NotionSocialLinksSchema> = {
	social: { source: "property", propertyName: "Social", type: "string" },
	url: { source: "property", propertyName: "URL", type: "url" },
	officer: { source: "property", propertyName: "Officer", type: "string" }
};

export async function getOfficers(){
	return querySchema<NotionOfficerSchema>(
		officerSchemaBinding,
		{
			database_id: databaseIDs.officers,
			sorts: [
				{
					property: officerSchemaBinding.name.propertyName,
					direction: "ascending"
				}
			]
		}
	);
}

export async function getOfficerSocialLinks(){
	return querySchema<NotionSocialLinksSchema>(
		socialLinksBinding,
		{
			database_id: databaseIDs.socialLinks,
		}
	);
}