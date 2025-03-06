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
		'&::-webkit-scrollbar': {
			width: '0.3em'
		},
		'&::-webkit-scrollbar:horizontal': {
			display: 'none'
		},
		'&::-webkit-scrollbar-track': {
			display: 'none'
		},
		'&::-webkit-scrollbar-track-piece:end': {
			marginBottom: 8
		},
		'&::-webkit-scrollbar-track-piece:start': {
			marginTop: 8
		},
		'&::-webkit-scrollbar-thumb': {
			backgroundColor: '#FF8C93',
			borderRadius: 4
		},
		'@-moz-document url-prefix()': { // For Firefox styles
			scrollbarColor: '#FF8C93 #FFFFFF',
		},
	},
}));