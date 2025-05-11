import { useTheme } from "@mui/material";
import ItchIcon from "~/assets/images/icons/dev/itchio.svg";
import GitHubIcon from "~/assets/images/icons/dev/GitHub.svg";

export function getIconFromType(type: string): React.ReactNode | null {
  const theme = useTheme();
  if (!type) return null;
  type = type.toLowerCase().replaceAll(/\W+/g, "");
  if (["itch", "itchio"].includes(type)) {
    return (
      <img src={ItchIcon.src} style={{ width: "1em", height: "1em" }} alt="" />
    );
  } else if (["insta", "instagram"].includes(type)) {
    return (
      <i
        className="isax isax-instagram5"
        style={{ color: theme.palette.primary.main }}
      ></i>
    );
  } else if (["website"].includes(type)) {
    return (
      <i
        className="isax isax-global5"
        style={{ color: theme.palette.primary.main }}
      ></i>
    );
  } else if (["github"].includes(type)) {
    return (
      <img
        src={GitHubIcon.src}
        style={{ width: "1em", height: "1em" }}
        alt=""
      />
    );
  }
  return null;
}
