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
  AnimationPlaybackControls,
  Easing,
  useAnimate,
  useInView,
} from "framer-motion";
import React from "react";
import { animationStyle } from "~/util/framer/animation";
import MasonryCarousel, {
  MasonryCarouselCellData,
} from "~/components/MasonryCarousel";
import { links } from "~/Strings";
import { getRandomGameJamGames } from "~/data/itch/index";

export type OurJamsProps = {};

const entries: MasonryCarouselCellData[] = getRandomGameJamGames(8).map((game) => ({
  title: <>
    {game.title}<br/>
    {game.collection}
  </>,
  src: game.img,
  href: game.href,
}));

export default function StudioJams(props: OurJamsProps) {
  const theme = useTheme();
  const [scope, animate] = useAnimate();

  const inView = useInView(scope);
  const [playedAnimation, setPlayedAnimation] = React.useState(false);

  const md = useMediaQuery(theme.breakpoints.down("md"));

  let cancellationToken = false;
  let currentAnimation: AnimationPlaybackControls = null;

  async function animationSequence() {
    const ease: Easing = "easeInOut";

    await animate(
      ".studio-jams__header",
      { "--animation-percent": 0 },
      { duration: 0.001 },
    );

    if (cancellationToken) return;

    currentAnimation = animate(
      ".studio-jams__header",
      { "--animation-percent": 1 },
      { duration: theme.transitions.duration.short / 1000 },
    );
    await currentAnimation;
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
      sx={(theme) => ({
        scrollSnapAlign: "start",
        scrollMarginTop: `calc(${bodyOffset(theme)})`,
        width: "100%",
        minHeight: `calc(${bodyMinHeight(theme)})`,
        // content was pinned to the top of the block, leaving all the
        // slack below it; centre it in the snap area instead
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        pb: `calc(${bodyPaddingBottom(theme)})`,
      })}
    >
      {/*
        height:100% does not resolve against a min-height parent, so once this
        Container became a flex column the Stack collapsed to its content and
        starved the carousel below it of height (it rendered zero cells).
        Filling the column instead gives the carousel real space back.
      */}
      <Stack sx={{ flexGrow: 1, minHeight: 0, width: "100%" }}>
        <Typography
          component="span"
          variant="display2"
          className="studio-jams__header"
          display="block"
          sx={[animationStyle(), { mb: 2 }]}
        >
          Past Entries
        </Typography>
        <Typography component="span" variant="h2">
          Studio organizes teams for jams to save you time.
        </Typography>
        <Typography component="span" variant="title2">
          Here are past entries from various teams!
        </Typography>
        <Stack
          sx={{
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              display: "grid",
              gridTemplate: "1fr / 1fr",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                zIndex: 1000,
                left: 0,
                top: 0,
                bottom: 0,
                width: `16px`,
                background:
                  "radial-gradient(farthest-side at left, rgba(0,0,0,0.5), rgba(0,0,0,0))",
                pointerEvents: "none",
              }}
            />
            <Box
              sx={{
                position: "absolute",
                zIndex: 1000,
                right: 0,
                top: 0,
                bottom: 0,
                width: `16px`,
                background:
                  "radial-gradient(farthest-side at right, rgba(0,0,0,0.5), rgba(0,0,0,0))",
                pointerEvents: "none",
              }}
            />
            <MasonryCarousel
              rows={[entries]}
              cellWidthProportion={md ? 0.8 : 0.36}
            />
          </Box>
          <Stack direction="row" justifyContent="end">
            <Button variant="text" href={links.itch}>
              View all past jam submissions
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
