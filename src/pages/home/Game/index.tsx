import { Close, KeyboardArrowDown, QuestionMark, VolumeOff, VolumeUp } from "@mui/icons-material";
import { Box, Button, Stack, Typography, useTheme } from "@mui/material";
import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import React from "react";
import IconButton, { MotionIconButton } from "~/components/IconButton";
import { HomeSectionProps } from "../../index.page";
import Link from "~/components/Link";
import Image from "next/image";

import GameLogo from "./dbtb.webp"

const itchUrl = `https://dubiousduck.itch.io/dont-break-the-bicycle`;
const jamUrl = `https://itch.io/jam/studio-jam-2024`;

export default function HomeGame(props: HomeSectionProps) {
  const [loaded, setLoaded] = React.useState(false);

  const { scrollContainerRef, setActive, id } = props;

  const theme = useTheme();
  const [canvas, setCanvas] = React.useState<HTMLCanvasElement>(undefined);
  const [iframe, setIframe] = React.useState<HTMLIFrameElement>(undefined);

  const canvasContainerRef = React.useRef<HTMLDivElement>(undefined);

  const inView = useInView(canvasContainerRef, { margin: "-64px" });
  React.useEffect(() => {
    if (inView) {
      setActive();
    }
  }, [inView]);

  const [muted, setMuted] = React.useState(false);

  React.useEffect(() => {
    if(!iframe) return;
    console.log("HI");
    if(iframe.contentDocument.readyState === "complete"){
      setCanvas(iframe.contentDocument.querySelector("canvas"));
    }
    else {
      const onLoad = () => {
        setCanvas(iframe.contentDocument.querySelector("canvas"));
      }
      iframe.addEventListener("load", onLoad);
      return () => {
        iframe.removeEventListener("load", onLoad);
      }
    }
  }, [iframe])

  React.useEffect(() => {
    if(!canvas) return;
    console.log(`SETTING CANVAS MUTE: ${muted}`);
    if(muted){
      canvas.dataset.muted = "";
    }
    else {
      delete canvas.dataset.muted;
    }
  }, [canvas, muted]);

  const [modalOpen, setModalOpen] = React.useState(false);

  const transitionDuration = theme.transitions.duration.shortest / 1000;
  const easing = "circOut";

  const typographyItem: Variants = {
    button: (i) => ({
      opacity: 0,
      y: "-10px",
    }),
    modal: (i) => ({
      opacity: 1,
      y: 0,
    }),
  };

  const preloadContent = <Stack
    sx={{
      height: "100%",
      alignItems: "center",
      pt: 16,
      p: 4,
      gap: 2,
      mx: "auto",
      maxWidth: theme.breakpoints.values.md,
    }}
  >
    <Stack>
      <Typography variant="label" textAlign="center">
        Studio Jam 2024 Winner!
      </Typography>
      <Link href={itchUrl} textAlign="center">
        <Typography variant="h3" textAlign="center" fontWeight="bold">
          Don't Break the Bicycle
        </Typography>
      </Link>
      <Typography variant="caption" textAlign="center">
        Theme: Break the Cycle
      </Typography>
    </Stack>
    <Box sx={{
      display: "grid",
      grid: "1fr / 1fr",
      borderRadius: 1,
      overflow: "clip",
    }}>
      <Box component={Image} src={GameLogo} alt="Don't Break the Bicycle"
        sx={{
          height: "auto",
          maxWidth: "100%",
          gridRow: "1 / 1",
          gridColumn: "1 / 1",
        }}
      />
      <Button
        variant="contained"
        onClick={() => setLoaded(true)}
        sx={{
          alignSelf: "center",
          justifySelf: "center",
          gridRow: "1 / 1",
          gridColumn: "1 / 1",
        }}
      >Play game</Button>
    </Box>
  </Stack>

  return (
    <Box
      ref={canvasContainerRef}
      id={id}
      sx={{
        width: "100%",
        height: "100vh",
        scrollSnapAlign: "center",
        position: "relative",
      }}
    >
      {loaded || preloadContent}
      {loaded && <Box
        ref={setIframe}
        component="iframe"
        src={"/game-jam-winners/dbtb/index.html"}
        sx={{
          width: "100%",
          height: "100%",
        }}
      />}

      <Stack
        direction="row"
        justifyContent="center"
        alignItems="end"
        gap={2}
        sx={(theme) => ({
          fontSize: "3rem",
          position: "absolute",
          bottom: theme.spacing(2),
          left: 0,
          right: 0,
        })}
      >
        <IconButton
          variant="contained"
          sx={{
            fontSize: "inherit",
            width: "1em",
            height: "1em",
          }}
          onClick={(e) => {
            setMuted(x => !x);
          }}
          // prevent losing focus of game when clicking
          onMouseDown={e => e.preventDefault()}
        >
          {muted
            ? <VolumeOff color="inherit" style={{ fontSize: "inherit" }} />
            : <VolumeUp color="inherit" style={{ fontSize: "inherit" }} />
          }
        </IconButton>
        <IconButton
          variant="contained"
          sx={{
            fontSize: "inherit",
            width: "1em",
            height: "1em",
          }}
          onClick={() => {
            scrollContainerRef.current.scrollBy({
              top: 1,
            });
          }}
        >
          <KeyboardArrowDown color="inherit" style={{ fontSize: "inherit" }} />
        </IconButton>
        <Box
          component={motion.div}
          sx={(theme) => ({
            position: "relative",
            borderRadius: "0.5em",
            overflow: "hidden",
            fontSize: "3rem",
            border: `1px solid ${theme.palette.primary.main}`,
            backgroundColor: modalOpen ? "white" : theme.palette.primary.main,
          })}
          variants={{
            button: {
              width: "1em",
              height: "1em",
            },
            modal: {
              width: "6em",
              height: "3.75em",
              transition: {
                duration: transitionDuration,
                ease: easing,
              },
            },
          }}
          initial={false}
          animate={modalOpen ? "modal" : "button"}
        >
          <Box
            component={motion.div}
            sx={{
              display: "block",
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              bottom: 0,
              textAlign: "left",
              padding: 2,
            }}
            variants={{
              button: {
                opacity: 0,
              },
              modal: {
                transition: {
                  staggerChildren: 0.3,
                },
              },
            }}
            animate={modalOpen ? "modal" : "button"}
            transition={{ duration: transitionDuration, ease: "circIn" }}
          >
            <Typography
              component={motion.p}
              variant="subtitle2"
              variants={typographyItem}
              sx={{ p: 1, }}
            >
              <Link href={itchUrl}><em>Don't Break the Bicycle</em></Link> is
              the winner to ACM Studio's first <Link href={jamUrl}><em>Studio Jam!</em></Link>
              {" "}Participate in future Studio Jams for a chance
              to win prizes and have your game featured on our website!
            </Typography>
          </Box>
          <MotionIconButton
            key={1}
            variant="contained"
            sx={{
              width: "1em",
              height: "1em",
              position: "absolute",
            }}
            transition={{ duration: transitionDuration, ease: "circIn" }}
            variants={{
              button: {
                top: 0,
                right: 0,
                fontSize: "100%",
              },
              modal: {
                top: theme.spacing(1),
                right: theme.spacing(1),
                fontSize: "50%",
              },
            }}
            initial={false}
            animate={modalOpen ? "modal" : "button"}
            onClick={() => {
              setModalOpen(!modalOpen);
            }}
          >
            <AnimatePresence initial={false}>
              {modalOpen || (
                <motion.span
                  key={0}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: transitionDuration, ease: "circIn" }}
                >
                  <QuestionMark color="inherit" style={{ fontSize: "80%" }} />
                </motion.span>
              )}
              {modalOpen && (
                <motion.span
                  key={1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: transitionDuration, ease: "circIn" }}
                >
                  <Close color="inherit" style={{ fontSize: "80%" }} />
                </motion.span>
              )}
            </AnimatePresence>
          </MotionIconButton>
        </Box>
      </Stack>
    </Box>
  );
}
