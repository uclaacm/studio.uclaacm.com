import { styled } from "@mui/material/styles"
import MUIIconButton, { IconButtonProps as MUIIconButtonProps } from "@mui/material/IconButton"

// @ts-ignore
export default styled(MUIIconButton)(({ theme }) => ({
	borderRadius: "2em",
	border: "1px solid",
	borderColor: `${theme.palette.primary.main}7F`,

	transition: theme.transitions.create(["border-color", "background-color"], {
		duration: theme.transitions.duration.short,
		easing: theme.transitions.easing.easeInOut,
	}),

	"&:hover": {
		borderColor: `${theme.palette.primary.main}ff`,
		backgroundColor: `${theme.palette.primary.main}10`,
	}
})) as typeof MUIIconButton