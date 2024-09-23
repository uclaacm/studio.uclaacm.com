import { Box, Container, Stack, Typography, useTheme } from "@mui/material";
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
import HeroCarousel from "~/components/HeroCarousel";
import sleep from "~/util/sleep";
import { HomeSectionProps } from "~/pages/index.page";

export type TryGameJamsProps = {} & HomeSectionProps;
const images: string[] = [
  "https://placehold.co/600x400?text=1",
  "https://placehold.co/600x400?text=2",
  "https://placehold.co/600x400?text=3",
  "https://placehold.co/600x400?text=4",
];

export default function TryGameJams(props: TryGameJamsProps) {
  const { id } = props;

  const theme = useTheme();
  const [scope, animate] = useAnimate();

  const inView = useInView(scope);
  const [playedAnimation, setPlayedAnimation] = React.useState(false);

  let cancellationToken = false;
  let currentAnimation: AnimationPlaybackControls = null;

  async function animationSequence() {
    const ease: Easing = "easeInOut";

    if (cancellationToken) return;

    animate(
      ".try-game-jams__header-section",
      { "--animation-percent": 0 },
      { duration: 0.00001 },
    );
    await animate(
      ".try-game-jams__header",
      {
        "--animation-percent": 0,
        gridTemplateColumns: "1fr auto 1fr",
      },
      { duration: 0.00001 },
    );
    animate(
      ".try-game-jams__bullet",
      { "--animation-percent": 0 },
      { duration: 0.00001 },
    );
    await animate(
      ".try-game-jams__commitment-issues",
      { height: "auto", "--opacity": 0 },
      { duration: 0.00001 },
    );

    await animate(
      ".try-game-jams__header-section",
      { "--animation-percent": 1, "--opacity": 1 },
      {
        delay: stagger(theme.transitions.duration.complex / 1000, {
          startDelay: theme.transitions.duration.complex / 1000,
        }),
      },
    );
    // await currentAnimation;
    await sleep(theme.transitions.duration.complex);

    animate(
      ".try-game-jams__header",
      {
        "--animation-percent": 1,
        gridTemplateColumns: "0fr auto 1fr",
      },
      {
        duration: theme.transitions.duration.short / 1000,
        ease,
      },
    );
    animate(
      ".try-game-jams__commitment-issues",
      { height: "0", "--opacity": 0 },
      {
        duration: theme.transitions.duration.short / 1000,
        ease,
      },
    );

    await sleep(theme.transitions.duration.short);

    animate(
      ".try-game-jams__bullet",
      {
        "--animation-percent": 1,
      },
      {
        delay: stagger(theme.transitions.duration.short / 1000, {
          startDelay: theme.transitions.duration.short / 1000,
        }),
        duration: theme.transitions.duration.short / 1000,
      },
    );
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
          className="try-game-jams__header"
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
              className="try-game-jams__header-section try-game-jams__commitment-issues"
              display="block"
              sx={[animationStyle(), { opacity: "var(--opacity)" }]}
            >
              Commitment issues?
            </Typography>
            <Typography
              component="span"
              variant="display1"
              className="try-game-jams__header-section"
              display="block"
              sx={animationStyle()}
            >
              Try game jams.
            </Typography>
          </Box>
          <Box />
        </Box>
        <Stack gap={4} className="try-game-jams__bullets">
          <Stack
            direction="row"
            gap={2}
            style={animationStyle()}
            className="try-game-jams__bullet"
          >
            <Typography fontSize="4rem" lineHeight={1}>
              🙃
            </Typography>
            <Box>
              <Typography variant="h1" fontWeight="bold">
                A low commitment experience...
              </Typography>
              <Typography variant="body1" mb={1}>
                Game jams are frequent, weekend-long sprints. If something comes
                up, if you can't complete your game, or if you find game jams
                aren't for you, no problem!
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction="row"
            gap={2}
            style={animationStyle()}
            className="try-game-jams__bullet"
          >
            <Typography fontSize="4rem" lineHeight={1}>
              🎮
            </Typography>
            <Box>
              <Typography variant="h1" fontWeight="bold">
                with complete control...
              </Typography>
              <Typography variant="body1">
                Most game jams have few rules. Choose your own genre, artstyle
                and software.
              </Typography>
            </Box>
          </Stack>
          <Stack
            direction="row"
            gap={2}
            style={animationStyle()}
            className="try-game-jams__bullet"
          >
            <Typography fontSize="4rem" lineHeight={1}>
              ✅
            </Typography>
            <Box>
              <Typography variant="h1" fontWeight="bold">
                and your own goals.
              </Typography>
              <Typography variant="body1">
                Want to try something new? Want to create the game of your
                dreams? You define your goals in a game jam.
              </Typography>
            </Box>
          </Stack>
        </Stack>
      </Box>
      {/* <Box sx={{position: "absolute", bottom: "20vh"}}>
			<Box sx={{  width: "50vw",
				position: "relative",
				display: "flex",
				justifyContent: "center",
				alignItems: "center"
			}}>
				<HeroCarousel images = {images}/>
			</Box>
		</Box> */}
    </Container>
  );
}
