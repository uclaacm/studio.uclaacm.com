import { Box, Divider, Paper, Stack, SxProps, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, useTheme } from "@mui/material";
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import { Block, getPlainText } from "~/api/notion/blocks";
import Highlight from "./Highlight";
import Link from "./Link";

import { BlockMath, InlineMath } from "react-katex";
import React from "react";

function getHeadingInfo(block: Extract<Block, { type: `heading_${number}` }>): { id: string, level: number, text: RichTextItemResponse[] } {
  switch (block.type) {
    case "heading_1":
      return { id: block.id, level: 1, text: block.heading_1.rich_text };
    case "heading_2":
      return { id: block.id, level: 2, text: block.heading_2.rich_text };
    case "heading_3":
      return { id: block.id, level: 3, text: block.heading_3.rich_text };
  }
}

function getIDFromText(text: string): string {
  return text.replace(/\s+/g, "-").toLowerCase();
}

export type NotionRichTextRendererProps = {
  richText: RichTextItemResponse[];
  forceBold?: boolean;
};

export function NotionRichTextRenderer({
  richText,
  forceBold = false,
}: NotionRichTextRendererProps) {
  return (
    <>
      {richText.map((v, i) => {
        if (v.type === "text") {
          if (v.annotations.code) {
            return (
              <Highlight key={i} language="cs">
                {v.text.content}
              </Highlight>
            );
          } else {
            const Container = v.text.link?.url
              ? ({ children }) => (
                <Link href={v.text.link.url} target="_blank">
                  {children}
                </Link>
              )
              : ({ children }) => <>{children}</>;
            return (
              <Container key={i}>
                <Box
                  component="span"
                  sx={{
                    fontWeight: v.annotations.bold || forceBold ? "bold" : "normal",
                    fontStyle: v.annotations.italic ? "italic" : "normal",
                    textDecoration:
                      [
                        ...(v.annotations.strikethrough
                          ? ["line-through"]
                          : []),
                        ...(v.annotations.underline ? ["underline"] : []),
                      ].join(" ") || undefined,
                    color: !v.annotations.color.endsWith("_background")
                      ? v.annotations.color
                      : undefined,
                  }}
                >
                  {v.text.content}
                </Box>
              </Container>
            );
          }
        } else if (v.type === "equation") {
          return <InlineMath key={i} math={v.equation.expression} />;
        }
      })}
    </>
  );
}

export type NotionBlockRenderOptions = {
  lineHeight?: string,
  textIndent?: string,
};

type NotionBlockRendererProps = {
  block: Block,
  renderOptions?: NotionBlockRenderOptions,
};

function NotionBlockRenderer(props: NotionBlockRendererProps) {
  const {
    block,
    renderOptions = {
      lineHeight: "1.5",
      textIndent: "0",
    }
  } = props;
  const theme = useTheme();

  const textTypeMap = {
    paragraph: "body1",
    heading_1: "h2",
    heading_2: "h3",
    heading_3: "title1",
  };

  const textTypeStyle: { [k: string]: SxProps } = {
    heading_1: {
      marginTop: 8,
      marginBottom: 4,
    },
    heading_2: {
      marginTop: 6,
      marginBottom: 2,
    },
    heading_3: {
      marginTop: 4,
      marginBottom: 2,
    },
    paragraph: {
      marginBottom: 1,
      lineHeight: renderOptions.lineHeight,
      textIndent: renderOptions.textIndent,
    },
  };

  // typography blocks
  if (block.type in textTypeMap) {
    const rt = block[block.type].rich_text as (Block & {
      type: "paragraph";
    })["paragraph"]["rich_text"];

    return (
      <Typography
        variant={textTypeMap[block.type]}
        sx={{
          ...textTypeStyle[block.type]
        }}
        id={getIDFromText(getPlainText(rt))}
      >
        <NotionRichTextRenderer richText={rt} />
      </Typography>
    );
  } else if (block.type === "code") {
    return (
      /** NOTE: IDEALLY we'd use richtext in the code
       * but Highlight completely clears the HTML and
       * recreates it (and throws a warning)
       */
      <Highlight language={block.code.language} block>
        {getPlainText(block.code.rich_text)}
      </Highlight>
    );
  } else if (block.type === "equation") {
    return <BlockMath math={block.equation.expression} />;
  } else if (block.type === "image") {
    const url =
      block.image.type === "external"
        ? block.image.external.url
        : block.image.file.url;

    return (
      <Box
        component="figure"
        sx={{
          display: "block",
          maxWidth: "75%",
          margin: "auto",
          my: 8,
        }}
      >
        <img
          src={url}
          alt={getPlainText(block.image.caption)}
          style={{
            maxWidth: "100%",
            display: "block",
            margin: "auto",
          }}
        ></img>
        <Typography
          variant="caption"
          textAlign="center"
          component="figcaption"
          sx={{
            width: "100%",
          }}
        >
          <NotionRichTextRenderer richText={block.image.caption} />
        </Typography>
      </Box>
    );
  } else if (block.type === "bulleted_list_item") {
    return (
      <li>
        <NotionRichTextRenderer richText={block.bulleted_list_item.rich_text} />
      </li>
    );
  } else if (block.type === "numbered_list_item") {
    return (
      <li>
        <NotionRichTextRenderer richText={block.numbered_list_item.rich_text} />
      </li>
    );
  } else if (block.type === "quote") {
    return (
      <Typography
        variant="subtitle1"
        component="blockquote"
        sx={(theme) => ({
          pl: 2,
          borderLeft: `2px solid ${theme.palette.primary.main}`,
        })}
      >
        <NotionRichTextRenderer richText={block.quote.rich_text} />
      </Typography>
    );
  } else if (block.type === "divider") {
    return <Divider sx={{ py: 2 }} />;
  }
}

export type NotionTableRowRendererProps = {
  row: Extract<Block, { type: "table_row" }>,
  nColumnHeaders?: number,
  header?: boolean,
};

export function NotionTableRowRenderer({
  row,
  nColumnHeaders = 0,
  header = false,
}: NotionTableRowRendererProps) {
  return <TableRow>
    {row.table_row.cells.map((cell, i) => {
      const isHeader = header || i < nColumnHeaders;
      return <TableCell key={i} sx={theme => ({
        backgroundColor: isHeader ? `color-mix(in srgb, transparent, ${theme.palette.primary.main} 10%)` : "transparent",
        // borderBottomColor: "primary.main",
      })}>
        <NotionRichTextRenderer richText={cell} forceBold={isHeader} />
      </TableCell>
    })}
  </TableRow>
}

export type NotionTableRendererProps = {
  table: Extract<Block, { type: "table" }>,
  rows: Extract<Block, { type: "table_row" }>[],
};

export function NotionTableRenderer({
  table,
  rows,
}: NotionTableRendererProps) {
  // NOTE: has_column_header means that the first row is a header
  // I don't know why it is called "column" header.
  const nColumnHeaders = table.table.has_row_header ? 1 : 0;
  const header = table.table.has_column_header ? [rows[0]] : [];
  const body = rows.slice(header.length);

  return (
    <TableContainer component={Paper} sx={theme => ({
      border: `2px solid`, borderColor: `color-mix(in srgb, transparent, ${theme.palette.primary.main} 25%)`,
      width: "auto",
      mx: "auto",
      mt: 4,
      mb: 8,
      maxWidth: theme.breakpoints.values.md,
    })}>
      <Table>
        {header.length > 0 && (
          <TableHead>
            {header.map((row) => (
              <NotionTableRowRenderer key={row.id} row={row} nColumnHeaders={nColumnHeaders} header />
            ))}
          </TableHead>
        )}
        <TableBody>
          {body.map((row) => (
            <NotionTableRowRenderer key={row.id} row={row} nColumnHeaders={nColumnHeaders} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export type NotionTOCRendererProps = {
  blocks: Block[],
}

export function NotionTOCRenderer({
  blocks
}: NotionTOCRendererProps) {
  const headings = React.useMemo(() => {
    return blocks.filter((b): b is Extract<Block, { type: `heading_${number}` }> => b.type.startsWith("heading_"))
      .map((b) => getHeadingInfo(b))
      .map(({text, ...rest}) => ({ plainText: getPlainText(text), ...rest }))
  }, [blocks]);

  return (
    <Box component="nav">
      <Stack component="ul" sx={{
        pl: 0,
      }}>
        {headings.map((heading) => (
          <Typography
            variant="body2"
            component="li"
            key={heading.plainText}
            sx={theme => ({
              pl: theme.spacing(heading.level * 2),
              listStyle: "inside",
            })}
          ><Link href={`#${getIDFromText(heading.plainText)}`}>{heading.plainText}</Link></Typography>
        ))}
      </Stack>
  </Box>
  );
}

export type NotionBlocksRendererProps = {
  blocks: Block[],
  renderOptions?: NotionBlockRenderOptions
};

export default function NotionBlocksRenderer({
  blocks,
  renderOptions,
}: NotionBlocksRendererProps) {
  // notion returns each bulleted item individually
  // so the parent must add the <ul> (or <ol>)
  const preprocessedBlocks = React.useMemo(() => {
    return blocks.reduce<Block[][]>((acc, cur) => {
      if (acc.length === 0) {
        acc.push([cur]);
      } else {
        const first = acc.at(-1)[0];
        if (
          (first.type === "bulleted_list_item" ||
            first.type === "numbered_list_item" ||
            cur.type === "bulleted_list_item" ||
            cur.type === "numbered_list_item") &&
          cur.type !== first.type
        ) {
          acc.push([cur]);
        } else if ((cur.type === "table") || (first.type === "table" && cur.type !== "table_row")) {
          acc.push([cur]);
        } else if ((cur.type === "table_of_contents") || (first.type === "table_of_contents")) {
          acc.push([cur]);
        } else {
          acc.at(-1).push(cur);
        }
      }
      return acc;
    }, []);
  }, [blocks]);

  return (
    <>
      {preprocessedBlocks.flatMap((curBlocks) => {
        const firstBlock = curBlocks[0];
        if (firstBlock.type === "table") {
          return <NotionTableRenderer table={firstBlock} rows={curBlocks.filter((b) => b.type === "table_row")} key={firstBlock.id} />;
        }
        if (firstBlock.type === "table_of_contents") {
          return <NotionTOCRenderer blocks={blocks} key={firstBlock.id} />;
        }
        const Container =
          firstBlock.type === "bulleted_list_item"
            ? ({ children }) => <ul>{children}</ul>
            : firstBlock.type === "numbered_list_item"
              ? ({ children }) => <ul>{children}</ul>
              : ({ children }) => <React.Fragment>{children}</React.Fragment>;

        return (
          <Container key={curBlocks.at(0).id}>
            {curBlocks.map((block) => (
              <NotionBlockRenderer key={block.id} block={block} renderOptions={renderOptions} />
            ))}
          </Container>
        );
      })}
    </>
  );
}
