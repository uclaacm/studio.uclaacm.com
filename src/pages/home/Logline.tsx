import { KeyboardArrowDown } from "@mui/icons-material"
import { Box, Button, Stack, Typography, useMediaQuery, useTheme } from "@mui/material"
import { motion, Transition, useInView, Variants } from "framer-motion"

import Wordmark from "~/assets/images/wordmark_and_logo.svg"
import MasonryCarousel from "~/components/MasonryCarousel"

import UpcastBlue from "./LoglineImages/UpcastBlue.webp"
import { HomeSectionProps } from "../index.page"
import React from "react"
import Link from "next/link"

const MotionLink = motion(Link);

export type LoglineProps = {
  scrollContainerRef: React.MutableRefObject<HTMLElement>
} & HomeSectionProps;

export default function Logline(props: LoglineProps) {
  const {
    scrollContainerRef,
    setActive,
  } = props;
  const theme = useTheme();

  const medium = useMediaQuery(theme.breakpoints.down("md"));
  const buttonSize = medium ? "medium" : "large";

  const root = React.useRef<HTMLDivElement>();
  const inView = useInView(root, { margin: "-64px" });
  React.useEffect(() => {
    if (inView) {
      setActive();
    }
  }, [inView]);

  const rootVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      }
    },
  }

  const itemVariants: Variants = {
    hidden: {
      opacity: 0, y: "-16px",
    },
    visible: {
      opacity: 1, y: 0,
    },
  }

  const transition: Transition = {
    duration: theme.transitions.duration.short / 1000,
    ease: "circOut",
  }

  const itemProps = {
    component: motion.div,
    variants: itemVariants,
    transition: transition,
  }

  return (
    <Box id="logline" ref={root}
      sx={theme => ({
        width: "100%",
        height: "100vh",
        scrollSnapAlign: "start",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        [theme.breakpoints.down('md')]: {
          display: "flex",
          flexDirection: "column",
          gridTemplateColumns: "unset",
        },
      })}

      component={motion.div}
      variants={rootVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-64px" }}
      transition={transition}
    >
      <Stack
        alignItems="center" justifyContent="center"
        sx={{
          p: 4,
        }}
      >
          <Stack gap={medium ? 2 : 16} sx={{
            width: medium ? "100%" : "fit-content",
          }}>
            <Stack direction="row"
              sx={{ width: "100%" }}
              {...itemProps}
            >
              <img src={Wordmark.src} style={{
                width: 0,
                flexGrow: 1,
                minWidth: 0,
                minHeight: 0,
                flexBasis: 0,
              }}></img>
            </Stack>
            <Box {...itemProps}>
              <Typography variant="display2">Game development<br />for everybody</Typography>
              <Typography variant="title1" component="p">UCLA’s top game development club</Typography>
            </Box>
            <Stack direction="row" gap={3}
              sx={{
                [theme.breakpoints.down('md')]: {
                  display: "none",
                }
              }}
            >
              <Button {...itemProps} size={buttonSize} variant="contained" endIcon={<KeyboardArrowDown />} onClick={() => {
                  scrollContainerRef.current.scrollBy({ top: 1, behavior: "smooth" })
                }}>
                Learn more
              </Button>
              <Button {...itemProps} component={MotionLink} size={buttonSize} variant="outlined" href="/get-involved">
                Get involved
              </Button>
            </Stack>
          </Stack>
        </Stack>
        <Box flexGrow={1} sx={{
          position: "relative",
          display: "grid",
          gridTemplate: "1fr / 1fr",
          overflow: "hidden",
          "&::after": {
            content: `""`,
            position: "absolute",
            left: 0, right: 0, top: 0, bottom: 0,
            pointerEvents: "none",
            boxShadow: "0 0 16px inset black",
          }
        }}>
          <MasonryCarousel
          rows={[
            [{ src: UpcastBlue.src, href: "https://ketexon.itch.io/upcast-blue" }],
            [{ src: UpcastBlue.src, href: "https://ketexon.itch.io/upcast-blue" }],
            [{ src: UpcastBlue.src, href: "https://ketexon.itch.io/upcast-blue" }],
            [{ src: UpcastBlue.src, href: "https://ketexon.itch.io/upcast-blue" }],
            [{ src: UpcastBlue.src, href: "https://ketexon.itch.io/upcast-blue" }],
            [{ src: UpcastBlue.src, href: "https://ketexon.itch.io/upcast-blue" }],
            [{ src: UpcastBlue.src, href: "https://ketexon.itch.io/upcast-blue" }],
          ]}
          cellWidthProportion={medium ? 0.7 : undefined}
        />
        </Box>
        <Stack direction="row" gap={3}
        sx={{ 
          p: 4,
          [theme.breakpoints.up('md')]: {
            display: "none",
          }
        }}
      >
          <Button {...itemProps} size={buttonSize} variant="contained" endIcon={<KeyboardArrowDown />} onClick={() => {
            scrollContainerRef.current.scrollBy({ top: 1, behavior: "smooth" })
          }}>
          Learn more
        </Button>
          <Button {...itemProps} size={buttonSize} variant="outlined" href="/events">
          Get involved
        </Button>
        </Stack>
      </Box>
  )
}
