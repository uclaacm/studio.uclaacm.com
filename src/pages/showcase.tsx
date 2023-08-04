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
    const items: [number, ShowcaseItem][] = data
        .showcaseConnection
        .edges
        ?.map(
            ({ node: { _sys, title, year, subtitle, description, alt, image, image_url } }) => {
                const { dir, name } = path.parse(_sys.relativePath);
                return [
                    new Date(year).getFullYear(),
                    {
                        title,
                        subtitle,
                        description,
                        alt,
                        src: image || image_url,
                        href: `/showcase/${path.join(dir, name)}`
                    }
                ]
            }
        )
        ?? [];

    const years = Object.entries(items.reduce<{ [k: number]: ShowcaseItem[] }>((years, [year, item]) => ({
        ...years,
        [year]: [...(years[year] ?? []), item]
    }), {})).map(([year, items]) => ({
        year: parseInt(year), items
    }));

    years.sort(({year: yearA}, {year: yearB}) => (yearA < yearB ? 1 : -1));

    return {
        props: {
            years
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

type ShowcaseYear = {
    year: number,
    items: ShowcaseItem[],
}

type ShowcaseProps = {
    years: ShowcaseYear[]
};

// need a lower zindex
export default function Showcase({ years }: ShowcaseProps) {
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
            {
                years.map(({ year, items }, i) => (
                    <React.Fragment key={i}>
                        <Typography variant="h2">{year}</Typography>
                        <Masonry columns={3} spacing={2}>
                            { items.map((item, j) => <ShowcaseItem item={item} key={j} />) }
                        </Masonry>
                    </React.Fragment>
                ))
            }
            {years.length === 0 && <Typography variant="body1">No content {`(\u25CF\u00B4\u2313\`\u25CF)`}</Typography>}
        </Container>
    );
}