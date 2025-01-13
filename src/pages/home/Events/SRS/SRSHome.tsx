import {
  Box,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { bodyMinHeight, bodyOffset } from "../EventHeader";
import {
  motion,
  useInView,
} from "framer-motion";
import React from "react";
import { animationStyle } from "~/util/framer/animation";
import { HomeSectionProps } from "~/pages/index.page";
import { UnderlineTypographyItem } from "../../Mission/Animation";
import AxolotlAnimation from "./AxolotlAnimation";

export type SRSHomeProps = {} & HomeSectionProps;

export default function SRSHome(props: SRSHomeProps) {
  const { id } = props;

  const theme = useTheme();
  const containerRef = React.useRef<HTMLDivElement>(undefined);

  const inView = useInView(containerRef);

  return (
    <Container
      ref={containerRef}
      maxWidth="lg"
      component={motion.div}
      id={id}
      sx={(theme) => ({
        scrollSnapAlign: "start",
        scrollMarginTop: `calc(${bodyOffset(theme)})`,
        width: "100%",
        minHeight: `calc(${bodyMinHeight(theme)})`,
        display: "flex",
        flexDirection: "column",
      })}
      initial="initial"
      whileInView="inView"
      viewport={{ margin: "-64px", once: false }}
      transition={{
        duration: theme.transitions.duration.short / 1000,
        delayChildren: theme.transitions.duration.short / 1000,
        staggerChildren: theme.transitions.duration.short / 1000,
      }}
    >
      <Stack gap={4}>
        <Typography
          variant="display2"
          sx={animationStyle()}
        >
          ACM Studio's Flagship Program
        </Typography>
        <Typography variant="h1">
          Over 2 quarters, work with a small
          student-run studio to create a
          game from <UnderlineTypographyItem>prototype</UnderlineTypographyItem> to
          {" "}<UnderlineTypographyItem>production</UnderlineTypographyItem>
        </Typography>
      </Stack>
      <Box
        sx={[
          (theme) => ({
            left: 0,
            right: theme.spacing(8),
            top: 0,
            bottom: theme.spacing(8),
            [theme.breakpoints.down("md")]: {
              position: "unset",
            },
            pointerEvents: "none",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexGrow: 1,
            zIndex: -1,
          }),
          animationStyle({ translateY: 16 }),
        ]}
      >
        <AxolotlAnimation inView={inView} />
      </Box>
    </Container>
  );
}
