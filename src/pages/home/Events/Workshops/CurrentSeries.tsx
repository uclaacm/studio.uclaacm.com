import {
  AnimationPlaybackControls,
  motion,
  stagger,
  useAnimate,
  useInView,
} from "framer-motion";
import { bodyMinHeight, bodyOffset, bodyPaddingBottom } from "../EventHeader";
import {
  Box,
  Button,
  Container,
  Stack,
  SxProps,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { defaultParentVariants } from "~/util/framer/variants";
import React from "react";
import sleep from "~/util/sleep";
import { links } from "~/Strings";


type SeriesItemProps = {
  title: string,
  description: React.ReactNode,
}

function SeriesItem(props: SeriesItemProps) {
  const {
    title,
    description,
  } = props;
  return <Box component="section" className="check-out__stagger-item"
    sx={{
      transform: "translateY(calc((1 - var(--animation-percent)) * 16px))",
      opacity: "var(--animation-percent)",
    }}
  >
    <Typography variant="h1">{title}</Typography>
    {description}
  </Box>
}

export type CurrentSeriesProps = {};

export default function CurrentSeries({}: CurrentSeriesProps) {
  const theme = useTheme();
  const [scope, animate] = useAnimate();
  const inView = useInView(scope, { margin: "-128px" });
  const [playedAnimation, setPlayedAnimation] = React.useState(false);

  const medium = useMediaQuery(theme.breakpoints.down("lg"));

  let cancellationToken = false;
  let currentAnimation: AnimationPlaybackControls = null;

  async function animationSequence() {
    await animate(
      ".check-out__title",
      { "--animation-percent": 0 },
      {
        duration: 0.000001,
      },
    );

    await animate(
      ".check-out__stagger-item",
      {
        "--animation-percent": 0,
      },
      {
        duration: 0.000001,
      },
    );

    if (cancellationToken) return;

    if (medium) {
      currentAnimation = animate(
        ".check-out__title",
        {
          "--animation-percent": 1,
        },
        {
          duration: 0.000001,
        },
      );
      await sleep(100);
    } else {
      await sleep(500);

      currentAnimation = animate(
        ".check-out__title",
        {
          "--animation-percent": 1,
        },
        {
          duration: theme.transitions.duration.short / 1000,
        },
      );
      await Promise.race([currentAnimation, sleep(100)]);
    }

    if (cancellationToken) return;

    currentAnimation = animate(
      ".check-out__stagger-item",
      {
        "--animation-percent": [0, 1],
      },
      {
        delay: stagger(0.1),
      },
    );

    await currentAnimation;
  }

  React.useEffect(() => {
    if (inView && !playedAnimation) {
      animationSequence();
      setPlayedAnimation(true);
    }
  }, [inView, playedAnimation]);

  const staggerItemStyle: SxProps = {
    translate: `0 calc((1 - var(--animation-percent)) * 16px)`,
    opacity: `var(--animation-percent)`,
  };

  return (
    <Box
      ref={scope}
      component={motion.div}
      variants={defaultParentVariants(theme)}
      initial="initial"
      whileInView={"inView"}
      viewport={{ margin: "-64px", once: true }}
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        scrollSnapAlign: "start",
        scrollMarginTop: `calc(${bodyOffset(theme)})`,
        width: "100%",
        minHeight: `calc(${bodyMinHeight(theme)})`,
        pb: `calc(${bodyPaddingBottom(theme)})`,
      })}
    >
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ height: "100%", px: 4 }}
      >
        <Typography
          variant="display2"
          className="check-out__title"
          sx={{
            mb: 4,
            position: "relative",
            scale: "calc(1 + (1 - var(--animation-percent)) * 0.5)",
            top: "calc((1 - var(--animation-percent)) * 3em)",
          }}
        >
          Check out our current series
        </Typography>
        <Container maxWidth="lg">
          <Stack>
            <SeriesItem
              title="From Zero to Hero"
              description={<>
                <Typography variant="body1">
                  Learn to make a game-ready character from scratch with our
                  series of workshops. Start with the basics of character design
                  and modeling, and finish with a fully rigged and animated
                  character!
                </Typography>
              </>}
            />
          </Stack>
          <Stack direction="row" gap={1} sx={{
            mt: 4
          }}>
            <Button
              variant="contained"
              href="/workshops"
              className="check-out__stagger-item"
              sx={[staggerItemStyle]}
            >
              See full schedule
            </Button>
          </Stack>
        </Container>
      </Stack>
    </Box>
  );
}
