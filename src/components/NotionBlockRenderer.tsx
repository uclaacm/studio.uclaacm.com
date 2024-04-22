import { Box, Divider, Typography } from "@mui/material"
import { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints"
import { Block, getPlainText } from "~/api/notion/blocks"
import Highlight from "./Highlight"
import Link from "./Link"

import { BlockMath, InlineMath } from "react-katex"
import React from "react"

export type NotionRichTextRendererProps = {
	richText: RichTextItemResponse[]
}

export function NotionRichTextRenderer({ richText }: NotionRichTextRendererProps) {
	return <>
		{richText.map((v, i) => {
			if(v.type === "text"){
				if(v.annotations.code){
					return <Highlight key={i} language="cs">
						{v.text.content}
					</Highlight>
				}
				else{
					const Container = (
						v.text.link?.url ?
							({ children }) => <Link href={v.text.link.url} target="_blank">{children}</Link> :
							({ children }) => <>{children}</>
					)
					return <Container key={i}>
						<Box component="span" sx={{
							fontWeight: v.annotations.bold ? "bold" : "normal",
							fontStyle: v.annotations.italic ? "italic" : "normal",
							textDecoration: [
								...v.annotations.strikethrough ? ["line-through"] : [],
								...v.annotations.underline ? ["underline"] : [],
							].join(" ") || undefined,
							color: !v.annotations.color.endsWith("_background") ? v.annotations.color : undefined,
						}}>
							{v.text.content}
						</Box>
					</Container>
				}
			}
			else if(v.type === "equation"){
				return <InlineMath key={i} math={v.equation.expression}/>
			}
		})}
	</>
}

type NotionBlockRendererProps = {
	block: Block
}

function NotionBlockRenderer({ block }: NotionBlockRendererProps){
	const textTypeMap = {
		paragraph: "body1",
		heading_1: "h2",
		heading_2: "h3",
		heading_3: "h4",
	}

	if(block.type in textTypeMap){
		const rt = block[block.type].rich_text as (Block & { type: "paragraph" })["paragraph"]["rich_text"];

		return <Typography variant={textTypeMap[block.type]}>
			<NotionRichTextRenderer richText={rt} />
		</Typography>
	}
	else if(block.type === "code"){
		return <Highlight language={block.code.language} block>
			<NotionRichTextRenderer richText={block.code.rich_text} />
		</Highlight>
	}
	else if(block.type === "equation"){
		return <BlockMath math={block.equation.expression}/>
	}
	else if(block.type === "image") {
		const url = block.image.type === "external" ?
			block.image.external.url :
			block.image.file.url;
		return <img src={url} alt={getPlainText(block.image.caption)}></img>
	}
	else if(block.type === "bulleted_list_item") {
		return <li><NotionRichTextRenderer richText={block.bulleted_list_item.rich_text}/></li>
	}
	else if(block.type === "numbered_list_item") {
		return <li><NotionRichTextRenderer richText={block.numbered_list_item.rich_text}/></li>
	}
	else if(block.type === "quote"){
		return <Typography variant="subtitle1" component="blockquote" sx={theme => ({
			pl: 2,
			borderLeft: `2px solid ${theme.palette.primary.main}`
		})}>
			<NotionRichTextRenderer richText={block.quote.rich_text}/>
		</Typography>
	}
	else if(block.type === "divider"){
		return <Divider sx={{ py: 2 }}/>
	}
}

export type NotionBlocksRendererProps = {
	blocks: Block[]
}

export default function NotionBlocksRenderer({ blocks }: NotionBlocksRendererProps){
	// notion returns each bulleted item individually
	// so the parent must add the <ul> (or <ol>)

	const preprocessedBlocks = React.useMemo(() => {
		return blocks.reduce<Block[][]>((acc, cur) => {
			if(acc.length === 0){
				acc.push([cur]);
			}
			else{
				const first = acc.at(-1)[0];
				console.log(first);
				if(
					(
						first.type === "bulleted_list_item" || first.type === "numbered_list_item" ||
						cur.type === "bulleted_list_item" || cur.type === "numbered_list_item"
					) && cur.type !== first.type) {
					acc.push([cur]);
				}
				else{
					acc.at(-1).push(cur);
				}
			}
			return acc;
		}, [])
	}, [blocks])

	return <>
		{preprocessedBlocks.flatMap(blocks => {
			const Container = blocks[0].type === "bulleted_list_item" ?
				({ children }) => <ul>{children}</ul> :
				blocks[0].type === "numbered_list_item" ?
				({ children }) => <ol>{children}</ol> :
				({ children }) => <React.Fragment>{children}</React.Fragment>;

			return <Container key={blocks.at(0).id}>{
				blocks.map(block => <NotionBlockRenderer key={block.id} block={block}/>)
			}</Container>
		})}
	</>
}