import {
  Box,
  Container,
  Stack,
  Typography,
  TypographyProps,
  useTheme,
} from "@mui/material";
import { motion, motionValue, useSpring } from "framer-motion";
import { BoldTypographyItem, createParentVariants } from "./Animation";
import { ArrowRight } from "@mui/icons-material";
import React from "react";
import { homeEventSections } from "~/pages/index.page";

const MotionTypography = motion<TypographyProps & { component: string }>(
  Typography,
);

export default function EventList() {
  const theme = useTheme();

  const parentVariants = createParentVariants(theme);

  const arrowY = motionValue(0);
  const arrowYSpring = useSpring(arrowY, {
    duration: 200,
    bounce: 0.3,
  });

  const underlinePercents = homeEventSections.map((_, i) =>
    motionValue(i === 0 ? 1 : 0),
  );
  const underlinePercentSprings = underlinePercents.map((mv) =>
    useSpring(mv, {
      duration: 300,
      bounce: 0.1,
    }),
  );

  const selected = React.useRef(0);

  return (
    <Container
      maxWidth="lg"
      sx={{
        scrollSnapAlign: "start",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        gridRowStart: 1,
        gridColumnStart: 1,
      }}
    >
      <Box
        sx={{
          maxWidth: "66%",
          [theme.breakpoints.down("sm")]: {
            maxWidth: "unset",
          },
        }}
      >
        <Typography
          component={motion.p}
          variant="display2"
          pb={4}
          variants={parentVariants}
          initial="initial"
          whileInView="inView"
          viewport={{ once: true }}
          transition={{ duration: theme.transitions.duration.short / 1000 }}
          sx={{ display: "block" }}
        >
          ...and we hold a variety of events that can{" "}
          <BoldTypographyItem>help you dive deeper</BoldTypographyItem> into
          game dev!
        </Typography>
        <Stack
          component={motion.div}
          layout
          layoutRoot
          direction="row"
          variants={{
            initial: {},
            inView: {
              transition: {
                delay: (2 * theme.transitions.duration.enteringScreen) / 1000,
                delayChildren:
                  (3 * theme.transitions.duration.enteringScreen) / 1000,
                staggerChildren: theme.transitions.duration.shortest / 1000 / 2,
              },
            },
          }}
          initial="initial"
          whileInView="inView"
          viewport={{ once: true, margin: "-64px" }}
        >
          {/* relative position here to use offsetTop relative to this stack */}
          <Stack order={2} position="relative" alignItems="start" gap={0.5}>
            {homeEventSections.map(
              ({ title, longTitle = title, props: { id } }, i) => (
                <Typography
                  key={title}
                  display="block"
                  variant="title1"
                  color="primary"
                  sx={{ display: "block", textDecoration: "none" }}
                  href={`#${id}`}
                  component={motion.a}
                  variants={{
                    initial: { height: 0, opacity: 0, y: 16 },
                    inView: { height: "auto", opacity: 1, y: 0 },
                  }}
                  onHoverStart={(ev) => {
                    arrowY.set((ev.target as HTMLAnchorElement).offsetTop);
                    underlinePercents[selected.current].set(0);
                    selected.current = i;
                    underlinePercents[selected.current].set(1);
                  }}
                >
                  <Typography
                    component={motion.span}
                    variant="inherit"
                    style={{
                      ["--underline-percent" as any]:
                        underlinePercentSprings[i],
                    }}
                    sx={{
                      position: "relative",
                      "&::before": {
                        zIndex: -1,
                        content: "''",
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "0.08em",
                        backgroundColor: theme.palette.primary.main,
                        transformOrigin: "center left",
                        transform: `scaleX(var(--underline-percent))`,
                      },
                    }}
                  >
                    {longTitle}
                  </Typography>
                </Typography>
              ),
            )}
          </Stack>
          {/* The arrow */}
          <Box order={1}>
            <MotionTypography
              variant="title1"
              color="primary"
              component="span"
              sx={{
                display: "block",
                pt: "0.1em",
              }}
              variants={{
                initial: { height: 0, opacity: 0 },
                inView: { height: "auto", opacity: 1 },
              }}
              style={{ y: arrowYSpring }}
              transition={{ duration: 0.1 }}
            >
              <ArrowRight fontSize="inherit" sx={{ display: "block" }} />
            </MotionTypography>
          </Box>
        </Stack>
      </Box>
    </Container>
  );
}
