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
import { links } from "~/Strings";
import UnityGif from "./UnityGif.webp";
import Image from "next/image";
import { HomeSectionProps } from "~/pages/index.page";

export type SpeakerEventHomeProps = {} & HomeSectionProps;
export default function E1Home(props: SpeakerEventHomeProps) {
  const { id } = props;

  const theme = useTheme();
  const [scope, animate] = useAnimate();

  const inView = useInView(scope);
  const [playedAnimation, setPlayedAnimation] = React.useState(false);

  const medium = useMediaQuery(theme.breakpoints.down("md"));
  const buttonSize = medium ? "small" : "medium";

  let cancellationToken = false;
  let currentAnimation: AnimationPlaybackControls = null;

  async function animationSequence() {
    const ease: Easing = "easeInOut";

    if (cancellationToken) return;
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
        href={links.e1}
        className="community__section"
        sx={animationStyle()}
      >
        View Course Listing
      </Button>
      <Button
        variant="outlined"
        size={buttonSize}
        href={links.e1StudentProjects}
        className="community__section"
        sx={animationStyle()}
      >
        View past student work
      </Button>
    </>
  );

  return (
    <Box
      ref={scope}
      id={id}
      sx={(theme) => ({
        scrollSnapAlign: "start",
        scrollMarginTop: `calc(${bodyOffset(theme)})`,
        width: "100%",
        minHeight: `calc(${bodyMinHeight(theme)})`,
        pb: `calc(${bodyPaddingBottom(theme)})`,
      })}
    >
      <Box>
        <Container maxWidth="lg">
          <Typography
            variant="display2"
            component="span"
            className="community__header-section"
            display="block"
            sx={[animationStyle(), { mb: 4 }]}
          >
            Want a more formal learning experience?
          </Typography>
        </Container>
        <Box
          component="section"
          sx={(theme) => ({
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            [theme.breakpoints.down("md")]: {
              gridTemplateColumns: "unset",
              gridTemplateRows: "auto auto auto",
            },
          })}
        >
          <Box
            sx={(theme) => ({
              maxWidth: theme.breakpoints.values.lg / 2,
              justifySelf: "end",
              pl: 4,
              [theme.breakpoints.down("md")]: {
                maxWidth: "unset",
                justifySelf: "start",
                px: 4,
              },
            })}
          >
            <Stack gap={4}>
              <Typography
                variant="h2"
                className="community__section"
                sx={animationStyle()}
              >
                Get a comprehensive understanding of the Unity game engine in a
                classroom settings with zero experience needed.
              </Typography>
              <Typography
                variant="h2"
                className="community__section"
                sx={animationStyle()}
              >
                Work in small groups to create a game from design to production.
              </Typography>
              <Stack
                direction="row"
                gap={1}
                sx={(theme) => ({
                  [theme.breakpoints.down("md")]: {
                    display: "none",
                  },
                })}
              >
                {buttons}
              </Stack>
            </Stack>
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              minWidth: 0,
              minHeight: 0,
              mr: 8,
              ml: 4,
            }}
          >
            <Box
              component={Image}
              src={UnityGif}
              alt="The Unity Editor"
              sx={(theme) => ({
                height: "80%",
                minWidth: 0,
                minHeight: 0,
                borderRadius: 1,
                overflow: "clip",
                objectFit: "cover",
              })}
            ></Box>
          </Box>
          <Stack
            direction="row"
            gap={1}
            sx={(theme) => ({
              px: 4,
              [theme.breakpoints.up("md")]: {
                display: "none",
              },
            })}
          >
            {buttons}
          </Stack>
        </Box>
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
    </Box>
  );
}
