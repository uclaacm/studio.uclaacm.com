import { ArticleProps } from "~/components/ArticleFrontend";

import { GetServerSideProps } from "next";
import { ArticleCategory, getArticle } from "~/api/notion/schema";

export type CreateGetServerSidePropsParams = {
	category?: ArticleCategory,
}

export function createGetServerSideProps({ category }: CreateGetServerSidePropsParams): GetServerSideProps<ArticleProps> {
	return async (ctx) => {
		const article = await getArticle({ id: ctx.params.slug as string, category })
		if(article === null){
			return {
				notFound: true,
			}
		}
		return {
			props: {
				article
			}
		}
	}
}