import { Container, Theme, Typography } from "@mui/material"

export const headerTopPadding = 8;
export const bodyOffset = (theme: Theme) => `${theme.spacing(headerTopPadding)} + ${theme.typography.h1.lineHeight}`;

export type EventHeaderProps = {
	children?: string,
}

export default function EventHeader(props: EventHeaderProps) {
	const {
		children,
	} = props;
	return <Container maxWidth="lg" sx={{
		position: "sticky",
		top: 0,
		pt: headerTopPadding,
	}}>
		<Typography variant="h1">{children}</Typography>
	</Container>
}