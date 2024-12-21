import { Box, Container, Typography } from "@mui/material";
import EventHeader, { bodyOffset, headerTopPadding } from "../EventHeader";
import SpeakerEventsHome from "./SpeakerEventsHome";
import { HomeSectionProps } from "~/pages/index.page";
import React from "react";
import { useInView } from "framer-motion";
// import Community from "./Community"
// import StudioSquads from "./StudioSquads"

export type SpeakerEventsProps = {} & HomeSectionProps;

export default function SpeakerEvents(props: SpeakerEventsProps) {
  const { setActive } = props;
  const root = React.useRef<HTMLDivElement>(undefined);
  const inView = useInView(root, { margin: "-64px" });
  React.useEffect(() => {
    if (inView) {
      setActive();
    }
  }, [inView]);
  return (
    <Box ref={root}>
      <Box>
        <EventHeader>Speaker Series</EventHeader>
      </Box>
      <SpeakerEventsHome {...props} />
      {/* <Community/>
                <StudioSquads/> */}
    </Box>
  );
}
