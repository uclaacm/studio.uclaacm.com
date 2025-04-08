import { Box } from "@mui/material";
import { useInView } from "framer-motion";
import React from "react";
import { HomeSectionProps } from "../../index.page";

export function Template(props: HomeSectionProps) {
  const { setActive, id } = props;

  const root = React.useRef<HTMLDivElement>(undefined);
  const inView = useInView(root, { margin: "-64px" });
  React.useEffect(() => {
    if (inView) {
      setActive();
    }
  }, [inView]);


  return (
    <Box
      ref={root}
      id={id}
      sx={{
        width: "100%",
        minHeight: "100vh",
        scrollSnapAlign: "start",
      }}
    >
    </Box>
  );
}
