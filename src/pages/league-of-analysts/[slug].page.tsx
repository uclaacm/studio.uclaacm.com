import { GetStaticPaths } from "next";
import {
  createGetServerSideProps,
  createGetStaticPaths,
  createGetStaticProps,
} from "~/components/ArticleBackend";
import { ArticleRenderer } from "~/components/ArticleFrontend";

export const getStaticProps = createGetStaticProps({
  category: "loa",
});

export const getStaticPaths = createGetStaticPaths({
  category: "loa",
});

export default ArticleRenderer({
  baseUrl: "/league-of-analysts",
});