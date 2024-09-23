import { GetStaticPaths } from "next";
import { createGetServerSideProps } from "~/components/ArticleBackend";
import { ArticleRenderer } from "~/components/ArticleFrontend";

export const getServerSideProps = createGetServerSideProps({
  category: "scoop",
});

export default ArticleRenderer;
