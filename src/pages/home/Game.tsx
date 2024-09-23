import { Close, KeyboardArrowDown, QuestionMark } from "@mui/icons-material";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { AnimatePresence, motion, useInView, Variants } from "framer-motion";
import React from "react";
import IconButton, { MotionIconButton } from "~/components/IconButton";
import { drawRainbow } from "~/util/canvas/rainbow";
import { useOnResize } from "~/util/useOnResize";
import { HomeSectionProps } from "../index.page";

export default function HomeGame(props: HomeSectionProps){
  const { 
    scrollContainerRef,
    setActive,
    id,
  } = props;

  const theme = useTheme();

  const canvasContainerRef = React.useRef<HTMLDivElement>();
  const canvasRef = React.useRef<HTMLCanvasElement>();
  const ctxRef = React.useRef<CanvasRenderingContext2D>();

  const inView = useInView(canvasContainerRef, { margin: "-64px" });
  React.useEffect(() => {
    if(inView) {
      setActive();
    }
  }, [inView]);

  const [modalOpen, setModalOpen] = React.useState(false);

  React.useEffect(() => {
    ctxRef.current = canvasRef.current?.getContext("2d");
  }, [canvasRef])

  function render(){
    const canvas = canvasRef.current;
    const ctx = ctxRef.current;
    if(!canvas || !ctx) return;

    drawRainbow(canvas, ctx);
  }

  useOnResize(canvasContainerRef, (size) => {
    if(!canvasRef.current) return;
    canvasRef.current.width = size.inlineSize;
    canvasRef.current.height = size.blockSize;
    render();
  }, [canvasRef]);

  const transitionDuration = theme.transitions.duration.shortest / 1000;
  const easing = "circOut";

  const typographyItem: Variants = {
    button: i => ({
      opacity: 0,
      y: "-10px",
    }),
    modal: i => ({
      opacity: 1,
      y: 0,
    }),
  }

  return (<Box ref={canvasContainerRef} id={id} sx={{
    width: "100%",
    height: "100vh",
    scrollSnapAlign: "center",
    position: "relative",
  }}>
      <canvas ref={canvasRef} width="512" height="512" style={{
        width: "100%",
        height: "100%",
      }}></canvas>

      <Stack
      direction="row"
      justifyContent="center"
      alignItems="end"
      gap={2}
      sx={theme => ({
        fontSize: "3rem",
        position: "absolute",
        bottom: theme.spacing(8),
        left: 0,
        right: 0,
      })}
    >
        <IconButton
        sx={{
          fontSize: "inherit",
          width: "1em", height: "1em",
        }}
        onClick={() => {
          scrollContainerRef.current.scrollBy({
            top: 1,
          });
        }}
      >
          <KeyboardArrowDown color="inherit" style={{ fontSize: "inherit" }}/>
        </IconButton>
        <Box
        component={motion.div}
        sx={theme => ({
          position: "relative",
          borderRadius: "0.5em",
          overflow: "hidden",
          fontSize: "3rem",
          backgroundColor: theme.palette.primary.main
        })}
        variants={{
          button: {
            width: "1em",
            height: "1em",
          },
          modal: {
            width: "10em",
            height: "4em",
            transition: {
              duration: transitionDuration, ease: easing
            }
          }
        }}
        initial={false}
        animate={modalOpen ? 'modal' : 'button'}
      >
          <Box
          component={motion.div}
          sx={{
            display: "block",
            position: "absolute",
            left: 0, right: 0, top: 0, bottom: 0,
            textAlign: "left",
            padding: 2
          }}
          variants={{
            button: {
              opacity: 0,
            },
            modal: {
              transition: {
                staggerChildren: 0.3
              }
            }
          }}
          animate={modalOpen ? "modal" : "button"}
          transition={{ duration: transitionDuration, ease: "circIn" }}
        >
            <Typography component={motion.p} variant="body1" variants={typographyItem} color="white">
            Participate in our Website Game jam for your game to show up here!
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
            }
          }}
          initial={false}
          animate={modalOpen ? 'modal' : 'button'}

          onClick={() => { setModalOpen(!modalOpen); }}
        >
            <AnimatePresence initial={false}>
              { modalOpen || (
                <motion.span
                  key={0}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: transitionDuration, ease: "circIn" }}
                >
                    <QuestionMark color="inherit" style={{ fontSize: "80%" }}/>
                  </motion.span>
              )}
              { modalOpen && (
                <motion.span
                  key={1}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: transitionDuration, ease: "circIn" }}
                >
                    <Close color="inherit" style={{ fontSize: "80%" }}/>
                  </motion.span>
              )}
            </AnimatePresence>
          </MotionIconButton>
        </Box>
      </Stack>
    </Box>)
}
