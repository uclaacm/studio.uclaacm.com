import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text"
import { ShowcaseQuery } from "cms/types";
import { GetServerSideProps } from "next";
import path from "path";
import Container from "~/components/Container";

import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Markdown from "~/components/Markdown";

import Button from "@mui/material/Button"
import IconButton from "~/components/IconButton"
import BackIcon from "@mui/icons-material/ArrowBack"
import Link from "~/components/Link";
import { useRouter } from "next/router";
import { dbConnection } from "~/db/connection";
import { getIconFromType } from "~/util/getIconFromType";


export const getServerSideProps: GetServerSideProps<ShowcaseEntryProps> = async ({ params }) => {
	const relativePath = `${path.join(...params.relativePath as string[])}.md`
    const entry: ShowcaseEntry | null = await dbConnection.queries
		.showcase({ relativePath })
		.then(({ data: { showcase: { title, subtitle, description, body, links } }}): ShowcaseEntry => ({
			title,
			subtitle,
			description,
			body,
			links: [...links.map(({type, href}) => ({ type, href }))]
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
	links: {
		type: string,
		href: string,
	}[]
}

type ShowcaseEntryProps = {
	entry: ShowcaseEntry
}

export default function ShowcaseEntry({ entry: { title, subtitle, description, body, links } }: ShowcaseEntryProps){
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
			<Stack direction="row" alignItems="center" sx={{ "& > * + *": {
				marginLeft: 1
			}}}>
				{
					links.map(({type, href}, i) => {
						const icon = getIconFromType(type);
						if(icon === null) {
							return <Button variant="outlined" component={Link} href={href} target="_blank" key={i}>
								{type}
							</Button>
						}
						else {
							return <IconButton component={Link} href={href} target="_blank" key={i}>
								{icon}
							</IconButton>
						}
					})
				}
			</Stack>
		</Stack>
		{subtitle && <Typography variant="h2">{subtitle}</Typography>}
		<Markdown content={body}/>
	</Container>
}