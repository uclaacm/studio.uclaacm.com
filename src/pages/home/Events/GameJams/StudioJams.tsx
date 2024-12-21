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
  stagger,
  useAnimate,
  useInView,
} from "framer-motion";
import React from "react";
import { animationStyle } from "~/util/framer/animation";
import sleep from "~/util/sleep";
import HeroCarousel from "~/components/HeroCarousel";
import MasonryCarousel, {
  MasonryCarouselCellData,
} from "~/components/MasonryCarousel";
import { links } from "~/Strings";
import { getRandomGameJamGames } from "~/data/itch";

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
        pb: `calc(${bodyPaddingBottom(theme)})`,
      })}
    >
      <Stack sx={{ height: "100%" }}>
        <Typography
          component="span"
          variant="display1"
          className="studio-jams__header"
          display="block"
          sx={[animationStyle(), { mb: 4 }]}
        >
          Past Entries
        </Typography>
        <Typography component="span" variant="h1">
          Studio organizes teams for jams to save you time.
        </Typography>
        <Typography component="span" variant="title1">
          Here are past entries from various teams!
        </Typography>
        <Stack
          sx={{
            flexGrow: 1,
            justifyContent: "center",
            pb: `calc(${theme.spacing(headerTopPadding)} + ${theme.typography.h1.lineHeight})`,
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
              cellWidthProportion={md ? 0.8 : undefined}
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
