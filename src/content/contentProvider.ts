import content from "~/__generated__/content";

export type MDXFile<FrontmatterT> = {
  filename: string;
  modifiedDate: Date;
  default: Awaited<typeof import("*.mdx")> & {
    frontmatter: FrontmatterT;
  };
};

const filenameMap = new Map(
  Object.entries(content).map(
    ([collectionName, files]) =>
      [
        collectionName,
        new Map(files.map((v): [string, MDXFile<any>] => [v.filename, v])),
      ] as [string, Map<string, MDXFile<any>>],
  ),
);

export function getFile<T>(
  collectionName: string,
  filename: string,
): MDXFile<T> | undefined {
  return filenameMap.get(collectionName)?.get(filename) as MDXFile<T>;
}

export function sortByModifiedDate<T>(
  { modifiedDate: modifiedDateA }: MDXFile<T>,
  { modifiedDate: modifiedDateB }: MDXFile<T>,
): number {
  return modifiedDateB.getTime() - modifiedDateA.getTime();
}

export function sortByPublishedDate<T extends { date?: string }>(
  {
    default: {
      frontmatter: { date: dateA },
    },
  }: MDXFile<T>,
  {
    default: {
      frontmatter: { date: dateB },
    },
  }: MDXFile<T>,
): number {
  const dateAParsed = Date.parse(dateA);
  const dateBParsed = Date.parse(dateB);
  return isNaN(dateAParsed)
    ? 1
    : isNaN(dateBParsed)
      ? -1
      : dateBParsed - dateAParsed;
}
