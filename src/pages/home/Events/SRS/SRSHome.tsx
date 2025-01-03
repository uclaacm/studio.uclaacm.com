import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { bodyMinHeight, bodyOffset, headerTopPadding } from "../EventHeader";
import {
  AnimationPlaybackControls,
  Easing,
  motion,
  stagger,
  useAnimate,
  useInView,
} from "framer-motion";
import React from "react";
import { animationStyle } from "~/util/framer/animation";
import sleep from "~/util/sleep";
import { links } from "~/Strings";
import Image from "next/image";
import { HomeSectionProps } from "~/pages/index.page";
import { UnderlineTypographyItem } from "../../Mission/Animation";

export type SRSHomeProps = {} & HomeSectionProps;

export default function SRSHome(props: SRSHomeProps) {
  const { id } = props;

  const theme = useTheme();
  const [scope, animate] = useAnimate();

  const inView = useInView(scope);
  const [playedAnimation, setPlayedAnimation] = React.useState(false);

  let cancellationToken = false;
  let currentAnimation: AnimationPlaybackControls = null;

  async function animationSequence() {
  }

  React.useEffect(() => {
    if (inView && !playedAnimation) {
      animationSequence();
      setPlayedAnimation(true);
    }
  }, [inView, playedAnimation]);

  return (
    <Container
      ref={scope}
      maxWidth="lg"
      component={motion.div}
      id={id}
      sx={(theme) => ({
        scrollSnapAlign: "start",
        scrollMarginTop: `calc(${bodyOffset(theme)})`,
        width: "100%",
        minHeight: `calc(${bodyMinHeight(theme)})`,
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
          className="community__section"
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
    </Container>
  );
}
