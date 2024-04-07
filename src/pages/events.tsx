import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "~/components/Container";
import { Skeleton, useTheme } from "@mui/material";

type EventProps = {};

const GCLOUD_API_KEY = process.env.NEXT_PUBLIC_GCLOUD_API_KEY;
const CALENDAR_ID = "c_729vu5u1obkg7nu762sh687bp8@group.calendar.google.com";
const EVENTS_ENDPOINT = `https://www.googleapis.com/calendar/v3/calendars/${CALENDAR_ID}/events?key=${GCLOUD_API_KEY}`;

function getFirstSundayBeforeMonth(dayInMonth: Date){
    const date = new Date(dayInMonth);
    date.setDate(1); // go to first day of month
    const day = date.getDay();
    date.setDate(date.getDate() - day);
    return date;
}

function getDayName(day: number){
    const date = new Date();
    date.setDate(date.getDate() - date.getDay() + day);
    return date.toLocaleString("default", {
        weekday: "short"
    });
}

function normalizeDate(date: Date){
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

type CalendarHeaderProps = {
    weekday: string,
}

function CalendarHeader({ weekday }: CalendarHeaderProps){
    return <Typography variant="h3" align="center">{ weekday }</Typography>
}

type CalendarCellProps = {
    date?: Date,
    selecting: React.MutableRefObject<boolean>,
    selection: [Date, Date] | null,
    setSelection: React.Dispatch<React.SetStateAction<[Date, Date] | null>>,
}

function CalendarCell(props: CalendarCellProps){
    const {
        date,
        selecting,
        selection, setSelection
    } = props;

    const theme = useTheme();

    // selection ordered so that the first element is less than the second
    const orderedSelection = React.useMemo(() => {
        if(selection){
            const [a, b] = selection;
            return a.getTime() <= b.getTime() ? [a, b] : [b, a]
        }
        return null;
    }, [selection])

    // "type" of selection of the current date
    // the date is either unselected "none"
    // at the end of the selection "end"
    // at the beginning of the selection "begin"
    // in the middle of the selection "middle"
    // or the entire selection "selected"
    const dateSelection = React.useMemo(() => {
        if(!selection) return "none";
        // we have to use getTime here because
        // date1 === date2 doesn't work for some reason
        const minEqual = date.getTime() === orderedSelection[0].getTime();
        const maxEqual = date.getTime() === orderedSelection[1].getTime();
        const minGreater = date.getTime() > orderedSelection[0].getTime();
        const maxLess = date.getTime() < orderedSelection[1].getTime();

        return (
            minEqual && maxEqual ? "selected"
            : minEqual ? "begin"
            : maxEqual ? "end"
            : minGreater && maxLess ? "middle"
            : "none"
        );
    }, [date, orderedSelection])

    const [
        leftBorder,
        rightBorder,
        yBorder,
    ] = React.useMemo(() => [
        dateSelection === "begin" || dateSelection === "selected",
        dateSelection === "end" || dateSelection === "selected",
        dateSelection !== "none"
    ], [dateSelection])

    const borderRadius = theme.spacing(0.5);
    const borderColor = theme.palette.primary.main;
    const borderWidth = theme.spacing(0.5);

    const SkeletonContainer = date ? React.Fragment : Skeleton;
    return <Box
        sx={{
            minHeight: "8rem",
            cursor: "pointer",
        }}
        onMouseDown={() => {
            selecting.current = true;
            setSelection([date, date]);
            console.log(selection);
        }}
        onMouseUp={() => {
            selecting.current = false;
        }}
        onMouseOver={() => {
            if(selecting.current){
                setSelection(([s]) => [s, date])
            }
        }}
    >
        <Box sx={{
            display: "flex",
            justifyContent: "center",
        }}>
            <Box sx={{
                flexGrow: 1,
                backgroundColor: borderColor,
                ...dateSelection === "end" || dateSelection === "middle" ? {
                    paddingY: borderWidth
                } : {}
            }}>
                <Box sx={{
                    width: "100%", height: "100%",
                    backgroundColor: "white",
                }}/>
            </Box>
            <SkeletonContainer>
                <Box sx={{
                    backgroundColor: borderColor,
                    borderTopLeftRadius: leftBorder ? "1em" : 0,
                    borderBottomLeftRadius: leftBorder ? "1em" : 0,

                    borderTopRightRadius: rightBorder ? "1em" : 0,
                    borderBottomRightRadius: rightBorder ? "1em" : 0,

                    paddingY: yBorder ? borderWidth : 0,
                    marginY: yBorder ? 0 : borderWidth,

                    paddingLeft: leftBorder ? borderWidth : 0,
                    paddingRight: rightBorder ? borderWidth : 0,
                }}>
                    <Typography variant="h3" sx={theme => ({
                        userSelect: "none",

                        paddingRight: `calc(0.5em + ${rightBorder ? "0px" : borderWidth})`,
                        paddingLeft: `calc(0.5em + ${leftBorder ? "0px" : borderWidth})`,
                        backgroundColor: "white",

                        borderTopLeftRadius: leftBorder ? "1em" : 0,
                        borderBottomLeftRadius: leftBorder ? "1em" : 0,

                        borderTopRightRadius: rightBorder ? "1em" : 0,
                        borderBottomRightRadius: rightBorder ? "1em" : 0,
                    })}>
                        { date.getDate() }
                    </Typography>
                </Box>
            </SkeletonContainer>
            <Box sx={{
                flexGrow: 1,
                backgroundColor: borderColor,
                ...dateSelection === "begin" || dateSelection === "middle" ? {
                    paddingY: borderWidth
                } : {}
            }}>
                <Box sx={{
                    width: "100%", height: "100%",
                    backgroundColor: "white",
                }}/>
            </Box>
        </Box>
    </Box>
}

function Calendar(){
    const [monthStartDay, setMonthStartDay] = React.useState<Date | null>(null)
    const selecting = React.useRef<boolean>(false);
    const [selection, setSelection] = React.useState<[Date, Date] | null>(null);

    React.useEffect(() => {
        setMonthStartDay(getFirstSundayBeforeMonth(new Date));
    }, []);

    return <Box>
        <Box sx={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
        }}>
            { Array.from({ length: 7 }).map((_, i) => (
                <CalendarHeader weekday={getDayName(i)}/>
            ))}
        </Box>
        <Box sx={{
            width: "100%", height: "100%",
            display: "grid",
            gridTemplate: "repeat(5, 1fr) / repeat(7, 1fr)",
        }}>
            {
                Array.from({ length: 35 }).map((_, i) => {
                    const cellDate = new Date(monthStartDay);
                    cellDate.setDate(cellDate.getDate() + i);
                    return (
                        <CalendarCell
                            key={i}
                            date={normalizeDate(cellDate)}
                            selecting={selecting}
                            selection={selection} setSelection={setSelection}
                        />
                    );
                })
            }
        </Box>
    </Box>
}

export default function Events({}: EventProps) {
    const [eventsData, setEventsData] = React.useState<gapi.client.calendar.Events | null>(null);

    // fetch Google API endpoint
    React.useEffect(() => {
        fetch(EVENTS_ENDPOINT, {
            method: "get",
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        })
            .then(v => v.json())
            .then(json => setEventsData(json as gapi.client.calendar.Events))
    }, [])

    return (
        <Container>
            <Typography variant="h1">Our events!</Typography>
            <Calendar/>
        </Container>
    );
}
