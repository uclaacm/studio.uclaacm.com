import { GetStaticPaths } from "next";
import {
  createGetServerSideProps,
  createGetStaticPaths,
  createGetStaticProps,
} from "~/components/ArticleBackend";
import { ArticleRenderer } from "~/components/ArticleFrontend";

// export const getServerSideProps = createGetServerSideProps({
// 	category: "byteSizedTutorials",
// })
export const getStaticProps = createGetStaticProps({
  category: "scoop",
});

export const getStaticPaths = createGetStaticPaths({
  category: "scoop",
});

export default ArticleRenderer({
  baseUrl: "/studio-scoops",
});
