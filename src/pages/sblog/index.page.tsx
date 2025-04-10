import { createGetStaticProps } from "~/components/ArticleListBackend";
import { createGetServerSideProps } from "~/components/ArticleListBackend";
import ArticleList from "~/components/ArticleListFrontend";

// export const getServerSideProps = createGetServerSideProps({
// 	category: "byteSizedTutorials",
// });
export const getStaticProps = createGetStaticProps({
  category: "sblog",
});

export default ArticleList({
  collectionName: "Sblog",
  baseUrl: "sblog",
});
