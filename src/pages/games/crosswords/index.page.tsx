import { Box, Container, Stack, Typography } from "@mui/material";
import { crosswords } from "./crosswords";
import Link from "~/components/Link";
import formatDate from "~/util/formatDate";
import { Launch } from "@mui/icons-material";
import Metadata from "~/components/Metadata";

export default function ConnectionsIndexPage() {
	return <Container
		maxWidth="lg"
		sx={{ pt: 4 }}
	>
		<Metadata
			title="Crosswords"
			description="Check out the past crosswords that ACM studio has created!"
		/>
		<Typography variant="display1" sx={{ mb: 2 }}>
			Crosswords
		</Typography>
		<Typography variant="body1" sx={{ mb: 4 }}>
			Check out the past crosswords that ACM studio has created!
		</Typography>
		<Stack spacing={1} sx={{ alignItems: "start" }}>
			{crosswords.map((game, i) => (
				<Box key={i}>
					<Link href={game.url}>
						<Typography variant="title1">
							{game.name
								? `${formatDate(game.date, 'long')} - ${game.name} `
								: `${formatDate(game.date, 'long')} `
							}
							<Typography component="span">
								by {game.author}
							</Typography>
							<sup><Launch /></sup>
						</Typography>
					</Link>
				</Box>
			))}
		</Stack>
	</Container>
}