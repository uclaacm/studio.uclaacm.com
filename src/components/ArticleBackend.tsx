import { ArticleProps } from "~/components/ArticleFrontend";

import { GetServerSideProps, GetStaticPaths, GetStaticProps } from "next";
import { ArticleCategory, getArticle, getArticles } from "~/api/notion/schema";

export type CreateGetStaticPropsParams = {
  category?: ArticleCategory;
};

export function createGetStaticProps({
  category,
}: CreateGetStaticPropsParams): GetStaticProps<ArticleProps> {
  return async (ctx) => {
    const article = await getArticle({
      id: ctx.params.slug as string,
      category,
    });
    if (article === null) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        article,
      },
      revalidate: 60,
    };
  };
}

export type CreateGetStaticPathsParams = {
  category?: ArticleCategory;
};

export function createGetStaticPaths({
  category,
}: CreateGetStaticPathsParams): GetStaticPaths {
  return async (ctx) => {
    const articles = await getArticles({ category });
    return {
      paths: articles.map((article) => ({
        params: {
          slug: article.id,
        },
      })),
      fallback: true,
    };
  };
}
export type CreateGetServerSidePropsParams = {
  category?: ArticleCategory;
};

export function createGetServerSideProps({
  category,
}: CreateGetServerSidePropsParams): GetServerSideProps<ArticleProps> {
  return async (ctx) => {
    const article = await getArticle({
      id: ctx.params.slug as string,
      category,
    });
    if (article === null) {
      return {
        notFound: true,
      };
    }
    return {
      props: {
        article,
      },
    };
  };
}
