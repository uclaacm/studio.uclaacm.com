import { Box, Container, Divider, Stack, Typography } from "@mui/material";
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
    const dateLabel = date.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
    });
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

    acc[year][quarter][week][day] = { ...workshop, dateLabel };

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

type WorkshopEntry = NotionEventSchema & {
  /** the workshop's date, already written out for display */
  dateLabel: string;
};

type WorkshopsProps = {
  workshopsByWeekDay:
  Partial<Record<number,
    Partial<Record<string, WorkshopEntry>>
  >>,
};

/** a quarter is 10 weeks; anything outside that is not part of the schedule */
const WEEKS_IN_QUARTER = 10;

export default function Workshops(props: WorkshopsProps) {
  const {
    workshopsByWeekDay,
  } = props;
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

  const scheduledWorkshops = Object.entries(workshopsByWeekDay ?? {})
    .flatMap(([week, byDay]) =>
      Object.entries(byDay ?? {}).map(([day, workshop]) => ({
        workshop,
        week: parseInt(week),
        day,
      })),
    )
    .filter(
      ({ workshop, week, day }) =>
        workshop !== undefined &&
        dayOrder.includes(day) &&
        week >= 1 &&
        week <= WEEKS_IN_QUARTER,
    )
    .sort((a, b) =>
      a.week !== b.week
        ? a.week - b.week
        : dayOrder.indexOf(a.day) - dayOrder.indexOf(b.day),
    );

  const weeks = scheduledWorkshops.reduce<
    { week: number; entries: typeof scheduledWorkshops }[]
  >((acc, entry) => {
    const openGroup = acc[acc.length - 1];
    if (openGroup?.week === entry.week) {
      openGroup.entries.push(entry);
    } else {
      acc.push({ week: entry.week, entries: [entry] });
    }
    return acc;
  }, []);

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
          Fall 2026 Workshops
        </Typography>

        {weeks.length === 0 ? (
          <Typography variant="body1" fontStyle="italic">
            No workshops scheduled yet this quarter.
          </Typography>
        ) : (
          <Stack
            component="ol"
            spacing={4}
            sx={{
              listStyle: "none",
              m: 0,
              p: 0,
            }}
          >
            {weeks.map(({ week, entries }) => (
              <Box component="li" key={week}>
                <Typography
                  variant="title2"
                  component="h3"
                  color="primary"
                  fontWeight={700}
                >
                  Week {week}
                </Typography>
                <Divider sx={{ mt: 0.5, mb: 1.5 }} />
                <Stack spacing={1.5}>
                  {entries.map(({ workshop, day }) => (
                    <Card key={`${week}-${day}`} elevation={1}>
                      <Typography variant="subtitle2" fontWeight={700}>
                        {[workshop.dateLabel, workshop.subcategory]
                          .filter(Boolean)
                          .join(" \u00b7 ")}
                      </Typography>
                      <Typography variant="title1" component="h4">
                        {workshop.name}
                      </Typography>
                      {workshop.description && (
                        <Typography
                          variant="body2"
                          sx={{ color: "text.secondary" }}
                        >
                          {workshop.description}
                        </Typography>
                      )}
                    </Card>
                  ))}
                </Stack>
              </Box>
            ))}
          </Stack>
        )}
      </Stack>
    </Container>
  );
}