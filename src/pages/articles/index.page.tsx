import { createGetStaticProps } from "~/components/ArticleListBackend";
import ArticleList from "~/components/ArticleListFrontend";

export const getStaticProps = createGetStaticProps({
  category: "miscellaneous",
});

export default ArticleList({
  collectionName: "Miscellaneous",
  baseUrl: "articles",
});
