import { Box, Container, Stack, Typography } from "@mui/material";
import { games } from "./games";
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
			title="Connections"
			description="Check out the past connections that ACM studio has created!"
		/>
		<Typography variant="display1" sx={{ mb: 2 }}>
			Connections
		</Typography>
		<Typography variant="body1" sx={{ mb: 4 }}>
			Check out the past connections that ACM studio has created!
		</Typography>
		<Stack spacing={1} sx={{ alignItems: "start" }}>
			{games.map((game, i) => (
				<Box key={i}>
					<Link href={"url" in game ? game.url : `/games/connections/${formatDate(game.date, 'url')}`}>
						<Typography variant="title1">
							{formatDate(game.date, 'long')}
							{game.name && <> -<em> {game.name}</em></>}
							{" "}
							<Typography component="span">
								by {game.author}
							</Typography>
							{ "url" in game && <sup><Launch/></sup>}
						</Typography>
					</Link>
				</Box>
			))}
		</Stack>
	</Container>
}