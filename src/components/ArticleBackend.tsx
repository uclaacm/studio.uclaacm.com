import { Column, Query, Tutorial } from "cms/types"
import { dbConnection } from "~/db/connection";
import { ArticleProps } from "~/components/ArticleFrontend";

// this must be updated to give types for which tina collections are valid articles
export type CollectionName = Extract<keyof Query, "tutorial" | "column">
export type CollectionQuery = (typeof dbConnection)["queries"][CollectionName]

export type CollectionConnectionName = `${CollectionName}Connection`
export type CollectionConnectionQuery = (typeof dbConnection)["queries"][CollectionConnectionName]

export type Article = Query[CollectionName]

export type GetArticleParams = {
	relativePath: string,
	collection: CollectionName,
}

export type GetArticleResult = {
	props: ArticleProps
} | {
	notFound: true,
}

export async function getArticle({ relativePath, collection }: GetArticleParams): Promise<GetArticleResult> {
    const article: Article | null = await dbConnection
		.queries[collection]({ relativePath })
		.then(({ data }) => data[collection])
		.catch(() => null)

    return {
        ...article
			? {
				props: {
					article
				}
			}
			: {
				notFound: true
			}
    }
}