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
import Container from "~/components/Container";
import { IconButton as MUIIconButton, Button, Card, CardActions, CardContent, CardHeader, ClickAwayListener, Paper, Popper, Skeleton, Stack, useTheme, Divider, Snackbar, Alert } from "@mui/material";
import { objectGroupBy } from "~/util/polyfills";
import IconButton from "~/components/IconButton";
import IsaxIcon from "~/components/IsaxIcon";

import { ArrowLeft as ArrowLeftIcon, ArrowRight as ArrowRightIcon, Close as CloseIcon } from "@mui/icons-material";
import Head from "next/head";
import Title from "~/components/Title";
import getRandomEmoticon from "~/util/getRandomEmoticon";

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
        weekday: "short"
    });
}

function getMonthYear(date: Date) {
    return date.toLocaleString("default", {
        month: "long",
        year: "numeric"
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
    }
    return `${start.toLocaleTimeString("default", intlOptions)}\u2013${end.toLocaleTimeString("default", intlOptions)}`
}

function eventGetDateTimeString(evt: EventData) {
    const start = new Date(evt.start.dateTime);
    const intlOptions: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "long",
        day: "numeric",
        weekday: "short",
    }
    return `${start.toLocaleDateString("default", intlOptions)} ${eventGetTimeString(evt)}`
}

type EventCardProps = {
    event: EventData,
    action?: React.ReactNode,
}

function EventCard({ event, action }: EventCardProps){
    return <Card elevation={1} sx={{ maxWidth: "360px" }}>
        <CardHeader
            title={event.summary}
            action={action}
            subheader={<>
                <Typography variant="body1">{eventGetDateTimeString(event)}</Typography>
                <Typography variant="body1">{event.location}</Typography>
            </>}
            titleTypographyProps={{
                marginRight: 2,
            }}
            sx={{ paddingBottom: 0, }}
        />
        {event.description && (
            <CardContent sx={{ paddingBottom: 0, }}>
                <Typography variant="subtitle1">{event.description}</Typography>
            </CardContent>
        )}
        <CardActions>
            <IconButton size="small" href={event.htmlLink} target="_blank" title="Google Calendar Event">
                <IsaxIcon name="isax-calendar-2" />
            </IconButton>
        </CardActions>
    </Card>
}

type CalendarHeaderProps = {
    weekday: string,
}

function CalendarHeader({ weekday }: CalendarHeaderProps) {
    return <Typography variant="h3" align="center" textTransform="lowercase">{weekday}</Typography>
}

type CalendarEventProps = {
    event: EventData
}

function CalendarEvent({ event }: CalendarEventProps) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

    return <ClickAwayListener onClickAway={() => setAnchorEl(null)}>
        <Button variant="outlined"
            onMouseDown={(evt) => {
                // don't cause this cell to be selected
                evt.stopPropagation();
            }}
            onClick={(evt) => {
                if(anchorEl === null) {
                    setAnchorEl(evt.currentTarget);
                }
                else {
                    setAnchorEl(null);
                }
            }}
            sx={{
                px: 1,
                textAlign: "start",
            }}
        >
            <Popper anchorEl={anchorEl} open={anchorEl !== null}>
                <EventCard event={event}
                    action={
                        <MUIIconButton size="small" onClick={(evt) => {
                            setAnchorEl(null);

                            // stop propagation so that the
                            // button doesn't receive a click event
                            // and reopen the popper
                            evt.stopPropagation();
                        }}>
                            <CloseIcon color="primary" />
                        </MUIIconButton>
                    }
                />
            </Popper>
            <Stack>
                <Typography variant="body1" lineHeight={1.3} fontSize="0.8rem">{event.summary}</Typography>
                <Typography variant="body1" lineHeight={1.3} fontSize="0.8rem">{eventGetTimeString(event)}</Typography>
            </Stack>
        </Button>
    </ClickAwayListener>
}

type CalendarCellProps = {
    date?: Date,
    events?: Partial<Record<EventStatus, EventData[]>>
}

function CalendarCell(props: CalendarCellProps) {
    const {
        date,
        events
    } = props;

    const loading = date === null || events === null;

    const SkeletonContainer = loading ? Skeleton : React.Fragment;

    const curEvents = React.useMemo(() => {
        if (!events) return null;
        return [
            ...events.confirmed?.filter(event => {
                const eventDateTime = new Date(event.start.dateTime);
                const eventDate = normalizeDate(eventDateTime);
                return eventDate.getTime() == date.getTime();
            }) ?? [],
        ]
    }, [events])

    return <Box sx={{
        display: "grid",
        gridTemplate: "1fr / 1fr",
    }}>
        <Box sx={{
            gridRowStart: 1, gridColumnStart: 1,
        }} />
        <Stack
            sx={{
                py: 1,
                gridRowStart: 1, gridColumnStart: 1,
                minHeight: "8rem",
                gap: 1,
            }}
        >
            {/* Date and selection indicator */}
            <Box sx={{
                display: "flex",
                justifyContent: "center",
            }}>
                <SkeletonContainer>
                    <Typography variant="h3" sx={theme => ({
                        userSelect: "none",
                    })}>
                        {date.getDate()}
                    </Typography>
                </SkeletonContainer>
            </Box>

            {/* Events */}
            <Stack direction="column" gap={1}>
                {curEvents?.map(event => (
                    <CalendarEvent event={event} key={event.start.dateTime} />
                ))}
                {loading && <Skeleton width="100%" height="32px"></Skeleton>}
            </Stack>
        </Stack>
    </Box>
}

type CalendarProps = {
    data?: EventsData,
    monthStartDay?: Date,
    eventsByStatus?: Partial<Record<EventStatus, EventData[]>>
    setMonthStartDay: React.Dispatch<React.SetStateAction<Date | null>>
}

function Calendar({ data, monthStartDay, setMonthStartDay, eventsByStatus }: CalendarProps) {
    const calendarStartDay = React.useMemo(() => {
        return getFirstSundayBeforeMonth(monthStartDay);
    }, [monthStartDay]);

    const loading = React.useMemo(() => monthStartDay === null || data === null, [monthStartDay, data])
    const SkeletonContainer = loading ? Skeleton : React.Fragment;

    return <Box sx={{ flexGrow: 4, }}>
        {/* Days of the week */}
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
        }}>
            {Array.from({ length: 7 }).map((_, i) => (
                <SkeletonContainer key={`loading${i}`}><CalendarHeader weekday={getDayName(i)} key={i} /></SkeletonContainer>
            ))}
        </Box>
        {/* Cells */}
        <Box
            sx={{
                width: "100%", height: "100%",
                display: "grid",
                gridTemplate: "repeat(5, 1fr) / repeat(7, 1fr)",
            }}
            gap={0.25}
        >
            {
                Array.from({ length: 42 }).map((_, i) => {
                    const cellDate = new Date(calendarStartDay);
                    cellDate.setDate(cellDate.getDate() + i);
                    return (
                        <CalendarCell
                            key={cellDate.getTime()}
                            date={normalizeDate(cellDate)}
                            events={eventsByStatus}
                        />
                    );
                })
            }
        </Box>
    </Box>
}

type UpcomingEventsListProps = {
    data?: EventsData,
    eventsByStatus?: Partial<Record<EventStatus, EventData[]>>,
    todaysDate?: Date,
}

function UpcomingEventsList({ data, eventsByStatus, todaysDate }: UpcomingEventsListProps){
    const loading = React.useMemo(() => todaysDate === null || data === null, [todaysDate, data])
    const SkeletonContainer = loading ? Skeleton : React.Fragment;

    const [sadEmoticon, setSadEmoticon] = React.useState("");

    React.useEffect(() => {
        setSadEmoticon(getRandomEmoticon({ emotion: "sad" }));
    }, []);

    const thisMonthsEvents = React.useMemo(() => {
        return eventsByStatus?.confirmed?.filter(event => {
            const eventDateTime = new Date(event.start.dateTime);
            return eventDateTime.getTime() >= todaysDate.getTime();
        })
    }, [todaysDate, eventsByStatus]);

    return <Box sx={{ width: "180px" }}>
        <Typography variant="h4" whiteSpace="nowrap" fontWeight="bold" gutterBottom>upcoming</Typography>
        <Stack gap={1}>
            { loading && Array.from({ length: 4 }).map((_, i) => <Skeleton key={`loading${i}`} height="128px"></Skeleton>)}
            { !loading && thisMonthsEvents?.map((event) => <EventCard event={event} key={event.start.dateTime}/>)}
            { thisMonthsEvents?.length === 0 && <Typography variant="body1">no upcoming events <pre>{sadEmoticon}</pre></Typography> }
        </Stack>
    </Box>
}

const GCLOUD_API_KEY = process.env.NEXT_PUBLIC_GCLOUD_API_KEY;
const CALENDAR_ID = "c_729vu5u1obkg7nu762sh687bp8@group.calendar.google.com";
const EVENTS_ENDPOINT = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GCLOUD_API_KEY}`;

export default function Events({ }: EventProps) {
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
    }, [])

    const eventsByStatus = React.useMemo(() => {
        if (!eventsData) return null;
        return objectGroupBy(eventsData.items, (v) => v.status);
    }, [eventsData]);

    // fetch Google API endpoint
    React.useEffect(() => {
        fetch(EVENTS_ENDPOINT, {
            method: "get",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(v => {
                if (v.status === 403) {
                    console.error("Google Calendar API error: Unauthorized. This is likely because the NEXT_PUBLIC_GCLOUD_API_KEY environment variable is unset.")
                    throw new Error("Internal error");
                }
                else {
                    return v.json()
                }
            })
            .then(json => setEventsData(json as EventsData))
            .catch((e: Error) => {
                error.current = `${e.message} ${getRandomEmoticon({ emotion: "sad" })}`;
                setErrorOpen(true);
            })
    }, [])

    const loading = React.useMemo(() => monthStartDay === null || eventsData === null, [monthStartDay, eventsData])
    const SkeletonContainer = loading ? Skeleton : React.Fragment;

    const addMonth = (n: number) => {
        setMonthStartDay(oldDate => {
            const newDate = new Date(oldDate);
            newDate.setMonth(newDate.getMonth() + n);
            return newDate;
        })
    }

    return (
        <Container>
            <Snackbar
                open={errorOpen}
                autoHideDuration={10_000}
                onClose={() => { setErrorOpen(false) }}
            >
                <Alert
                    onClose={() => { setErrorOpen(false) }}
                    severity="error"
                    variant="filled"
                >
                    { error.current }
                </Alert>
            </Snackbar>

            <Title>events</Title>
            <Typography variant="h1">events</Typography>
            <SkeletonContainer>
                <Stack direction="row">
                    <Stack justifyContent="center">
                        <MUIIconButton color="primary" disableRipple={false} onClick={() => {
                            addMonth(-1);
                        }}>
                            <ArrowLeftIcon />
                        </MUIIconButton>
                    </Stack>
                    {/* width is set to be ~ the maximum width that any month will take up */}
                    <Box width="26rem"><Typography variant="h2" textAlign="center" textTransform="lowercase">
                        {monthStartDay && getMonthYear(monthStartDay)}
                    </Typography></Box>
                    <Stack justifyContent="center">
                        <MUIIconButton color="primary" disableRipple={false} onClick={() => {
                            addMonth(1);
                        }}>
                            <ArrowRightIcon />
                        </MUIIconButton>
                    </Stack>
                </Stack>
            </SkeletonContainer>
            <Stack direction="row" gap={2}>
                <Calendar
                    data={eventsData}
                    eventsByStatus={eventsByStatus}
                    monthStartDay={monthStartDay}
                    setMonthStartDay={setMonthStartDay}
                />
                <Divider orientation="vertical" flexItem />
                <UpcomingEventsList
                    data={eventsData}
                    eventsByStatus={eventsByStatus}
                    todaysDate={todayDate}
                />
            </Stack>
        </Container>
    );
}
