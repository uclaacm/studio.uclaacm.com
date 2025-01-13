import { Box, Container, Stack, Typography } from "@mui/material";
import { games } from "./games";
import Link from "~/components/Link";
import formatDate from "~/util/formatDate";
import { Launch } from "@mui/icons-material";

export default function ConnectionsIndexPage() {
	return <Container
		maxWidth="lg"
		sx={{ pt: 4 }}
	>
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
						<Typography variant="h1">
							{game.name
								? `${game.name} - ${formatDate(game.date, 'long')}`
								: formatDate(game.date, 'long')
							}
						</Typography>
					</Link>
				</Box>
			))}
		</Stack>
	</Container>
}