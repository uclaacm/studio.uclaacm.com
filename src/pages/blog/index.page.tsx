import * as React from "react";

import { GetServerSideProps, GetStaticProps } from "next";

import BackgroundContainer from "~/components/BackgroundContainer";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Link from "~/components/Link";
import { Divider, Stack } from "@mui/material";
import { Card } from "~/components/Card";

import { styled, useTheme } from "@mui/material/styles";
import { getArticles, NotionArticleSchema } from "~/api/notion/schema";
import { objectGroupBy } from "~/util/polyfills";
import joinAuthorNames from "~/util/joinAuthorNames";
import formatDate from "~/util/formatDate";
import Metadata from "~/components/Metadata";
import { REVALIDATE_INTERVAL } from "~/Env";

export const getStaticProps: GetStaticProps<BlogProps> = async (ctx) => {
  const articles = await getArticles();
  const articleCategories = objectGroupBy(articles, (v) => v.category);
  return {
    props: {
      articles,
      articleCategories,
    },
    revalidate: REVALIDATE_INTERVAL,
  };
};

type BlogProps = {
  articleCategories: Partial<Record<string, NotionArticleSchema[]>>;
  articles: NotionArticleSchema[];
};

type TutorialItemProps = {
  entry: NotionArticleSchema;
  hrefBaseUrl?: string;
};

export const categoryBaseUrlMap = {
  "Byte Sized Tutorials": "byte-sized-tutorials",
  "Studio Scoop": "studio-scoop",
  "Miscellaneous": "articles",
  "Sblog": "sblog",
};

function ArticleEntry(props: TutorialItemProps) {
  const { entry, hrefBaseUrl = categoryBaseUrlMap[entry.category] } = props;
  const {
    title,
    category,
    authors,
    image: imageUrl,
    id,
    tags,
    description,
    date,
  } = entry;

  const authorString = React.useMemo(() => joinAuthorNames(authors), [authors]);

  const url = `${hrefBaseUrl}/${id}`;
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "stretch",
        textDecoration: "none",
        color: "black",
      }}
    >
      <Link href={url}>
        <Box
          component="img"
          src={imageUrl}
          alt=""
          sx={{
            width: "100%",
            objectFit: "contain",
            aspectRatio: "16/9",
            borderRadius: 1,
            overflow: "clip",
            display: "block",
          }}
        />
      </Link>
      <Stack
        sx={{
          p: 2,
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            gap: 1,
          }}
        >
          <Typography variant="subtitle2" sx={{ flexGrow: 1 }}>
            {authorString}
          </Typography>
          <Typography variant="subtitle2" sx={{ minWidth: "max-content" }}>
            {formatDate(date)}
          </Typography>
        </Box>
        <Link href={hrefBaseUrl}>
          <Typography variant="subtitle2">{category}</Typography>
        </Link>
        <Link href={url}>
          <Typography variant="h3" component="h3" color="primary.main">
            {title}
          </Typography>
        </Link>
        <Typography
          variant="body2"
          sx={{
            flexGrow: 1,
          }}
        >
          {description}
        </Typography>
        <Box>
          {tags.at(0) && (
            <>
              <Typography variant="subtitle2" display="inline">
                {tags.join(" \u2022 ")}
              </Typography>
            </>
          )}
        </Box>
      </Stack>
    </Card>
  );
}

export default function Blog(props: BlogProps) {
  const { articles, articleCategories } = props;
  const tutorials = articleCategories["Byte Sized Tutorials"] ?? [];
  const scoop = articleCategories["Studio Scoop"] ?? [];
  const miscellaneous = articleCategories["Miscellaneous"] ?? [];

  const getMostRecent = (articles: NotionArticleSchema[]) =>
    [...articles].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

  const highlight: (NotionArticleSchema | undefined)[] = [
    getMostRecent(tutorials),
    getMostRecent(scoop),
    getMostRecent(miscellaneous),
  ];

  const highlightIds = new Set(
    highlight.filter((x) => x !== undefined).map(({ id }) => id),
  );

  const nonHighlightArticles = articles.filter(
    ({ id }) => !highlightIds.has(id),
  );

  const theme = useTheme();

  const ArticlesContainer = styled(Box)(({ theme }) => ({
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridAutoRows: "1fr",
    rowGap: theme.spacing(2),
    columnGap: theme.spacing(2),
    [theme.breakpoints.down("md")]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [theme.breakpoints.down("sm")]: {
      gridTemplateColumns: "1fr",
    },
  })); 

  return (
    <BackgroundContainer>
      <Metadata title="Blog" />
      <Typography mb={4} variant="display1" sx={{ lineHeight: 1 }}>
        Studio Blog
      </Typography>
      <Typography mb={4} variant="h3" sx={{ lineHeight: 1 }}>
        Read articles written by Studio officers, from tutorials and guides to opinion pieces and game reviews.
        Check out our featured articles!
      </Typography>
      <Typography variant="h2" mb={2}>
        Featured
      </Typography>
      <Box sx={{ mb: 4 }}>
        <ArticlesContainer>
          {highlight.map((entry, i) =>
            entry ? (
              <Stack key={entry.id} sx={{ gap: 1 }}>
                <ArticleEntry
                  entry={entry}
                  hrefBaseUrl={categoryBaseUrlMap[entry.category]}
                />
                <Box display="flex" justifyContent="end" key={entry.id}>
                  <Link href={categoryBaseUrlMap[entry.category]} variant="body1">
                    All of {entry.category}
                  </Link>
                </Box>
              </Stack>
            ) : (
              <Box key={i} />
            ),
          )}
        </ArticlesContainer>
      </Box>
      <Typography variant="h2" mb={2}>
        All Articles
      </Typography>
      <Box>
        <ArticlesContainer>
          {nonHighlightArticles.map((entry, i) => (
            <>
              <ArticleEntry
                key={entry.id}
                entry={entry}
                hrefBaseUrl={categoryBaseUrlMap[entry.category] ?? "byte-sized-tutorials"}
              />
            </>
          ))}
        </ArticlesContainer>
      </Box>
    </BackgroundContainer>
  );
}
