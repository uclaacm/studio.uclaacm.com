import { Box, Container, Typography } from "@mui/material"
import EventHeader, { bodyOffset, headerTopPadding } from "../EventHeader"
import Community from "./Community"
import StudioSquads from "./StudioSquads"
import { HomeSectionProps } from "~/pages/index.page"
import React from "react"
import { useInView } from "framer-motion"

export type SocialsProps = {

} & HomeSectionProps;

export default function Socials(props: SocialsProps) {
  const { setActive } = props;
  const root = React.useRef<HTMLDivElement>();
  const inView = useInView(root, { margin: "-64px" });
  React.useEffect(() => {
    if(inView) {
      setActive();
    }
  }, [inView]);
  return <Box ref={root}>
    <Box>
      <EventHeader>Socials</EventHeader>
      <Community/>
    </Box>
      <StudioSquads/>
    </Box>
}
