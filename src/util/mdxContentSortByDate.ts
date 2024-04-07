import { MDXFile } from "~/Schema";

export function mdxSortByDate<T>(
	{ modifiedDate: modifiedDateA }: MDXFile<T>,
	{ modifiedDate: modifiedDateB }: MDXFile<T>
): number {
	return modifiedDateA < modifiedDateB ? -1
		: modifiedDateA > modifiedDateB ? 1
		: 0;
}