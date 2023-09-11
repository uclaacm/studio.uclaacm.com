import { TinaMarkdown, TinaMarkdownContent } from "tinacms/dist/rich-text"
import { Tutorial } from "cms/types";
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


export const getServerSideProps: GetServerSideProps<TutorialEntryProps> = async ({ params }) => {
	const relativePath = `${path.join(...params.relativePath as string[])}.md`
    const entry: Tutorial | null = await dbConnection.queries
		.tutorial({ relativePath })
		.then(({ data: { tutorial }}) => tutorial)
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


type TutorialEntryProps = {
	entry: Tutorial
}

export default function TutorialEntry({ entry: { title, author, description, body } }: TutorialEntryProps){
	return <Container>
		<Typography variant="subtitle1">{author}</Typography>
		<Typography variant="h1">{title}</Typography>
		<Markdown content={body}/>
	</Container>
}