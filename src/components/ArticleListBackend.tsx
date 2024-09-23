import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { ArticleCategory, getArticles } from "~/api/notion/schema";
import { ArticleListProps } from "./ArticleListFrontend";

export type ArticleListCreateGetStaticPropsParams = {
  category?: ArticleCategory;
};

export function createGetStaticProps({
  category,
}: ArticleListCreateGetStaticPropsParams): GetStaticProps<ArticleListProps> {
  return async (ctx) => {
    const articles = await getArticles({ category });

    return {
      props: {
        articles,
      },
    };
  };
}

export type ArticleListCreateGetServerSidePropsParams = {
  category?: ArticleCategory;
};

export function createGetServerSideProps({
  category,
}: ArticleListCreateGetServerSidePropsParams): GetServerSideProps<ArticleListProps> {
  return async (ctx) => {
    const articles = await getArticles({ category });

    return {
      props: {
        articles,
      },
    };
  };
}
