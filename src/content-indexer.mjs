/// This file generates the src/__generated__/content.tsx file
/// which contains the content of the collections folder
/// organized by folder, along with other useful information
/// like modification date and filename

import path from "path";
import os from "os";
import fs from "fs/promises";
import glob from "fast-glob";
import * as prettier from "prettier";

/**
 *
 * @param {string} p
 * @returns string
 */
function normalizePath(p) {
  if (process.platform === "win32") {
    return p.replace(/\\/g, "/");
  } else {
    return p;
  }
}

const cwd = process.cwd();
const contentRoot = path.join(cwd, "content");

const srcRoot = path.join(cwd, "src");
const generatedPath = path.join(srcRoot, "__generated__", "content.tsx");

const content = await glob("**/*", { cwd: contentRoot });

// an object mapping collections to a list of filenames
const collectionContents = content
  .map((p) => [p.split("/")[0], p.split("/").slice(1).join("/")])
  .reduce(
    /**
     * @param {Object} obj
     * @param {[string, string]} param1
     * @returns
     */
    (obj, [collection, subPath]) => {
      return {
        ...obj,
        [collection]: [subPath, ...(obj[collection] ?? [])],
      };
    },
    {},
  );

/** @type {{ [k:string]: { [k:string]: Date}}} */
const contentLastModificationDates = Object.fromEntries(
  await Promise.all(
    Object.entries(collectionContents).map(async ([collection, files]) => {
      return [
        collection,
        Object.fromEntries(
          await Promise.all(
            files.map(async (filepath) => {
              const stat = await fs.stat(
                path.join(contentRoot, collection, filepath),
              );
              return [filepath, new Date(stat.mtime)];
            }),
          ),
        ),
      ];
    }),
  ),
);

// the import statements for all the files in the format:
// file${collection number}_${file number}
const importStatements = Object.entries(collectionContents)
  .map(([collection, files], collectionIndex) => {
    return files.map(
      (file, fileIndex) =>
        `import * as file${collectionIndex}_${fileIndex} from "@/${collection}/${file}";`,
    );
  })
  .flat()
  .join("\n");

// for each collection, export a list of
// { filename: ..., default: import("collection/filename") }
const exportStatement = `export default {
	${Object.entries(collectionContents)
    .map(([collection, files], collectionIndex) => {
      return `${collection}: [
					${files
            .map((file, fileIndex) => {
              const filename = normalizePath(
                path.join(
                  path.dirname(file),
                  path.basename(file, path.extname(file)),
                ),
              );
              const filePath = path.join(contentRoot, collection, file);
              const modifiedDate =
                contentLastModificationDates[collection][file];
              fs.stat;
              return `{
							default: file${collectionIndex}_${fileIndex},
							filename: "${filename}",
							modifiedDate: new Date("${modifiedDate.toISOString()}"),
						},`;
            })
            .join("\n\t\t")}
				],`;
    })
    .join("\n")}
};`;

await fs.mkdir(path.dirname(generatedPath), { recursive: true });
await fs.writeFile(
  generatedPath,
  await prettier.format(`${importStatements}\n\n${exportStatement}`, {
    parser: "typescript",
    semi: true,
    useTabs: true,
    tabWidth: 4,
  }),
);
