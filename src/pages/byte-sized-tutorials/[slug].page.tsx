import { GetStaticPaths } from "next";
import { createGetServerSideProps, createGetStaticPaths, createGetStaticProps } from "~/components/ArticleBackend";
import { ArticleRenderer } from "~/components/ArticleFrontend";

// export const getServerSideProps = createGetServerSideProps({
// 	category: "byteSizedTutorials",
// })
export const getStaticProps = createGetStaticProps({
	category: "byteSizedTutorials",
})

export const getStaticPaths = createGetStaticPaths({
	category: "byteSizedTutorials",
});

export default ArticleRenderer({
	baseUrl: "/byte-sized-tutorials"
});
