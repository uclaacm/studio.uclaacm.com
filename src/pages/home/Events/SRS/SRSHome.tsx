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
      id={id}
      sx={(theme) => ({
        scrollSnapAlign: "start",
        scrollMarginTop: `calc(${bodyOffset(theme)})`,
        width: "100%",
        minHeight: `calc(${bodyMinHeight(theme)})`,
      })}
    >
      <Stack gap={4}>
        <Typography
          variant="display2"
          className="community__section"
          sx={animationStyle()}
        >
          Interested in joining something bigger?
          <Button
            variant = "contained"
            href = "/srs-info"
          >
            Learn more about SRS here!
          </Button>
        </Typography>
      </Stack>
    </Container>
  );
}
