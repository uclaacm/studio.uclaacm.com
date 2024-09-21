import { Backdrop, Box, Button, Link, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import IsaxIcon from "~/components/IsaxIcon";

type HomeNavigationEntryProps = {
    title: string,
    href: string,
    active?: boolean,
    onClick?: React.MouseEventHandler<HTMLAnchorElement>,
}

function HomeNavigationEntry(props: HomeNavigationEntryProps){
    const {
        title,
        href,
        active = false,
        onClick,
    } = props;

    const theme = useTheme();

    const opacity = active ? 1 : 0.4;
    const hoverOpacity = active ? 1 : 0.8;
    const color = active ? theme.palette.primary.main : "black";

    return <Link href={href} underline="none"
        sx={theme => ({
            minWidth: "12rem",
            opacity,
            color,
            ":hover": {
                opacity: hoverOpacity,
            },
            transition: theme.transitions.create(["color", "opacity"], {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.easeInOut,
            }),
        })}
        onClick={onClick}
    >
        <Stack direction="row" alignItems="center" gap={1}>
            <Box sx={{
                minWidth: "6px",
                minHeight: "6px",
                borderRadius: 99999,
                backgroundColor: color,
                transition: theme.transitions.create(["background-color"], {
                    duration: theme.transitions.duration.shortest,
                    easing: theme.transitions.easing.easeInOut,
                }),
            }}/>
            <Typography variant="subtitle2" lineHeight={1} mr={0.25}
            >
                {title}
            </Typography>
        </Stack>
    </Link>
}

export type HomeNavigationProps = {
    active: string,
};

const links: HomeNavigationEntryProps[] = [
    { title: "Game Showcase", href: "#game-showcase" },
    { title: "Logline", href: "#logline" },
    { title: "Mission", href: "#mission" },
    { title: "Workshops", href: "#workshops" },
    { title: "Game Jams", href: "#game-jams" },
    { title: "Socials", href: "#socials" },
    { title: "Speaker Series", href: "#speaker-events" },
    { title: "ENGR1GD", href: "#engr1" },
    { title: "Students Run Studios", href: "#srs" },
];


export default function HomeNavigation(props: HomeNavigationProps){
    const {
        active,
    } = props;
    
    const [open, setOpen] = React.useState(false);
    const canHover = useMediaQuery("(hover:hover)");

    return <>
        <Stack
            sx={theme => ({
                position: "absolute",
                left: theme.spacing(1),
                top: theme.spacing(canHover ? 1 : 6), bottom: theme.spacing(1),
                justifyContent: "center",
                alignItems: "center",
            })}
        >
            <Backdrop
                sx={theme => ({
                    zIndex: theme.zIndex.drawer - 2
                })}
                open={open} onClick={() => setOpen(false)}
            />
            <Stack
                sx={theme => ({
                    px: 0.5,
                    py: 0.25,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "8px",
                    maxWidth: open ? "12rem" : `calc(6px + ${theme.spacing(1)})`,
                    overflow: "clip",
                    ":hover": {
                        maxWidth: "12rem",
                        outlineColor: theme.palette.primary.main,
                    },
                    outline: "1px solid transparent",
                    transition: theme.transitions.create(["max-width", "outline-color"], {
                        duration: theme.transitions.duration.short,
                        easing: theme.transitions.easing.easeOut,
                    }),
                    zIndex: theme.zIndex.drawer - 1,
                })}
            >
                {links.map(p => <HomeNavigationEntry key={p.title} active={p.href === active} onClick={
                    canHover 
                        ? () => setOpen(false)
                        : (ev) => {
                            if(open){
                                setOpen(false);
                            }
                            else{
                                setOpen(true);
                                ev.preventDefault();
                            }
                        }
                } {...p}/>)}
            </Stack>
        </Stack>
    </>
}
