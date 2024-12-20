import { Box, Container, Typography } from "@mui/material";
import EventHeader, { bodyOffset, headerTopPadding } from "../EventHeader";
import SRSHome from "./SRSHome";
import JoinSRS from "./JoinSRS";
import { HomeSectionProps } from "~/pages/index.page";
import React from "react";
import { useInView } from "framer-motion";

export type SRSProps = {} & HomeSectionProps;

export default function SRS(props: SRSProps) {
  const { setActive } = props;
  const root = React.useRef<HTMLDivElement>();
  const inView = useInView(root, { margin: "-64px" });
  React.useEffect(() => {
    if (inView) {
      setActive();
    }
  }, [inView]);
  return (
    <Box ref={root}>
      <Box>
        <EventHeader>Students Run Studios</EventHeader>
        <SRSHome {...props} />
      </Box>
      <JoinSRS />
    </Box>
  );
}
