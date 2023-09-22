import { GetServerSideProps } from "next";
import path from "node:path";
import { getArticle } from "~/components/ArticleBackend";
import Article, { ArticleProps } from "~/components/ArticleFrontend";

export const getServerSideProps: GetServerSideProps<ArticleProps> = async ({ params }) => {
	const relativePath = `${path.join(...params.relativePath as string[])}.md`

    return await getArticle({ relativePath, collection: "column" })
}

export default Article