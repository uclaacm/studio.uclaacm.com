import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text"
import { ShowcaseQuery } from "cms/types";
import { GetServerSideProps } from "next";
import path from "path";
import Container from "~/components/Container";

import Typography from "@mui/material/Typography"
import Markdown from "~/components/Markdown";

import Button from "@mui/material/Button"
import BackIcon from "@mui/icons-material/ArrowBack"
import Link from "~/components/Link";
import { useRouter } from "next/router";
import { dbConnection } from "~/db/connection";

export const getServerSideProps: GetServerSideProps<ShowcaseEntryProps> = async (ctx) => {
	const relativePath = `${path.join(...ctx.params.relativePath as string[])}.md`
	console.log(relativePath)
    const entry: ShowcaseEntry | null = await dbConnection.queries
		.showcase({ relativePath })
		.then(({ data: { showcase: { title, subtitle, description, body } }}) => ({
			title, subtitle, description, body
		}))
		.catch(() => null)

    return {
        ...entry
			? {
				props: {
					entry
				}
			}
			: {
				notFound: true
			}
    }
}

type ShowcaseEntry = {
	title: string,
	subtitle?: string,
	description?: string,
	body: TinaMarkdownContent,
}

type ShowcaseEntryProps = {
	entry: ShowcaseEntry
}

export default function ShowcaseEntry({ entry: { title, subtitle, description, body } }: ShowcaseEntryProps){
	const router = useRouter();
	return <Container>
		<Button
			variant="outlined" size="small" startIcon={<BackIcon fontSize="inherit"/>}
			component={Link}
			href="/showcase/"
			onClick={(e) => {
				e.preventDefault();
				router.back();
			}}
		>
			Back
		</Button>
		<Typography variant="h1">{title}</Typography>
		{subtitle && <Typography variant="h2">{subtitle}</Typography>}
		<Markdown content={body}/>
	</Container>
}