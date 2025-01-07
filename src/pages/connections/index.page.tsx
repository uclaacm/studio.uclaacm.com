import { Box, Container, Stack, Typography } from "@mui/material";
import { connections } from "./connections";
import Link from "~/components/Link";

export default function ConnectionsIndexPage() {
	const dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };

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
			{connections.map((connection, i) => (
				<Box key={i}>
					<Link href={connection.url}>
            <Typography variant="h1">
              {connection.name
                ? `${connection.name} - ${connection.date.toLocaleDateString('en-US', dateTimeFormatOptions)}`
                : connection.date.toLocaleDateString('en-US', dateTimeFormatOptions)
              }
            </Typography>
          </Link>
				</Box>
			))}
		</Stack>
	</Container>
}