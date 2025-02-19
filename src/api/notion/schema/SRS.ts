import { NotionSchemaBinding, querySchema } from "../bindings";
import { databaseIDs } from "../databases";

export type NotionSRSTeamSchema = {
	name: string,
	description: string,
	leads: string[],
	engine: string,
	link: string,
	image: string,
};

const srsTeamSchemaBinding = {
	name: { source: "property", propertyName: "Name", type: "string" },
	description: { source: "property", propertyName: "Description", type: "string" },
	leads: { source: "property", propertyName: "Leads", type: "strings" },
	engine: { source: "property", propertyName: "Engine", type: "string" },
	link: { source: "property", propertyName: "Link", type: "url" },
	image: { source: "property", propertyName: "Image", type: "image" },
} satisfies NotionSchemaBinding<NotionSRSTeamSchema>;

export function getSRSTeams() {
	return querySchema<NotionSRSTeamSchema>(srsTeamSchemaBinding, {
		database_id: databaseIDs.srsTeams,
	});
}