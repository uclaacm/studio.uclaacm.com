import { ArticleProps } from "~/components/ArticleFrontend";

import content from "~/__generated__/content";
import { GetStaticPaths, GetStaticProps } from "next";
import { ArticleSchema, MDXFile } from "~/Schema";

export function ArticleExports(collectionName: string) {
	const collection = (content[collectionName] as MDXFile<ArticleSchema>[]);
	return {
		getStaticPaths: ((ctx) => {
			return {
				fallback: false,
				paths: collection.map(({ filename }) => ({
					params: {
						slug: filename.split("/")
					}
				}))
			}
		}) as GetStaticPaths,
		getStaticProps: (({ params }) => {
			return {
				props: {
					collection: collectionName,
					filename: (params.slug as string[]).join("/"),
				}
			}
		}) as GetStaticProps
	}
}