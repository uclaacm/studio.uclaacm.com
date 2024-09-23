import { createGetServerSideProps } from "~/components/ArticleListBackend";
import ArticleList from "~/components/ArticleListFrontend";

export const getServerSideProps = createGetServerSideProps({
  category: "scoop",
});

export default ArticleList({
  collectionName: "Studio Scoop",
  baseUrl: "column",
});
