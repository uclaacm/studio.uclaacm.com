import { createGetStaticProps } from "~/components/ArticleListBackend";
import { createGetServerSideProps } from "~/components/ArticleListBackend";
import ArticleList from "~/components/ArticleListFrontend";

export const getStaticProps = createGetStaticProps({
  category: "loa",
});

export default ArticleList({
  collectionName: "loa",
  baseUrl: "league-of-analysts",
});