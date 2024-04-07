import { useTheme } from "@mui/material";
import ItchIcon from "~/assets/images/icons/dev/itchio.svg"

export function getIconFromType(type: string): React.ReactNode | null {
	const theme = useTheme();
	type = type.toLowerCase().replaceAll(/\W+/g, "");
	if(["itch", "itchio"].includes(type)){
		return <img src={ItchIcon.src} style={{ width: "1em", height: "1em" }} alt="" />
	}
	else if(["insta", "instagram"].includes(type)){
		return <i className="isax isax-instagram5" style={{ color: theme.palette.primary.main }}></i>
	}
	else if(["website"].includes(type)){
		return <i className="isax isax-global5" style={{ color: theme.palette.primary.main }}></i>
	}
	return null;
}