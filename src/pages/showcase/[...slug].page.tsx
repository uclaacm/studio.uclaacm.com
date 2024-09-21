/// NOTE: THIS FILE NO LONGER WORKS
/// IT EXPECTS A FILE FROM content/showcase/...
/// THOUGH WE SWITCHED TO RENDERING IN NOTION

import Container from "~/components/Container";

import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"

import Button from "@mui/material/Button"
import BackIcon from "@mui/icons-material/ArrowBack"
import Link from "~/components/Link";
import { useRouter } from "next/router";

import { ArticleProps } from "~/components/ArticleFrontend";
import { createGetServerSideProps } from "~/components/ArticleBackend";
import NotionBlocksRenderer from "~/components/NotionBlockRenderer";

export const getServerSideProps = createGetServerSideProps({ category: "showcase" });

export default function ShowcaseEntry({ article }: ArticleProps){
	const { title, } = article;

	const router = useRouter();
	return <Container>
		<Button
			variant="text" size="small" startIcon={<BackIcon fontSize="inherit"/>}
			component={Link}
			href="/showcase/"
			onClick={(e) => {
				e.preventDefault();
				router.back();
			}}
		>
			Back
		</Button>
		<Stack direction="row" sx={{ my: 2 }}>
			<Typography variant="h1" sx={{ flexGrow: 1 }}>{title}</Typography>
		</Stack>
		<NotionBlocksRenderer blocks={article.blocks}/>
	</Container>
}