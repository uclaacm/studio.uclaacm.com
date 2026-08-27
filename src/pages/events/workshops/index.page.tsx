import { Box, Container, Stack, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import { getEvents, NotionEventSchema } from "~/api/notion/schema";
import { Card } from "~/components/Card";
import Metadata from "~/components/Metadata";
import { dateToQuarterWeek } from "~/util/dateToQuarterWeek";

export const getServerSideProps: GetServerSideProps<WorkshopsProps> = async () => {
  const workshops = (await getEvents({
    category: "Workshop",
  }));

  const workshopsByQuarterWeekDay = workshops.reduce<
    Partial<Record<number,
      Partial<Record<string,
        WorkshopsProps["workshopsByWeekDay"]
      >>
    >>
  >((acc, workshop) => {
    const date = new Date(`${workshop.date} PST`);
    const day = date.toLocaleDateString("en-US", { weekday: "long" });
    const { quarter, week, year } = dateToQuarterWeek(date);

    if (!acc[year]) {
      acc[year] = {};
    }

    if (!acc[year][quarter]) {
      acc[year][quarter] = {};
    }

    if (!acc[year][quarter][week]) {
      acc[year][quarter][week] = {};
    }

    acc[year][quarter][week][day] = workshop;

    return acc;
  }, {});

  const {
    quarter: currentQuarter,
    year: currentYear
  } = dateToQuarterWeek(new Date());

  return {
    props: {
      workshopsByWeekDay: workshopsByQuarterWeekDay
      [currentYear]
        ?.[currentQuarter],
    },
  };
}

type WorkshopsProps = {
  workshopsByWeekDay:
  Partial<Record<number,
    Partial<Record<string, NotionEventSchema>>
  >>,
};

/** a quarter is 10 weeks; anything outside that is not part of the schedule */
const WEEKS_IN_QUARTER = 10;

export default function Workshops(props: WorkshopsProps) {
  const {
    workshopsByWeekDay,
  } = props;
  const workshops = Object.entries(workshopsByWeekDay ?? {}).flatMap(
    ([week, byDay]) => Object.entries(byDay ?? {}).flatMap(
      ([day, workshop]) => ({
        workshop,
        week: parseInt(week),
        day,
      })
    )
  )

  // get set of possible days for workshops
  const daySet = new Set(
    Object.values(workshopsByWeekDay ?? {})
      .flatMap((byDay) => Object.keys(byDay ?? {}))
  );

  // order by day of week
  const dayOrder = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  const days = Array.from(daySet).sort((a, b) => {
    return dayOrder.indexOf(a) - dayOrder.indexOf(b);
  });

  days.forEach((day, index) => {
    if(day == "Invalid Date")
      {
        days.splice(index, 1)
      }

  })

  // the entries that actually have a workshop, in the order they happen -
  // this is what the phone layout lists. Capped at the 10 weeks in a quarter,
  // same as the grid: dateToQuarterWeek sometimes hands back week numbers in
  // the 40s, and those are out of quarter rather than real entries.
  const scheduledWorkshops = workshops
    .filter(
      ({ workshop, week }) =>
        workshop !== undefined && week >= 1 && week <= WEEKS_IN_QUARTER,
    )
    .sort((a, b) =>
      a.week !== b.week
        ? a.week - b.week
        : dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day),
    );

  return (
    <Container
      maxWidth="md"
      sx={{
        py: 4,
        width: "100%",
      }}
    >
      <Metadata
        title="Workshops"
      />
      <Typography component="h1" variant="display2">Workshops</Typography>
      <Typography variant="body1" gutterBottom>
        We host workshops on a variety of topics,
        from game development to art to music.
      </Typography>
      <Stack component="section" spacing={1} sx={{ minWidth: 0 }}>
        <Typography variant="h1">
          Winter 2025 Workshops
        </Typography>

        {/*
          Phones get the same information as a plain list. The week-by-day grid
          needs ~36rem to stay legible, which is wider than a phone, and it is
          mostly "No workshop" filler - a whole quarter is typically a handful
          of real entries. Listing only those fits without scrolling sideways
          and without clipping any titles.
        */}
        <Stack
          component="ol"
          spacing={1.5}
          sx={{
            display: { xs: "flex", md: "none" },
            listStyle: "none",
            m: 0,
            p: 0,
          }}
        >
          {scheduledWorkshops.length === 0 && (
            <Typography variant="body1" fontStyle="italic">
              No workshops scheduled yet this quarter.
            </Typography>
          )}
          {scheduledWorkshops.map(({ workshop, week, day }) => (
            <Card
              component="li"
              key={`${week}-${day}`}
              elevation={1}
              sx={{ display: "block" }}
            >
              <Typography variant="subtitle2" color="primary" fontWeight={700}>
                Week {week} &middot; {day}
              </Typography>
              <Typography variant="title1" component="h3">
                {workshop.name}
              </Typography>
              {workshop.description && (
                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                  {workshop.description}
                </Typography>
              )}
            </Card>
          ))}
        </Stack>

        <Box
          sx={{
            display: { xs: "none", md: "grid" },
            gridTemplateColumns: `fit-content repeat(${days.length}, 1fr)`,
            columnGap: 1,
            minWidth: 0,
          }}
        >
          <Typography variant="subtitle1" textAlign="center" alignSelf="end">
            Week
          </Typography>
          {days.map((day) => (
            
            <Typography key={day} variant="title2" textAlign="center">
              {day}
            </Typography>
          ))}
          {Array.from({ length: WEEKS_IN_QUARTER }).map((_, i) => i + 1).map((week) => (
            days.map((day, dayIndex) => {
              const workshop = workshopsByWeekDay?.[week]?.[day];
              return <Card
                component="section"
                key={workshop?.name ?? `${week}-${day}`}
                sx={{
                  gridColumnStart: dayIndex + 2,
                  gridRowStart: week + 1,
                  mb: 1,
                  display: "flex",
                  flexDirection: "column",
                }}
                elevation={workshop === undefined ? 0 : 1}
              >
                {workshop &&
                  <>
                    <Typography variant="title1">{workshop.name}</Typography>
                    <Typography variant="subtitle2">Week {week} {day}</Typography>
                    <Typography variant="body2">{workshop.description}</Typography>
                  </>
                }
                {workshop === undefined &&
                  <Stack sx={{
                    flexGrow: 1,
                    justifyContent: "center",
                  }}>
                    <Typography variant="body2" fontStyle="italic" textAlign="center">
                      No workshop
                    </Typography>
                  </Stack>
                }
              </Card>
            })
          ))}
          {Array.from({ length: WEEKS_IN_QUARTER }).map((_, i) => (
            <Typography key={i} variant="subtitle1" textAlign="center"
              alignSelf="center"
              sx={{
                gridColumnStart: 1,
                gridRowStart: i + 2,
              }}
            >
              {i + 1}
            </Typography>
          ))}
        </Box>
      </Stack>
    </Container>
  );
}