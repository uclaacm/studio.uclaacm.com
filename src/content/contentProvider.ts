import content from "~/__generated__/content";

export type MDXFile<FrontmatterT> = {
	filename: string,
	modifiedDate: Date,
	default: Awaited<typeof import("*.mdx")> & {
		frontmatter: FrontmatterT
	}
}

const filenameMap = new Map(
	Object.entries(content).map(([collectionName, files]) => [
		collectionName,
		new Map(files.map((v): [string, MDXFile<any>] => [v.filename, v]))
	] as [string, Map<string, MDXFile<any>>])
);

export function getFile<T>(collectionName: string, filename: string): MDXFile<T> | undefined {
	return filenameMap.get(collectionName)?.get(filename) as MDXFile<T>;
}

export function sortByDate<T>(
	{ modifiedDate: modifiedDateA }: MDXFile<T>,
	{ modifiedDate: modifiedDateB }: MDXFile<T>
): number {
	return modifiedDateA < modifiedDateB ? -1
		: modifiedDateA > modifiedDateB ? 1
		: 0;
}