import * as React from "react";

import NextLink from "next/link";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { ImageList, ImageListItem, useTheme } from '@mui/material'; // for masonry
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import MUIContainer from "@mui/material/Container"

import BackgroundImage from "~/assets/images/backgrounds/gamecube.svg"

import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles'; // for styling
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // expand icon
import Paper from '@mui/material/Paper'; // paper
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material"; // maybe use accordions for each image? unfold when clicked for details
import Container from "~/components/Container";
import Link from "~/components/Link";
import Title from "~/components/Title";
import { GetServerSideProps } from "next";
import client from "cms/client";
import path from "path";
import { useRouter } from "next/router";
// question: how do I use both imagelistitem AND accordion in an imagelist set to masonry? questions questions

export const getServerSideProps: GetServerSideProps<ShowcaseProps> = async () => {
    const { data } = await client.queries.showcaseConnection()
    const items: ShowcaseItem[] = data
        .showcaseConnection
        .edges
        ?.map(
            ({ node: { _sys, title, subtitle, description, alt, image, image_url } }) => {
                const { dir, name } = path.parse(_sys.relativePath);
                return {
                    title,
                    subtitle,
                    description,
                    alt,
                    src: image || image_url,
                    href: `/showcase/${path.join(dir, name)}`
                }
            }
        )
        ?? [];

    return {
        props: {
            items
        }
    }
}

type ShowcaseItem = {
    src: string,
    alt: string,
    title: string,
    subtitle: string,
    description?: string,
    href?: string,
}

const itemData: ShowcaseItem[] = [
    {
        src: "https://images.unsplash.com/photo-1623743993875-03d6a5c7c709?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=315&h=450&q=80",
        alt: "Crash Bandicoot",
        title: "Crash Bandicoot",
        subtitle: "Crash Bandicoot",
        description: "This is crash bandicoot lol.",
        href: "/showcase/hello"
    },
    {
        src: "https://images.unsplash.com/photo-1586182987320-4f376d39d787?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=315&h=654&q=80",
        alt: "Controller",
        title: "Controller",
        description: "This is a cpntrller.",
        subtitle: "Controller"
    },
    {
        src: "https://images.unsplash.com/photo-1591976711776-4a91184e0bf7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=315&h=450&q=80",
        alt: "Controller 2",
        title: "Controller 2",
        subtitle: "Controller 2"
    },
    {
        src: "https://images.unsplash.com/photo-1580617971627-cffa74e39d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=315&h=450&q=80",
        alt: "Gamer lounge",
        title: "Gamer lounge",
        subtitle: "Gamer lounge"
    },
    {
        src: "https://images.unsplash.com/photo-1543328011-1c0d628fae09?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=315&h=450&q=80",
        alt: "PS4",
        title: "PS4",
        subtitle: "PS4"
    },
    {
        src: "https://images.unsplash.com/photo-1580617971627-cffa74e39d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=315&h=450&q=80",
        alt: "Gamer lounge",
        title: "Gamer lounge",
        subtitle: "Gamer lounge"
    },
]

type ShowcaseItemProps = {
    item: ShowcaseItem
}

function ShowcaseItem({ item }: ShowcaseItemProps) {
    const { title, subtitle, src, alt, href: url, description } = item;

    const theme = useTheme();
    return (
        <Paper
            {
                ...url ? {
                    component: NextLink,
                    href: url
                } : {}
            }
            sx={theme => ({
                borderRadius: 4,
                display: "grid", zIndex: 1,
                gridTemplateAreas: `"a"`,

                transition: theme.transitions.create(["box-shadow", "transform"], {
                    duration: theme.transitions.duration.standard,
                    easing: theme.transitions.easing.easeOut,
                }),
                "--hover": 0,
                boxShadow: 2,
                "&:hover": {
                    boxShadow: 4,
                    // transform: "scale(1.005)",
                    ...description
                        ? {
                            "& .label": {
                                flexGrow: 1,
                                "& .body": {
                                    transform: "translateY(0)",
                                    opacity: 1,
                                }
                            }
                        } : {}
                },
            })}
        >

            <img
                src={`${src}`}
                alt={alt}
                loading="lazy"
                style={{
                    borderRadius: theme.shape.borderRadius * 4,
                    objectFit: "cover",
                    width: "100%",
                    height: "100%",
                    gridArea: "a",
                }}
            />
            <Box
                sx={theme => ({
                    gridArea: "a",

                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end"
                })}
            >
                <Box className="label" sx={{
                    transition: theme.transitions.create(["flex-grow"], {
                        duration: theme.transitions.duration.short,
                        easing: theme.transitions.easing.easeOut,
                    }),
                    p: 2,
                    pt: 4,
                    borderBottomLeftRadius: theme.shape.borderRadius * 4,
                    borderBottomRightRadius: theme.shape.borderRadius * 4,
                    backgroundImage: `linear-gradient(0deg, #00000080, #00000080 40%, #00000000)`,
                    overflowY: "clip"
                }}>
                    <Typography variant="h3" color="white">
                        {title}
                    </Typography>
                    <Typography variant="h4" color="white">
                        {subtitle}
                    </Typography>
                    { description && <Typography className="body" variant="body1" color="white" sx={theme => ({
                        maxHeight: 0,
                        opacity: 0,
                        transform: "translateY(40px)",
                        transition: theme.transitions.create(["transform", "opacity"], {
                            duration: theme.transitions.duration.short,
                            easing: theme.transitions.easing.easeOut,
                            delay: theme.transitions.duration.short / 2
                        })
                    })}>
                        {description}
                    </Typography>}
                </Box>
            </Box>
        </Paper>
    )
}

type ShowcaseProps = {
    items: ShowcaseItem[]
};

// need a lower zindex
export default function Showcase({ items }: ShowcaseProps) {
    const theme = useTheme();
    return (
        <Container
            background={<MUIContainer maxWidth="lg" sx={{
                width: "100%", height: "100%",
                display: "grid", gridTemplate: "1fr / 4fr 8fr",
            }}>
                <img alt="" src={BackgroundImage.src} style={{ gridColumnStart: 2, width: "100%" }}></img>
            </MUIContainer>}
        >
            <Title>Showcase</Title>
            <Typography variant="h1">Showcase</Typography>
            <Typography variant="h2">2023</Typography>
            {items.length > 0 && <Masonry columns={3} spacing={2}>
                {items.map((item, i) => (
                    <ShowcaseItem item={item} key={i} />
                ))}
            </Masonry>}
            {items.length === 0 && <Typography variant="body1">No content {`(\u25CF\u00B4\u2313\`\u25CF)`}</Typography>}
        </Container>
    );
}