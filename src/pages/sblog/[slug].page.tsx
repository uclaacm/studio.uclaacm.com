import { GetStaticPaths } from "next";
import {
  createGetServerSideProps,
  createGetStaticPaths,
  createGetStaticProps,
} from "~/components/ArticleBackend";
import { ArticleRenderer } from "~/components/ArticleFrontend";

export const getStaticProps = createGetStaticProps({
  category: "sblog",
});

export const getStaticPaths = createGetStaticPaths({
  category: "sblog",
});

export default ArticleRenderer({
  baseUrl: "/sblog",
});
