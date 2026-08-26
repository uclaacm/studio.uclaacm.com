import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PlaceIcon from "@mui/icons-material/Place";
import { useInView } from "framer-motion";
import React from "react";

import { Card } from "~/components/Card";
import { links } from "~/Strings";
import { HomeSectionProps } from "../../index.page";

/**
 * The two fall dates that are locked in. Everything else for the quarter goes
 * through the Notion "current events" database that feeds <CurrentEvents />.
 */
const fallEvents = [
  {
    name: "Enormous Activities Fair",
    abbreviation: "EAF",
    date: "September 22",
    time: "11am – 2pm",
    location: "Royce Quad & Wilson Plaza",
    body: "Come find our booth and say hi. Get an introduction to ACM studio.",
  },
  {
    name: "Fall General Meeting",
    abbreviation: "Fall GM",
    date: "September 30",
    time: "6pm – 8pm",
    location: "Ackerman Grand Ballroom",
    body: "Our kickoff for the year. Learn how to get involved with ACM studio & about our initiatives.",
  },
];

export default function FallQuarter(props: HomeSectionProps) {
  const { setActive, id } = props;

  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.down("md"));

  const root = React.useRef<HTMLDivElement>(undefined);
  const inView = useInView(root, { margin: "-64px" });
  React.useEffect(() => {
    if (inView) {
      setActive();
    }
  }, [inView]);

  return (
    <Box
      ref={root}
      id={id}
      sx={{
        width: "100%",
        height: "100dvh",
        scrollSnapAlign: "start",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="lg">
        <Stack gap={isMd ? 2 : 3}>
          <Box>
            <Typography
              variant="h3"
              sx={(theme) => ({
                color: theme.palette.primary.main,
                fontWeight: 700,
              })}
            >
              Fall Quarter
            </Typography>
            <Typography variant="display2" component="h2">
              Come find us
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gap: 2,
              gridTemplateColumns: {
                xs: "1fr",
                md: "repeat(2, minmax(0, 1fr))",
              },
            }}
          >
            {fallEvents.map((event) => (
              <Card
                key={event.abbreviation}
                component="article"
                opaque
                elevation={1}
                sx={{ p: 3 }}
              >
                <Typography
                  variant="overline"
                  component="p"
                  sx={(theme) => ({
                    color: theme.palette.primary.main,
                    letterSpacing: "0.16em",
                  })}
                >
                  {event.abbreviation}
                </Typography>
                <Typography variant="title1" component="h3" fontWeight={700}>
                  {event.name}
                </Typography>
                <Stack gap={0.5} sx={{ mt: 0.5, mb: 1 }}>
                  <Stack direction="row" gap={1} alignItems="center">
                    <CalendarMonthIcon
                      sx={(theme) => ({
                        fontSize: "1.1rem",
                        color: theme.palette.primary.main,
                      })}
                    />
                    <Typography variant="body2" fontWeight={600}>
                      {event.date} &middot; {event.time}
                    </Typography>
                  </Stack>
                  <Stack direction="row" gap={1} alignItems="center">
                    <PlaceIcon
                      sx={(theme) => ({
                        fontSize: "1.1rem",
                        color: theme.palette.primary.main,
                      })}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      {event.location}
                    </Typography>
                  </Stack>
                </Stack>
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {event.body}
                </Typography>
              </Card>
            ))}
          </Box>

          <Stack
            direction={isMd ? "column" : "row"}
            gap={1.5}
            alignItems={isMd ? "stretch" : "center"}
          >
            <Button
              variant="contained"
              size={isMd ? "small" : "medium"}
              href="/onboarding"
            >
              New? Start here
            </Button>
            <Button
              variant="outlined"
              size={isMd ? "small" : "medium"}
              href={links.googleCalendar}
            >
              Add our calendar
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
