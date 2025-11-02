import { Box, Container, Stack, Typography, Divider } from "@mui/material";
import { games } from "./games";
import Link from "~/components/Link";
import formatDate from "~/util/formatDate";
import { Launch } from "@mui/icons-material";
import Metadata from "~/components/Metadata";

export default function ConnectionsIndexPage() {

	const sortedGames = [...games].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	function getSchoolYear(date) {
		const d = new Date(date);
		const year = d.getFullYear();
		const month = d.getMonth(); // 0 = jan, 6 = july
		return month >= 6
			? `${year}/${(year + 1).toString().slice(-2)}`
			: `${year - 1}/${year.toString().slice(-2)}`;
	}

	let lastSchoolYear = null;

	return (
		<Container maxWidth="lg" sx={{ pt: 4 }}>
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

			<Stack spacing={2} sx={{ alignItems: "start", width: "100%" }}>
				{sortedGames.map((game, i) => {
					const schoolYear = getSchoolYear(game.date);
					const showDivider = schoolYear !== lastSchoolYear;
					lastSchoolYear = schoolYear;

					return (
						<Box key={i} sx={{ width: "100%" }}>
							{showDivider && (
								<>
									<Divider sx={{ my: 2 }} />
									<Typography variant={"h6" as any} sx={{ mb: 1, fontWeight: "bold" }}>
										{schoolYear} School Year
									</Typography>
								</>
							)}
							<Link href={"url" in game ? game.url : `/games/connections/${formatDate(game.date, 'url')}`}>
								<Typography variant="title1">
									{formatDate(game.date, 'long')}
									{game.name && <> – <em>{game.name}</em></>}
									{" "}
									<Typography component="span">
										by {game.author}
									</Typography>
									{"url" in game && <sup><Launch /></sup>}
								</Typography>
							</Link>
						</Box>
					);
				})}
			</Stack>
		</Container>
	);

	/*return <Container
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
	</Container>*/
}