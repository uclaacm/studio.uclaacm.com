/**
 * Events page
 * Layout is as follows:
 *  Events: Header and month control
 *      Calendar: calendar display
 *          CalendarCell: single cell in calendar
 *              CalendarEvent: single event in calendar cell
 *                  EventCard: Popover for clicking on event in calendar cell
 *      UpcomingEventsList: upcoming events
 *          EventCard: single event in upcoming event list
 */

import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import BackgroundContainer from "~/components/BackgroundContainer";
import {
  IconButton as MUIIconButton,
  Button,
  CardActions,
  CardContent,
  CardHeader,
  ClickAwayListener,
  Paper,
  Popper,
  Skeleton,
  Stack,
  useTheme,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { objectGroupBy } from "~/util/polyfills";
import IconButton from "~/components/IconButton";
import IsaxIcon from "~/components/IsaxIcon";
import theme from "~/theme";


import {
  ArrowLeft as ArrowLeftIcon,
  ArrowRight as ArrowRightIcon,
  Close as CloseIcon,
} from "@mui/icons-material";

import getRandomEmoticon from "~/util/getRandomEmoticon";
import Metadata from "~/components/Metadata";
import { Card } from "~/components/Card";

type EventProps = {};

type EventsData = gapi.client.calendar.Events;
type EventData = gapi.client.calendar.Event;
type EventStatus = gapi.client.calendar.EventStatus;

function getFirstSundayBeforeMonth(dayInMonth: Date) {
  const date = new Date(dayInMonth);
  date.setDate(1); // go to first day of month
  const day = date.getDay();
  date.setDate(date.getDate() - day);
  return date;
}

function getDayName(day: number) {
  const date = new Date();
  date.setDate(date.getDate() - date.getDay() + day);
  return date.toLocaleString("default", {
    weekday: "short",
  });
}

function getMonthYear(date: Date) {
  return date.toLocaleString("default", {
    month: "long",
    year: "numeric",
  });
}

function normalizeDate(date: Date) {
  return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function eventGetTimeString(evt: EventData) {
  const start = new Date(evt.start.dateTime);
  const end = new Date(evt.end.dateTime);
  const intlOptions: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    hourCycle: "h12",
    minute: "numeric",
  };
  return `${start.toLocaleTimeString("default", intlOptions)}\u2013${end.toLocaleTimeString("default", intlOptions)}`;
}

function eventGetDateTimeString(evt: EventData) {
  const start = new Date(evt.start.dateTime);
  const intlOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "short",
  };
  return `${start.toLocaleDateString("default", intlOptions)} ${eventGetTimeString(evt)}`;
}

type EventCardProps = {
  event: EventData;
  action?: React.ReactNode;
};

function EventCard({ event, action }: EventCardProps) {
  return (
    <Card elevation={1} sx={{ maxWidth: "360px" }} opaque>
      <CardHeader
        title={event.summary}
        action={action}
        subheader={
          <>
            <Typography variant="body1">
              {eventGetDateTimeString(event)}
            </Typography>
            <Typography variant="body1">{event.location}</Typography>
          </>
        }
        titleTypographyProps={{
          marginRight: 2,
        }}
        sx={{ paddingBottom: 0 }}
      />
      {event.description && (
        <CardContent sx={{ paddingBottom: 0 }}>
          <Typography variant="subtitle1">{event.description}</Typography>
        </CardContent>
      )}
      <CardActions>
        <IconButton
          size="small"
          href={event.htmlLink}
          target="_blank"
          title="Google Calendar Event"
        >
          <IsaxIcon name="isax-calendar-2" />
        </IconButton>
      </CardActions>
    </Card>
  );
}

type CalendarHeaderProps = {
  weekday: string;
};

function CalendarHeader({ weekday }: CalendarHeaderProps) {
  return (
    <Typography variant="h3" align="center" textTransform="lowercase">
      {weekday}
    </Typography>
  );
}

type CalendarEventProps = {
  event: EventData;
};

function CalendarEvent({ event }: CalendarEventProps) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  return (
    <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
      <Button
        variant="outlined"
        onMouseDown={(evt) => {
          // don't cause this cell to be selected
          evt.stopPropagation();
        }}
        onClick={(evt) => {
          if (anchorEl === null) {
            setAnchorEl(evt.currentTarget);
          } else {
            setAnchorEl(null);
          }
        }}
        sx={{
          px: 1,
          textAlign: "start",
        }}
      >
        <Popper anchorEl={anchorEl} open={anchorEl !== null}>
          <EventCard
            event={event}
            action={
              <MUIIconButton
                size="small"
                onClick={(evt) => {
                  setAnchorEl(null);

                  // stop propagation so that the
                  // button doesn't receive a click event
                  // and reopen the popper
                  evt.stopPropagation();
                }}
              >
                <CloseIcon color="primary" />
              </MUIIconButton>
            }
          />
        </Popper>
        <Stack>
          <Typography variant="body1" lineHeight={1.3} fontSize="0.8rem">
            {event.summary}
          </Typography>
          <Typography variant="body1" lineHeight={1.3} fontSize="0.8rem">
            {eventGetTimeString(event)}
          </Typography>
        </Stack>
      </Button>
    </ClickAwayListener>
  );
}

type CalendarCellProps = {
  date?: Date;
  events?: Partial<Record<EventStatus, EventData[]>>;
  isToday?: boolean;
  isThisMonth?: boolean;
};

function CalendarCell(props: CalendarCellProps) {
  const { date, events, isToday, isThisMonth } = props;

  const loading = date === null || events === null;

  const SkeletonContainer = loading ? Skeleton : React.Fragment;

  const curEvents = React.useMemo(() => {
    if (!events) return null;
    return [
      ...(events.confirmed?.filter((event) => {
        const eventDateTime = new Date(event.start.dateTime);
        const eventDate = normalizeDate(eventDateTime);
        return eventDate.getTime() == date.getTime();
      }) ?? []),
    ];
  }, [events]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplate: "1fr / 1fr",
      }}
    >
      <Box
        sx={{
          backgroundColor: "white",
          gridRowStart: 1,
          gridColumnStart: 1,
        }}
      />
      <Stack
        sx={{
          py: 1,
          gridRowStart: 1,
          gridColumnStart: 1,
          minHeight: "8rem",
          gap: 1,
          margin: `0 ${theme.spacing(1)}`,
        }}
      >
        {/* Date and selection indicator */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <SkeletonContainer>
            <Typography
              variant="h3"
              sx={(theme) => ({
                userSelect: "none",
                color: !isThisMonth ? "lightgray" : "black",
                ...(isToday && {
                  bgcolor: "primary.main",
                  color: "primary.contrastText",
                  borderRadius: "50%",
                  width: "2.5rem",
                  height: "2.5rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }),
              })}
            >
              {date.getDate()}
            </Typography>
          </SkeletonContainer>
        </Box>

        {/* Events */}
        <Stack direction="column" gap={1}>
          {curEvents?.map((event) => (
            <CalendarEvent event={event} key={event.start.dateTime} />
          ))}
          {loading && <Skeleton width="100%" height="32px"></Skeleton>}
        </Stack>
      </Stack>
    </Box>
  );
}

type CalendarProps = {
  data?: EventsData;
  monthStartDay?: Date;
  eventsByStatus?: Partial<Record<EventStatus, EventData[]>>;
  setMonthStartDay: React.Dispatch<React.SetStateAction<Date | null>>;
  todaysDate?: Date;
};

function Calendar({
  data,
  monthStartDay,
  setMonthStartDay,
  eventsByStatus,
  todaysDate,
}: CalendarProps) {
  const calendarStartDay = React.useMemo(() => {
    return getFirstSundayBeforeMonth(monthStartDay);
  }, [monthStartDay]);

  const loading = React.useMemo(
    () => monthStartDay === null || data === null,
    [monthStartDay, data],
  );
  const SkeletonContainer = loading ? Skeleton : React.Fragment;

  return (
    <Box
      sx={{
        flexGrow: 4,
        // Seven columns need ~40rem to stay readable, so the grid is desktop
        // only - phones get <MonthAgenda /> instead. minWidth:0 matters as
        // well: as a flex item this defaults to min-content, so the 40rem grid
        // used to force the whole page wider instead of scrolling inside it.
        display: { xs: "none", md: "block" },
        minWidth: 0,
        overflowX: "auto",
      }}
    >
      {/* Days of the week */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(7, 1fr)",
          minWidth: { xs: "40rem", md: "auto" },
          backgroundColor: theme.palette.secondary.light,
        }}
      >
        {Array.from({ length: 7 }).map((_, i) => (
          <SkeletonContainer key={`loading${i}`}>
            <CalendarHeader weekday={getDayName(i)} key={i} />
          </SkeletonContainer>
        ))}
      </Box>
      {/* Cells */}
      <Box
        sx={{
          width: "100%",
          height: "100%",
          display: "grid",
          gridTemplate: "repeat(5, 1fr) / repeat(7, 1fr)",
          minWidth: { xs: "40rem", md: "auto" },
          backgroundColor: theme.palette.secondary.light,
        }}
        gap={0.25}
        padding={0.25}
      >
        {Array.from({ length: 42 }).map((_, i) => {
          const cellDate = new Date(calendarStartDay);
          cellDate.setDate(cellDate.getDate() + i);
          const normalizedDate = normalizeDate(cellDate)
          const isThisMonth = normalizedDate.getMonth() === monthStartDay?.getMonth()
            && normalizedDate.getFullYear() === monthStartDay?.getFullYear()
          return (
            <CalendarCell
              key={cellDate.getTime()}
              date={normalizedDate}
              events={eventsByStatus}
              isToday={todaysDate?.getTime() === normalizedDate.getTime()}
              isThisMonth={isThisMonth}
            />
          );
        })}
      </Box>
    </Box>
  );
}

type MonthAgendaProps = {
  monthStartDay?: Date;
  eventsByStatus?: Partial<Record<EventStatus, EventData[]>>;
  loading?: boolean;
};

/**
 * The phone view of a month. A 7x6 grid cannot show an event title in ~45px of
 * column, so instead of shrinking it (or making the page scroll sideways) the
 * same events are listed a day at a time, which fits any width and clips
 * nothing.
 */
function MonthAgenda({
  monthStartDay,
  eventsByStatus,
  loading,
}: MonthAgendaProps) {
  const daysWithEvents = React.useMemo(() => {
    if (!monthStartDay) return [];
    const inMonth = (eventsByStatus?.confirmed ?? [])
      .filter((event) => {
        const date = new Date(event.start.dateTime);
        return (
          date.getMonth() === monthStartDay.getMonth() &&
          date.getFullYear() === monthStartDay.getFullYear()
        );
      })
      .sort(
        (a, b) =>
          new Date(a.start.dateTime).getTime() -
          new Date(b.start.dateTime).getTime(),
      );

    const byDay = new Map<number, EventData[]>();
    inMonth.forEach((event) => {
      const key = normalizeDate(new Date(event.start.dateTime)).getTime();
      byDay.set(key, [...(byDay.get(key) ?? []), event]);
    });
    return [...byDay.entries()];
  }, [eventsByStatus, monthStartDay]);

  return (
    <Stack
      sx={{
        display: { xs: "flex", md: "none" },
        gap: 2,
        // it sits next to the (hidden) grid in a row Stack, so without this it
        // shrinks to its content and the loading skeletons collapse to nothing
        flexGrow: 1,
        width: "100%",
        minWidth: 0,
      }}
    >
      {loading &&
        Array.from({ length: 3 }).map((_, i) => (
          <Skeleton key={`loading${i}`} height="140px" />
        ))}
      {!loading && daysWithEvents.length === 0 && (
        <Typography variant="body1">nothing on this month</Typography>
      )}
      {!loading &&
        daysWithEvents.map(([day, events]) => (
          <Box key={day}>
            <Typography variant="title2" fontWeight={700} gutterBottom>
              {new Date(day).toLocaleDateString("default", {
                weekday: "long",
                month: "long",
                day: "numeric",
              })}
            </Typography>
            <Stack gap={1}>
              {events.map((event) => (
                <EventCard event={event} key={event.start.dateTime} />
              ))}
            </Stack>
          </Box>
        ))}
    </Stack>
  );
}

type UpcomingEventsListProps = {
  data?: EventsData;
  eventsByStatus?: Partial<Record<EventStatus, EventData[]>>;
  todaysDate?: Date;
};

function UpcomingEventsList({
  data,
  eventsByStatus,
  todaysDate,
}: UpcomingEventsListProps) {
  const loading = React.useMemo(
    () => todaysDate === null || data === null,
    [todaysDate, data],
  );
  const SkeletonContainer = loading ? Skeleton : React.Fragment;

  const [sadEmoticon, setSadEmoticon] = React.useState("");

  React.useEffect(() => {
    setSadEmoticon(getRandomEmoticon({ emotion: "sad" }));
  }, []);

  const thisMonthsEvents = React.useMemo(() => {
    return eventsByStatus?.confirmed?.filter((event) => {
      const eventDateTime = new Date(event.start.dateTime);
      return eventDateTime.getTime() >= todaysDate.getTime();
    });
  }, [todaysDate, eventsByStatus]);

  return (
    <Box sx={{ width: "180px" }}>
      <Typography
        variant="title1"
        whiteSpace="nowrap"
        fontWeight="bold"
        gutterBottom
      >
        upcoming
      </Typography>
      <Stack gap={1}>
        {loading &&
          Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={`loading${i}`} height="128px"></Skeleton>
          ))}
        {!loading &&
          thisMonthsEvents?.map((event) => (
            <EventCard event={event} key={event.start.dateTime} />
          ))}
        {thisMonthsEvents?.length === 0 && (
          <Typography variant="body1">
            no upcoming events <code>{sadEmoticon}</code>
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

const GCLOUD_API_KEY = process.env.NEXT_PUBLIC_GCLOUD_API_KEY;
const CALENDAR_ID = "c_729vu5u1obkg7nu762sh687bp8@group.calendar.google.com";
const EVENTS_ENDPOINT = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GCLOUD_API_KEY}`;

export default function Events({}: EventProps) {
  const [eventsData, setEventsData] = React.useState<EventsData | null>(null);
  const [todayDate, setTodayDate] = React.useState<Date | null>(null);
  const [monthStartDay, setMonthStartDay] = React.useState<Date | null>(null);

  const [errorOpen, setErrorOpen] = React.useState(false);
  const error = React.useRef<string | null>(null);

  React.useEffect(() => {
    setTodayDate(normalizeDate(new Date()));

    const today = new Date();
    today.setDate(1);
    setMonthStartDay(normalizeDate(today));
  }, []);

  const eventsByStatus = React.useMemo(() => {
    if (!eventsData) return null;
    return objectGroupBy(eventsData.items, (v) => v.status);
  }, [eventsData]);

  // fetch Google API endpoint
  React.useEffect(() => {
    fetch(EVENTS_ENDPOINT, {
      method: "get",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((v) => {
        if (v.status === 403) {
          console.error(
            "Google Calendar API error: Unauthorized. This is likely because the NEXT_PUBLIC_GCLOUD_API_KEY environment variable is unset.",
          );
          throw new Error("Internal error");
        } else {
          return v.json();
        }
      })
      .then((json) => setEventsData(json as EventsData))
      .catch((e: Error) => {
        error.current = `${e.message} ${getRandomEmoticon({ emotion: "sad" })}`;
        setErrorOpen(true);
      });
  }, []);

  const loading = React.useMemo(
    () => monthStartDay === null || eventsData === null,
    [monthStartDay, eventsData],
  );
  const SkeletonContainer = loading ? Skeleton : React.Fragment;

  const addMonth = (n: number) => {
    setMonthStartDay((oldDate) => {
      const newDate = new Date(oldDate);
      newDate.setMonth(newDate.getMonth() + n);
      return newDate;
    });
  };

  return (
    <BackgroundContainer>
      {/* <Snackbar
        open={errorOpen}
        autoHideDuration={10_000}
        onClose={() => {
          setErrorOpen(false);
        }}
      >
        <Alert
          onClose={() => {
            setErrorOpen(false);
          }}
          severity="error"
          variant="filled"
        >
          {error.current}
        </Alert>
      </Snackbar> */}

      <Metadata title="Events" />
      <Typography variant="h1">events</Typography>
      <SkeletonContainer>
        <Stack direction="row">
          <Stack justifyContent="center">
            <MUIIconButton
              color="primary"
              disableRipple={false}
              onClick={() => {
                addMonth(-1);
              }}
            >
              <ArrowLeftIcon />
            </MUIIconButton>
          </Stack>
          {/* 26rem is ~the widest any month name gets, which is wider than a
            phone all by itself. Let it be a hard cap rather than a fixed
            width so the row can shrink to whatever space there is. */}
          <Box sx={{ width: "100%", maxWidth: "26rem", minWidth: 0 }}>
            <Typography
              variant="h2"
              textAlign="center"
              textTransform="lowercase"
            >
              {monthStartDay && getMonthYear(monthStartDay)}
            </Typography>
          </Box>
          <Stack justifyContent="center">
            <MUIIconButton
              color="primary"
              disableRipple={false}
              onClick={() => {
                addMonth(1);
              }}
            >
              <ArrowRightIcon />
            </MUIIconButton>
          </Stack>
        </Stack>
      </SkeletonContainer>
      <Stack direction="row" gap={2} sx={{ minWidth: 0 }}>
        <MonthAgenda
          monthStartDay={monthStartDay}
          eventsByStatus={eventsByStatus}
          loading={monthStartDay === null || eventsData === null}
        />
        <Calendar
          data={eventsData}
          eventsByStatus={eventsByStatus}
          monthStartDay={monthStartDay}
          setMonthStartDay={setMonthStartDay}
          todaysDate={todayDate}
        />
        {/* <Divider orientation="vertical" flexItem />
        <UpcomingEventsList
          data={eventsData}
          eventsByStatus={eventsByStatus}
          todaysDate={todayDate}
        /> */}
      </Stack>
    </BackgroundContainer>
  );
}
