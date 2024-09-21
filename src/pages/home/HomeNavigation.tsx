import { Backdrop, Box, Button, Link, Stack, Typography } from "@mui/material";
import React from "react";

type HomeNavigationEntryProps = {
    title: string,
    href: string,
    active?: boolean,
}

function HomeNavigationEntry(props: HomeNavigationEntryProps){
    const {
        title,
        href,
        active = false,
    } = props;

    const opacity = active ? 1 : 0.4;
    const hoverOpacity = active ? 1 : 0.8;

    return <Link href={href} underline="none" color="inherit"
        sx={theme => ({
            minWidth: "12rem",
            opacity,
            ":hover": {
                opacity: hoverOpacity,
            },
            transition: theme.transitions.create(["opacity"], {
                duration: theme.transitions.duration.shortest,
                easing: theme.transitions.easing.easeInOut,
            }),
        })}
    >
        <Stack direction="row" alignItems="center" gap={1}>
            <Box sx={{
                minWidth: "6px", minHeight: "6px",
                borderRadius: 99999,
                backgroundColor: "black",
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
    const [navigationHover, setNavigationHover] = React.useState(false);

    return <>
        <Stack
            sx={theme => ({
                position: "absolute",
                left: theme.spacing(1),
                top: 0, bottom: 0,
                justifyContent: "center",
            })}
        >
            <Stack
                onMouseEnter={() => {setNavigationHover(true)}}
                onMouseLeave={() => {setNavigationHover(false)}}
                sx={theme => ({
                    px: 0.5,
                    py: 0.25,
                    backgroundColor: theme.palette.background.paper,
                    borderRadius: "8px",
                    maxWidth: `calc(6px + ${theme.spacing(1)})`,
                    overflow: "clip",
                    ":hover": {
                        maxWidth: "12rem",
                        outlineColor: "rgba(0,0,0,0.4)",
                    },
                    outline: "1px solid transparent",
                    transition: theme.transitions.create(["max-width", "outline-color"], {
                        duration: theme.transitions.duration.short,
                        easing: theme.transitions.easing.easeOut,
                    }),
                    zIndex: theme.zIndex.drawer - 1,
                })}
            >
                {links.map(p => <HomeNavigationEntry key={p.title} active={p.href === active} {...p}/>)}
            </Stack>
        </Stack>
    </>
}
