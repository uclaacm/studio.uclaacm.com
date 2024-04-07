import { GetStaticPaths } from "next";
import { ArticleRenderer } from "~/components/ArticleFrontend";
import { ArticleExports } from "~/components/ArticleBackend";

const { getStaticPaths, getStaticProps } = ArticleExports("column");

export { getStaticPaths, getStaticProps };
export default ArticleRenderer;