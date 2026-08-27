import {
  Box,
  Container,
  Paper,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React from "react";
import Link from "~/components/Link";
import Image from "next/image";

import PaletteAndBrush from "./Palette and Brush.svg";
import { motion, Transition, Variants } from "framer-motion";
import {
  defaultItemVariants,
  defaultParentVariants,
} from "~/util/framer/variants";
import { bodyMinHeight, bodyOffset, bodyPaddingBottom } from "../EventHeader";
import { Card } from "~/components/Card";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

export type ResourcesProps = {};

type ResourceCardProps = {
  topContent: React.ReactNode;
  children: React.ReactNode;
};

const MotionCard = motion.create(Card);

const defaultTransition = (theme: Theme): Transition => ({
  duration: theme.transitions.duration.shortest / 1000,
});

function ResourceCard({ topContent, children }: ResourceCardProps) {
  const theme = useTheme();

  return (
    <MotionCard
      variants={defaultItemVariants()}
      transition={defaultTransition(theme)}
    >
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={(theme) => ({
          borderBottom: "0px solid",
          borderBottomColor: theme.palette.primary.main,
          p: 2,
          height: { xs: "4rem", md: "6rem" },
        })}
      >
        {topContent}
      </Stack>
      <Box sx={{ px: 2, py: 2 }}>
        <Typography variant="title2">{children}</Typography>
      </Box>
    </MotionCard>
  );
}

function Cards() {
  const scroller = React.useRef<HTMLDivElement>(null);
  // the hint only means anything while there is somewhere left to swipe to
  const [moreToSee, setMoreToSee] = React.useState(false);

  React.useEffect(() => {
    const el = scroller.current;
    if (!el) return;
    const update = () => {
      // scrollWidth - clientWidth is as far left as it can go; a pixel of
      // slack keeps fractional layout widths from leaving it permanently "on"
      const remaining = el.scrollWidth - el.clientWidth - el.scrollLeft;
      setMoreToSee(remaining > 1);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    // the row is only scrollable below md, so re-check when it is re-laid out
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      observer.disconnect();
    };
  }, []);

  return (
    <Box
      sx={(theme) => ({
        flexGrow: 1,
        display: "flex",
        alignItems: "center",
        // the swipe hint below needs its space back on mobile
        pt: { xs: 1, md: 2 },
      })}
    >
      <Box
        ref={scroller}
        sx={(theme) => ({
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 2,
          [theme.breakpoints.down("md")]: {
            // stacking three cards blows past the panel height, so on mobile
            // they stay in a row you swipe through instead
            gridTemplateColumns: "unset",
            gridAutoFlow: "column",
            gridAutoColumns: "82%",
            overflowX: "auto",
            overscrollBehaviorX: "contain",
            scrollSnapType: "x mandatory",
            pb: 1,
            "& > *": { scrollSnapAlign: "start" },
          },
        })}
      >
        <ResourceCard
          topContent={
            <Typography variant="h2" component="span">
              {"</>"}
            </Typography>
          }
        >
          Miss a week? Each week's workshop's code is available on{" "}
          <Link href="https://github.com/uclaacm/studio-roguelike-workshop">
            GitHub
          </Link>
          .
        </ResourceCard>
        <ResourceCard
          topContent={
            <Image
              src={PaletteAndBrush}
              height="128"
              alt="Palette and Brush"
              style={{ height: "100%" }}
            />
          }
        >
          Not an artist? We supply default art for every assets you need, so you
          can focus on your strengths!
        </ResourceCard>
        <ResourceCard
          topContent={
            <Typography variant="h2" component="span">
              ?
            </Typography>
          }
        >
          Want to learn more? Have a look at our{" "}
          <Link href="/workshops">external resources</Link> for every tool used
          in the workshop.
        </ResourceCard>
      </Box>

      {/* the cards scroll sideways on mobile - the nudging arrow is the whole
          affordance now; the "swipe for more" label that used to sit next to it
          was wide enough to collide with the cards. It fades out on the last
          card, where there is nothing left to swipe to. Fading rather than
          unmounting keeps it holding its space, so the cards do not jump
          sideways as you reach the end. */}
      <Stack
        aria-hidden
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        sx={(theme) => ({
          display: { xs: "flex", md: "none" },
          color: theme.palette.primary.main,
          opacity: moreToSee ? 1 : 0,
          pointerEvents: "none",
          transition: theme.transitions.create("opacity", {
            duration: theme.transitions.duration.shortest,
          }),
        })}
      >
        <KeyboardArrowRightIcon
          sx={{
            fontSize: "1rem",
            animation: "nudge 1.6s ease-in-out infinite",
            "@keyframes nudge": {
              "0%, 100%": { transform: "translateX(0)" },
              "50%": { transform: "translateX(3px)" },
            },
          }}
        />
      </Stack>
    </Box>
  );
}

export default function Resources({}: ResourcesProps) {
  const theme = useTheme();

  const parentVariants = defaultParentVariants(theme);

  return (
    <Container
      component={motion.div}
      variants={parentVariants}
      initial="initial"
      whileInView={"inView"}
      viewport={{ margin: "-64px", once: true }}
      maxWidth="lg"
      sx={(theme) => ({
        display: "flex",
        flexDirection: "column",
        scrollSnapAlign: "start",
        scrollMarginTop: `calc(${bodyOffset(theme)})`,
        width: "100%",
        minHeight: `calc(${bodyMinHeight(theme)})`,
        justifyContent: "center",
        pb: `calc(${bodyPaddingBottom(theme)})`,
      })}
    >
      <Typography
        variant="display2"
        sx={{
          mb: 2,
        }}
      >
        Resources
      </Typography>
      <Typography
        variant="h1"
        component={motion.p}
        variants={defaultItemVariants({ transitionY: false })}
        transition={defaultTransition(theme)}
      >
        We provide a collection of resources to help you.
      </Typography>
      <Cards />
    </Container>
  );
}
