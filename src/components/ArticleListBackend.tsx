import { GetServerSideProps } from "next";
import { ArticleCategory, getArticles } from "~/api/notion/schema";
import { ArticleListProps } from "./ArticleListFrontend";

export type ArticleListCreateGetServerSidePropsParams = {
	category?: ArticleCategory,
}


export function createGetServerSideProps({ category }: ArticleListCreateGetServerSidePropsParams): GetServerSideProps<ArticleListProps> {
	return async (ctx) => {
		const articles = await getArticles({ category });

		return {
			props: {
				articles,
			}
		}
	}
}