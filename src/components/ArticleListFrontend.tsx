import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Link from "~/components/Link";
import { Button, Divider } from "@mui/material";
import Title from "~/components/Title";
import "~/util/polyfills";
import { NotionArticleSchema } from "~/api/notion/schema";
import joinAuthorNames from "~/util/joinAuthorNames";

type ArticleEntryProps = {
  article: NotionArticleSchema;
  baseUrl: string;
};

function ArticleEntry({ article, baseUrl }: ArticleEntryProps) {
  const href = `${baseUrl}/${article.id}`;
  const { title, authors, description, date, image: imageUrl } = article;

  const authorString = React.useMemo(() => joinAuthorNames(authors), [authors]);

  return (
    <>
      <Box
        display="grid"
        gridTemplateColumns="1fr 2fr"
        component={Link}
        href={`${href}`}
        gap={2}
        sx={(theme) => ({
          height: ((theme.breakpoints.values.lg / 3) * 9) / 16,
          textDecoration: "none",
          color: "initial",
          "&:hover .ArticleEntry__LinkText": {
            textDecoration: "underline",
          },
        })}
      >
        <Box
          sx={{
            width: "100%",
            padding: 2,
          }}
        >
          <img
            src={imageUrl}
            alt=""
            style={{
              minHeight: 0,
              minWidth: 0,
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          ></img>
        </Box>
        <Box>
          <Typography
            variant="h3"
            component="h2"
            mb={1}
            className="ArticleEntry__LinkText"
          >
            {article.title}
          </Typography>
          <Typography variant="subtitle1">By {authorString}</Typography>
          <Box>
            <Typography variant="subtitle2">
              {article.tags.join(" \u2022 ")}
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider sx={{ my: 2, "&:last-of-type": { display: "none" } }} />
    </>
  );
}

type ArticleListParams = {
  collectionName: string;
  baseUrl: string;
  articlesPerPage?: number;
};

export type ArticleListProps = {
  articles: NotionArticleSchema[];
};

export default function ArticleList({
  collectionName,
  articlesPerPage,
  baseUrl,
}: ArticleListParams) {
  articlesPerPage ??= 5;

  return function ({ articles }: ArticleListProps) {
    const [page, setPage] = React.useState(0);
    const [firstIndex, lastIndex] = React.useMemo(
      () => [page * articlesPerPage, (page + 1) * articlesPerPage],
      [page],
    );
    const [firstPage, lastPage] = React.useMemo(
      () => [page === 0, lastIndex > articles.length],
      [page],
    );

    const incPage = () =>
      setPage((p) =>
        Math.min(p + 1, Math.ceil(articles.length / articlesPerPage)),
      );
    const decPage = () => setPage((p) => Math.max(p - 1, 0));

    return (
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Title>{collectionName}</Title>
        <Typography variant="h1" sx={{ mb: 2 }}>
          {collectionName}
        </Typography>
        <Stack>
          {articles
            .slice(page * articlesPerPage, (page + 1) * articlesPerPage)
            .map((article, i) => (
              <ArticleEntry
                article={article}
                baseUrl={baseUrl}
                key={article.id}
              />
            ))}
        </Stack>
        <Box display="flex">
          {!firstPage && (
            <Box>
              <Button onClick={decPage}>Previous Page</Button>
            </Box>
          )}
          <Box flexGrow={1}></Box>
          {!lastPage && (
            <Box>
              <Button onClick={incPage}>Next Page</Button>
            </Box>
          )}
        </Box>
      </Container>
    );
  };
}
