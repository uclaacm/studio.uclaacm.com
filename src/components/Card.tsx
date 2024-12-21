import { CardProps as MuiCardProps, Card as MuiCard, styled } from "@mui/material";

export type CardProps = MuiCardProps & {
	opaque?: boolean;
}
export const Card = styled(
	MuiCard,
	{
		shouldForwardProp: (prop) => prop !== "opaque",
	}
)<CardProps>(({ theme, opaque, elevation = 1 }) => ({
	backgroundColor: `color-mix(
	  in srgb,
	  ${opaque ? "white" : "transparent"},
	  var(--mui-palette-primary-main)
	  ${4 * elevation}%
	)`,
	border: `2px solid color-mix(
	  in srgb,
	  transparent,
	  var(--mui-palette-primary-main)
	  ${15 + 10 * elevation}%
	)`,
	"&.MuiPaper-root": {
		backgroundColor: `color-mix(
			in srgb,
			${opaque ? "white" : "transparent"},
			var(--mui-palette-primary-main)
			${4 * elevation}%
		)`,
		border: `2px solid color-mix(
			in srgb,
			transparent,
			var(--mui-palette-primary-main)
			${15 + 10 * elevation}%
		)`,
	}
}));