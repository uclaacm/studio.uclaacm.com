import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Link from "~/components/Link";
import { Button, Divider } from "@mui/material";
import Title from "~/components/Title";
import { ArticleSchema } from "~/Schema";
import content from "~/__generated__/content";
import { MDXFile, sortByModifiedDate, sortByPublishedDate } from "~/content/contentProvider";
import "~/util/polyfills"
import { toSorted } from "~/util/polyfills";

type ArticleEntryProps = {
	file: MDXFile<ArticleSchema>,
	baseUrl: string,
}
function ArticleEntry({ file, baseUrl }: ArticleEntryProps){
	const article = file.default.frontmatter;
	const href = `${baseUrl}/${file.filename}`;
	const { title, author, description, date, image_url: imageUrl } = article;
	return (
		<>
			<Box
				display="grid"
				gridTemplateColumns="1fr 2fr"
				component={Link}
				href={`${href}`}
				gap={2}
				sx={theme => ({
					height: theme.breakpoints.values.lg / 3 * 9 / 16,
					textDecoration: "none",
					color: "initial",
					"&:hover .ArticleEntry__LinkText": {
						textDecoration: "underline",
					}
				})}
			>
				<Box sx={{
					width: "100%",
					padding: 2
				}}>
					<img src={imageUrl} alt="" style={{
						minHeight: 0,
						minWidth: 0,
						width: "100%",
						height: "100%",
						objectFit: "contain"
					}}></img>
				</Box>
				<Box>
					{
						article.keywords?.at(0) && (
							<Typography variant="subtitle2">
								{article.keywords[0]}
							</Typography>
						)
					}
					<Typography variant="h3" component="h2" mb={1} className="ArticleEntry__LinkText">
						{article.title}
					</Typography>
					<Typography variant="subtitle1">
						By {article.author}
					</Typography>
				</Box>
			</Box>
			<Divider sx={{my: 2, "&:last-of-type": { display: "none" }}}/>
		</>
	)
}

type CollectionArticleListParams = {
	collectionID: string,
	collectionName: string,
	baseUrl: string,
	articlesPerPage?: number,
}

export default function CollectionArticleList({ collectionID , collectionName, articlesPerPage, baseUrl }: CollectionArticleListParams) {
	const collection = toSorted(
		(content[collectionID] as MDXFile<ArticleSchema>[]),
		sortByPublishedDate
	);
	articlesPerPage ??= 5;

	return function(){
		const [page, setPage] = React.useState(0);
		const [firstIndex, lastIndex] = React.useMemo(() => [
			page * articlesPerPage,
			(page + 1) * articlesPerPage,
		], [page]);
		const [firstPage, lastPage] = React.useMemo(() => [
			page === 0,
			lastIndex > collection.length,
		], [page]);

		const incPage = () =>  setPage(p => Math.min(
			p + 1,
			Math.ceil(collection.length / articlesPerPage)
		));
		const decPage = () => setPage(p => Math.max(
			p - 1,
			0
		));

		return <Container maxWidth="lg" sx={{py: 2}}>
			<Title>{ collectionName }</Title>
			<Typography variant="h1" sx={{mb: 2}}>
				{ collectionName }
			</Typography>
			<Stack>
				{collection.slice(
					page * articlesPerPage,
					(page + 1) * articlesPerPage
				).map((article, i) => <ArticleEntry file={article} baseUrl={baseUrl} key={article.filename}/>)}
			</Stack>
			<Box display="flex">
				{!firstPage && <Box><Button onClick={decPage}>Previous Page</Button></Box>}
				<Box flexGrow={1}></Box>
				{!lastPage && <Box><Button onClick={incPage}>Next Page</Button></Box>}
			</Box>
		</Container>
	}
}
