import {Box, Container, Typography } from "@mui/material"
import React from "react";
import LearnByDoing from "./LearnByDoing";
import Resources from "./Resources";
import CurrentSeries from "./CurrentSeries";
import EventHeader from "../EventHeader";
import { HomeSectionProps } from "~/pages/index.page";
import { useInView } from "framer-motion";

export type WorkshopsProps = {

} & HomeSectionProps;

export default function Workshops(props: WorkshopsProps) {
  const {
    setActive,
  } = props;

  const root = React.useRef<HTMLDivElement>();
  const inView = useInView(root, { margin: "-64px" });
  React.useEffect(() => {
    if(inView) {
      setActive();
    }
  }, [inView]);

  return <Box ref={root}>
    {/*
    note: eventheader is sticky, so
    we want it to stop sticking *after* it gets
    to the last panel.
    this is why we add the box here, even
    though it does not contribute to layout
    */}
      <Box>
        <EventHeader>Workshops</EventHeader>
        <LearnByDoing {...props}/>
        <Resources/>
      </Box>
      <CurrentSeries/>
    </Box>
}
