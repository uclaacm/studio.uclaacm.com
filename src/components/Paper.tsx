import { styled, Paper as MuiPaper, PaperProps as MuiPaperProps } from "@mui/material";

export type PaperProps = MuiPaperProps & {
	opaque?: boolean;
}

export const Paper = styled(
	MuiPaper,
	{
		shouldForwardProp: (prop) => prop === "opaque"
	}
)<PaperProps>(({ theme, opaque, elevation }) => ({
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
}));