import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";


import React from "react";

import Metadata from "~/components/Metadata";
import Image from "next/image";
import { Card } from "~/components/Card";
import IconButton from "~/components/IconButton";
import { East, West } from "@mui/icons-material";
import { getSRSTeams, NotionSRSTeamSchema } from "~/api/notion/schema/SRS";
import { GetStaticProps } from "next";
import { REVALIDATE_INTERVAL } from "~/Env";

export type SRSProps = {
  teams: NotionSRSTeamSchema[];
};

type ScheduleCardData = {
  quarter: "Fall" | "Winter" | "Spring",
  week: `Week ${number}` | "TBD",
  date: Date | "TBD",
  title: string,
  description: string,
}

const scheduleCards: ScheduleCardData[] = [
  {
    quarter: "Fall",
    week: "Week 3",
    date: new Date("19 Oct 2024"),
    title: "Team Lead Seminar",
    description: "Learn how to create a marketable idea and pitch it to the club!",
  },
  {
    quarter: "Fall",
    week: "Week 4",
    date: new Date("24 Oct 2024"),
    title: "Team Lead Seminar",
    description: "Learn how to create a marketable idea and pitch it to the club!",
  },
  {
    quarter: "Fall",
    week: "Week 4",
    date: new Date("26 Oct 2024"),
    title: "Team Lead Seminar",
    description: "Learn how to manage a team and create a project timeline.",
  },
  {
    quarter: "Fall",
    week: "Week 4",
    date: new Date("26 Oct 2024"),
    title: "Team Lead Applications Open",
    description: "",
  },
  {
    quarter: "Fall",
    week: "Week 6",
    date: new Date("9 Nov 2024"),
    title: "Team Lead Applications Close",
    description: "",
  },
  {
    quarter: "Winter",
    week: "Week 0",
    date: new Date("3 Jan 2025"),
    title: "Prototype Due",
    description: "Team leads will have to submit a prototype of their game idea.",
  },
  {
    quarter: "Winter",
    week: "Week 3",
    date: new Date("23 Jan 2025"),
    title: "Pitch Event",
    description: "Team leads will present their game ideas to the club",
  },
  {
    quarter: "Winter",
    week: "Week 3",
    date: new Date("23 Jan 2025"),
    title: "Member Applications Open",
    description: "Members can request to join a team",
  },
  {
    quarter: "Winter",
    week: "Week 4",
    date: new Date("31 Jan 2025"),
    title: "Member Applications Close",
    description: "",
  },
  {
    quarter: "Winter",
    week: "Week 5",
    date: new Date("2 Feb 2025"),
    title: "Kickoff",
    description: "Meet your team and start working on your game",
  },
  {
    quarter: "Winter",
    week: "TBD",
    date: "TBD",
    title: "Winter Showcase",
    description: "Showcase your progress during winter quarter",
  },
  {
    quarter: "Spring",
    week: "TBD",
    date: "TBD",
    title: "Spring Showcase",
    description: "The final showcase for your game",
  }
];


export const getStaticProps: GetStaticProps<SRSProps> = async (ctx) => {
  const teams = await getSRSTeams()
    .then(teams => teams.sort((a, b) => a.name.localeCompare(b.name)));

  return {
    props: {
      teams,
    },
    revalidate: REVALIDATE_INTERVAL,
  }
}

export default function SRSInfo(props: SRSProps) {
  const {
    teams,
  } = props;

  const theme = useTheme();
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [firstCardActive, setFirstCardActive] = React.useState(scheduleCards.length);

  const date = React.useRef<Date>(undefined);
  React.useEffect(() => {
    date.current = new Date();
    // ignore time, only compare dates
    date.current.setHours(0,0,0,0);
    // find first card with date >= today
    const currentIndex = scheduleCards.findIndex((card) => card.date >= date.current);
    if (currentIndex !== -1){
      setFirstCardActive(currentIndex);
      setCurrentIndex(Math.min(
        currentIndex,
        scheduleCards.length - visibleCount
      ));
    }
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      Math.min(scheduleCards.length - visibleCount, prevIndex + 1)
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      Math.max(0, prevIndex - 1)
    );
  };

  const md = useMediaQuery(theme.breakpoints.down("md"));
  const sm = useMediaQuery(theme.breakpoints.down("sm"));

  const visibleCount = React.useMemo(() => (
    sm
      ? 1
    : md
      ? 2
      : 3
  ), [md, sm])

  React.useEffect(() => {
    setCurrentIndex((prevIndex) =>
      Math.min(scheduleCards.length - visibleCount, prevIndex)
    );
  }, [visibleCount])

  const cardGap = 4;

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        scrollSnapAlign: "start",
        width: "100%",
      }}
    >
      <Metadata
        title="Student Run Studios"
      />
      <Stack gap={4}>
        <Typography
          component="h1"
          variant="display2"
        >
          Student Run Studios
        </Typography>
        <Stack gap={1}>
          <Typography>
            Each year, Studio splits into teams of students
            who work through the winter and spring quarters
            to put together an indie game. Students can apply
            to be team leads to pitch their idea to the club
            and have people join them to bring their game
            concept into reality!
          </Typography>
          <Typography>
            Last year, we had over 100 students collaborate to make
            11 finished games, all of which you can play on the
            official itch.io site!
          </Typography>
        </Stack>
        <Button
          variant="contained"
          href="https://itch.io/c/4447548/students-run-studios-2024"
          sx={{
            alignSelf: "start",
          }}
        >
          See the 2024 entries on itch.io!
        </Button>
        <Typography
          component="h2"
          variant="h1"
        >
          Schedule
        </Typography>
        <Box
          sx={{
            width: "100%",
            maxWidth: "100%",
            overflowX: "clip",
            position: "relative",
          }}
        >
          {/* Carousel Wrapper */}
          <Box
            sx={{
              px: 4,
              position: "relative",
            }}
          >
            <Stack direction="row"
              gap={cardGap}
              sx={{
                transition: theme.transitions.create(["transform"], {
                  duration: theme.transitions.duration.short,
                }),
                transform: `
                  translateX(calc(
                    ${-currentIndex * (100 / visibleCount)}%
                    + ${theme.spacing(cardGap/2)}
                  ))
                `,
                width: 0,
                minWidth: "100%",
              }}
            >
              {scheduleCards.map((card, i) => (
                <Card
                  key={`${card.title}${card.date}`}
                  elevation={i < firstCardActive ? 0 : 1}
                  sx={{
                    overflow: "visible",
                    position: "relative",
                    flexBasis: `calc(${100 / visibleCount}% - var(--mui-spacing)*${cardGap})`,
                    flexShrink: 0,
                    maxWidth: "100%",
                    alignSelf: "stretch",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                    py: 2,
                    px: 2,
                    ...i < firstCardActive ? {
                      color: theme.palette.text.disabled,
                    } : {}
                  }}
                >
                  <Typography variant="subtitle1" fontWeight="bold">
                    {card.quarter} {card.week}
                  </Typography>
                  { card.week !== "TBD" && (
                    <Typography variant="subtitle2" color="text.secondary">
                      {typeof card.date === "string" ? card.date : card.date.toDateString()}
                    </Typography>
                  )}
                  <Typography variant="body1" fontWeight="bold">
                    {card.title}
                  </Typography>
                  <Typography variant="body2">{card.description}</Typography>
                  {i < scheduleCards.length - 1 && (
                    <Stack
                      sx={{
                        width: theme.spacing(cardGap),
                        position: "absolute",
                        top: 0,
                        bottom: 0,
                        justifyContent: "center",
                        alignItems: "center",
                        right: `calc(-4*var(--mui-spacing) - 2px)`,
                        color: i >= currentIndex
                          ? theme.palette.primary.main
                          : "transparent",
                        transition: theme.transitions.create("color", {
                          duration: theme.transitions.duration.shortest,
                        }),
                      }}
                    >
                      <East/>
                  </Stack>)}
                </Card>
              ))}
            </Stack>
          </Box>
          <Box
            sx={{
            }}
          />

          {/* Navigation Buttons */}
          <Stack
            sx={{
              position: "absolute",
              top: 0, bottom: 0,
              left: 0,
              justifyContent: "center",
              background: "linear-gradient(90deg, white 0%, transparent 100%)"
            }}
          >
            <IconButton
              onClick={handlePrev}
              sx={{
                zIndex: 1,
              }}
            >
              <West/>
            </IconButton>
          </Stack>
          <Stack
            sx={{
              position: "absolute",
              top: 0, bottom: 0,
              right: 0,
              justifyContent: "center",
              background: "linear-gradient(-90deg, white 0%, transparent 100%)"
            }}
          >
            <IconButton
              onClick={handleNext}
              sx={{
                zIndex: 1,
              }}
            >
              <East/>
            </IconButton>
          </Stack>
        </Box>
        <Box component="section">
          <Typography
            component="h2"
            variant="h1"
            mb={2}
          >
            Join a Team
          </Typography>
          <Stack gap={1}>
            <Typography variant="body1">
              Interested in joining a team? Check out the teams below!
              We will have a pitch event where team leads will present
              their game ideas and you can join the team of your choice!
            </Typography>
            <Typography variant="body1">
              After the pitch event, will be able to fill out our SRS
              application form to join a team! Don't worry if
              you miss the pitch event, you can still join a team.
            </Typography>
            <Typography variant="body1">
              Too late for the application? You can still join a team!
              Either a team via our late-bird signup application
              or contact ACM Studio or a team directly to see
              if they have any open spots!
            </Typography>
          </Stack>
        </Box>
        <Box>
          <Typography
            component="h2"
            variant="h1"
            mb={2}
          >
            Current Cycle (2025)
          </Typography>
          <Typography variant="body1">
            Meet our teams this year!
          </Typography>
        </Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
            gap: 2,
          }}
        >
          {teams.map((team, index) => (
            <Card
              component="section"
              key={team.name}
              sx={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                overflow: "hidden",
                transition: theme.transitions.create([
                  "background-color",
                  "transform",
                ], {
                  duration: theme.transitions.duration.short,
                }),
                textAlign: "center",
                ...team.link && {
                  "&:hover": {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                    transform: "scale(1.01)",
                  }
                },
                gap: 2,
                p: 0,
                pt: team.image ? 0 : 4,
              }}
            >
              {team.image && <Box
                component={Image}
                src={team.image}
                alt=""
                sx={{
                  width: "100%",
                  height: "auto",
                  borderRadius: `calc(
                    var(--mui-shape-borderRadius)
                    - var(--mui-spacing)
                  )`
                }}
              />}
              <Box sx={{ px: 2, pb: 4 }}>
                <Box component="header" sx={{ mb: 1 }}>
                  <Typography variant="h3" component="h2" fontWeight="bold">
                    {team.name}
                  </Typography>
                  <Typography variant="subtitle1" color="text.secondary">
                    Leads: {team.leads.join(", ")}
                  </Typography>
                </Box>
                <Typography variant="body1"
                  textAlign="start"
                >{team.description}</Typography>

                {team.link &&
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: "50%",
                      transform: "translate(-50%, -50%)",
                      opacity: 0,
                      transition: theme.transitions.create("opacity", {
                        duration: theme.transitions.duration.short,
                      }),
                      "&:hover": {
                        opacity: 1,
                      },
                    }}
                  >
                    <Button
                      sx={{
                        opacity: 1,
                        width: "500px",
                        height: "500px",
                        color: "white",
                        backgroundColor: "rgba(255, 255, 255, 0)",
                      }}
                      href={team.link}
                    >
                      See Team
                    </Button>
                  </Box>
                }
              </Box>
            </Card>
          ))}
        </Box>
        <Box component="section">
          <Typography
            component="h2"
            variant="h1"
            mb={2}
          >
            Interested in Leading a Team?
          </Typography>
          <Stack gap={1}>
            <Typography variant="body1">
              Leading a team is a great way to get your
              game idea made and develop your skills
              as a project manager!
            </Typography>
            <Typography variant="body1">
              To be qualified to lead a team, you <em>must
              attend</em> our fall quarter <strong>Team Lead Seminars</strong>, which go over
              skills like making a marketable game idea, pitching,
              and managing a team. In addition, you will have to
              provide a vertical-slice prototype of your game idea by Winter quarter.
            </Typography>
            <Typography variant="body1">
              You can also join a team as a member and work
              with the team lead to make their game idea a reality!
              Oftentimes members will have the opportunity
              to take on leadership roles as well.
            </Typography>
            <Typography variant="body1">
              Team lead applications are available
              in fall quarter, so keep an eye out for
              announcements about the application!
              If you have any questions about leading a team,
              feel free to reach out to ACM Studio!
            </Typography>
          </Stack>
        </Box>
      </Stack>
    </Container>

  );
}
