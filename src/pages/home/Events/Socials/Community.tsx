import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  bodyMinHeight,
  bodyOffset,
  bodyPaddingBottom,
  headerTopPadding,
} from "../EventHeader";
import {
  AnimatePresence,
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
import TouchingGrass from "./Images/hike-touching-grass.webp";
import ACMGenMeeting from "./Images/acm-gen-meeting.webp";
import StudioGenMeeting from "./Images/studio-gen-meeting.webp";
import { HomeSectionProps } from "~/pages/index.page";
import ImageSlideshow from "~/components/ImageSlideshow";

export type CommunityProps = {} & HomeSectionProps;

const images = [
  { alt: "Touching grass on a hike!", image: TouchingGrass },
  { alt: "Hanging out at ACM General Meeting", image: ACMGenMeeting },
  {
    alt: "Members playing bingo at Studio General Meeting",
    image: StudioGenMeeting,
  },
];

export default function Community(props: CommunityProps) {
  const { id } = props;

  const theme = useTheme();
  const [scope, animate] = useAnimate();

  const medium = useMediaQuery(theme.breakpoints.down("md"));
  const buttonSize = medium ? "small" : "medium";

  const inView = useInView(scope);
  const [playedAnimation, setPlayedAnimation] = React.useState(false);

  let cancellationToken = false;
  let currentAnimation: AnimationPlaybackControls = null;

  async function animationSequence() {
    const ease: Easing = "easeInOut";

    if (cancellationToken) return;

    animate(
      ".community__header-section",
      { "--animation-percent": 0 },
      { duration: 0.00001 },
    );
    await animate(
      ".community__header",
      {
        "--animation-percent": 0,
        gridTemplateColumns: "1fr auto 1fr",
      },
      { duration: 0.00001 },
    );
    animate(
      ".community__section",
      { "--animation-percent": 0 },
      { duration: 0.00001 },
    );

    await animate(
      ".community__header-section",
      { "--animation-percent": 1, "--opacity": 1 },
      {
        delay: stagger(theme.transitions.duration.complex / 1000, {
          startDelay: theme.transitions.duration.complex / 1000,
        }),
      },
    );
    await sleep(theme.transitions.duration.complex);

    animate(
      ".community__header",
      {
        "--animation-percent": 1,
        gridTemplateColumns: "0fr auto 1fr",
      },
      {
        duration: theme.transitions.duration.short / 1000,
        ease,
      },
    );

    await sleep(theme.transitions.duration.short);

    animate(
      ".community__section",
      {
        "--animation-percent": 1,
      },
      {
        delay: stagger(theme.transitions.duration.shortest / 1000, {
          startDelay: theme.transitions.duration.shortest / 1000,
        }),
        duration: theme.transitions.duration.shortest / 1000,
      },
    );
  }

  React.useEffect(() => {
    if (inView && !playedAnimation) {
      animationSequence();
      setPlayedAnimation(true);
    }
  }, [inView, playedAnimation]);

  const buttons = (
    <>
      <Button
        variant="contained"
        size={buttonSize}
        className="community__section"
        sx={animationStyle()}
        href="/get-involved"
      >
        Get Connected
      </Button>
      <Button
        variant="outlined"
        size={buttonSize}
        className="community__section"
        sx={animationStyle()}
        href={links.insta}
      >
        Instagram
      </Button>
    </>
  );

  return (
    <Container
      ref={scope}
      id={id}
      maxWidth="lg"
      sx={(theme) => ({
        scrollSnapAlign: "start",
        scrollMarginTop: `calc(${bodyOffset(theme)})`,
        width: "100%",
        minHeight: `calc(${bodyMinHeight(theme)})`,
        pb: `calc(${bodyPaddingBottom(theme)})`,
      })}
    >
      <Box>
        <Box
          className="community__header"
          sx={{
            display: "grid",
            width: "100%",
            translate: `0 calc((1 - var(--animation-percent)) * 32vh)`,
            mb: 4,
          }}
        >
          <Box />
          <Box width="fit-content" sx={{ gridColumn: 2 }}>
            <Typography
              variant="display2"
              component="span"
              className="community__header-section"
              display="block"
              sx={animationStyle()}
            >
              Interested in a gaming community?
            </Typography>
          </Box>
          <Box />
        </Box>
        <Stack
          sx={(theme) => ({
            [theme.breakpoints.up("md")]: {
              flexDirection: "row",
            },
            [theme.breakpoints.down("md")]: {
              flexDirection: "column",
              gap: 2,
            },
          })}
        >
          <Stack gap={4} sx={{ flexGrow: 1, flexBasis: 0 }}>
            <Typography
              variant="h2"
              className="community__section"
              sx={animationStyle()}
            >
              Whether interested in games or game dev, come join us and hang
              out!
            </Typography>
            {!medium && (
              <Stack direction="row" gap={1}>
                {buttons}
              </Stack>
            )}
          </Stack>
          <Box
            className="community__section"
            sx={[
              {
                flexBasis: 0,
                minWidth: 0,
                flexGrow: 1,
                display: "grid",
                gridTemplateRows: "1fr",
              },
              animationStyle(),
            ]}
          >
            <ImageSlideshow images={images} />
          </Box>
          {medium && (
            <Stack direction="row" gap={1}>
              {buttons}
            </Stack>
          )}
        </Stack>
      </Box>
    </Container>
  );
}
