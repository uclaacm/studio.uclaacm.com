import Container from "~/components/Container";

import Stack from "@mui/material/Stack"
import Typography from "@mui/material/Typography"
import Markdown from "~/components/Markdown";

import Button from "@mui/material/Button"
import IconButton from "~/components/IconButton"
import BackIcon from "@mui/icons-material/ArrowBack"
import Link from "~/components/Link";
import { useRouter } from "next/router";
import { ShowcaseSchema } from "~/Schema";

import { ArticleExports } from "~/components/ArticleBackend";
import { ArticleProps } from "~/components/ArticleFrontend";
import { getFile } from "~/content/contentProvider";
import { getIconFromType } from "~/util/getIconFromType";

const { getStaticPaths, getStaticProps } = ArticleExports("showcase");

export { getStaticPaths, getStaticProps }
export default function ShowcaseEntry({ collection, filename }: ArticleProps){
	const entry = getFile<ShowcaseSchema>(collection, filename);
	const { title, subtitle, links } = entry.default.frontmatter;

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
					links?.map(({type, href}, i) => {
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
		<entry.default.default/>
	</Container>
}