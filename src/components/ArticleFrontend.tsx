import * as React from "react";

import BackgroundContainer from "~/components/BackgroundContainer";
import Typography from "@mui/material/Typography";

import {
  NotionArticleSchema,
  NotionSchemaWithBlocks,
} from "~/api/notion/schema";
import joinAuthorNames from "~/util/joinAuthorNames";
import NotionBlocksRenderer, { NotionBlockRenderOptions } from "./NotionBlockRenderer";
import Head from "next/head";
import { Box, Chip, Stack } from "@mui/material";
import Link from "./Link";
import IconButton from "./IconButton";
import IsaxIcon from "./IsaxIcon";
import Metadata from "./Metadata";

// syntax highlighting
import "highlight.js/styles/github.min.css";

// katex
import "katex/dist/katex.min.css";

export type ArticleParams = {
  baseUrl: string,
  renderOptions?: NotionBlockRenderOptions,
};

export type ArticleProps = {
  article: NotionSchemaWithBlocks<NotionArticleSchema>;
};

export function ArticleRenderer({ baseUrl, renderOptions }: ArticleParams) {
  return function ({ article }: ArticleProps) {
    if (article === undefined) {
      return <></>;
    }
    const { title, authors, tags, category, blocks } = article;

    const authorString = React.useMemo(
      () => joinAuthorNames(authors),
      [authors],
    );
    return (
      <BackgroundContainer>
        <Metadata />

        <Box sx={{ position: "relative" }}>
          <IconButton
            variant="contained"
            size="small"
            sx={(theme) => ({
              position: "absolute",
              left: `calc(-2em - ${theme.spacing(1)})`,
            })}
            onClick={() => {
              history.back();
            }}
          >
            <IsaxIcon name="isax-arrow-left-24" color="inherit" />
          </IconButton>
        </Box>
        <Head>
          <meta name="author" content={joinAuthorNames(authors)} />
        </Head>
        <Typography variant="subtitle1">{authorString}</Typography>
        <Typography variant="subtitle1">
          <Link href={baseUrl}>{category}</Link>
        </Typography>
        <Typography variant="h1">{title}</Typography>
        <NotionBlocksRenderer blocks={blocks} renderOptions={renderOptions} />
      </BackgroundContainer>
    );
  };
}
