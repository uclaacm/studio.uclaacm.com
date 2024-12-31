import {
  createGetStaticPaths,
  createGetStaticProps,
} from "~/components/ArticleBackend";
import { ArticleRenderer } from "~/components/ArticleFrontend";

export const getStaticProps = createGetStaticProps({
  category: "miscellaneous",
});

export const getStaticPaths = createGetStaticPaths({
  category: "miscellaneous",
});

export default ArticleRenderer({
  baseUrl: "/articles",
});
