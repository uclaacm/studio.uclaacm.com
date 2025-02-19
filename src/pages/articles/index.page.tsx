import { createGetStaticProps } from "~/components/ArticleListBackend";
import ArticleList from "~/components/ArticleListFrontend";

export const getStaticProps = createGetStaticProps({
  category: "byteSizedTutorials",
});

export default ArticleList({
  collectionName: "Byte Sized Tutorials",
  baseUrl: "byte-sized-tutorials",
});
