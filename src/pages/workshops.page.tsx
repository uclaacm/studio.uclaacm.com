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

    if(!acc[year]){
      acc[year] = {};
    }

    if(!acc[year][quarter]){
      acc[year][quarter] = {};
    }

    if(!acc[year][quarter][week]){
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
  const days = Array.from(daySet).sort((a, b) => {
    const order = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    return order.indexOf(a) - order.indexOf(b);
  });

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
			<Typography variant="body1">
				We host workshops on a variety of topics,
				from game development to art to music.
			</Typography>
			<Stack component="section" spacing={1}>
				<Typography variant="h1">
					Upcoming Workshops
				</Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: `fit-content repeat(${days.length}, 1fr)`,
            columnGap: 1,
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
          {workshops.map(({ workshop, week, day}) => {
            const dayIndex = days.indexOf(day);
            return <Card component="section" key={workshop.name}
              sx={{
                gridColumnStart: dayIndex + 2,
                gridRowStart: week + 1,
                mb: 1,
              }}
            >
              <Typography variant="title1">{workshop.name}</Typography>
              <Typography variant="subtitle2">Week {week} {day}</Typography>
              <Typography variant="body2">{workshop.description}</Typography>
            </Card>
          })}
          {Array.from({ length: 10 }).map((_, i) => (
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