import { Box, Container, Typography } from "@mui/material";
import EventHeader, { bodyOffset, headerTopPadding } from "../EventHeader";
import E1Home from "./E1Home";
import { HomeSectionProps } from "~/pages/index.page";
import React from "react";
import { useInView } from "framer-motion";

export type E1Props = {} & HomeSectionProps;

export default function E1(props: E1Props) {
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
        <EventHeader>Engr 1GD</EventHeader>
      </Box>
      <E1Home {...props} />
    </Box>
  );
}
