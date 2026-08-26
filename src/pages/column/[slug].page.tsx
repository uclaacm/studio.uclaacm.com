import { GetStaticPaths } from "next";
import { createGetServerSideProps } from "~/components/ArticleBackend";
import { ArticleRenderer } from "~/components/ArticleFrontend";

export const getServerSideProps = createGetServerSideProps({
  category: "scoop",
});

// ArticleRenderer is a factory - it must be CALLED to produce the page
// component. Exporting it bare made React render a function that returns a
// function, i.e. a blank page.
export default ArticleRenderer({
  baseUrl: "/column",
});
