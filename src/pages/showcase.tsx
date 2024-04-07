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
import Title from "~/components/Title";
import content from "~/__generated__/content";
import { ShowcaseSchema } from "~/Schema";
import { MDXFile } from "~/content/contentProvider";
import { mapGroupBy, objectGroupBy, toSorted } from "~/util/polyfills";
// question: how do I use both imagelistitem AND accordion in an imagelist set to masonry? questions questions

type ShowcaseItemProps = {
    item: MDXFile<ShowcaseSchema>
}

function ShowcaseItem({ item }: ShowcaseItemProps) {
    let { title, subtitle, img, url, description } = item.default.frontmatter;
    let external = !!url;
    url ??= `showcase/${item.filename}`

    const theme = useTheme();
    return (
        <Paper
            {
                ...url ? {
                    component: NextLink,
                    href: url,
                    target: external ? "_blank" : "_self",
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

                textDecoration: "none",
            })}
        >
            {
                img?.src && (
                    <img
                        src={`${img.src}`}
                        alt={img.alt}
                        loading="lazy"
                        style={{
                            borderRadius: theme.shape.borderRadius * 4,
                            objectFit: "cover",
                            width: "100%",
                            height: "100%",
                            gridArea: "a",
                        }}
                    />
                )
            }
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

// need a lower zindex
export default function Showcase() {
    const showcase = content.showcase as MDXFile<ShowcaseSchema>[]

    // return the maximum Date.parse value (ie. the newer entry) for the dates on the MDXfiles
    const newestEntryTime = (files: MDXFile<ShowcaseSchema>[]) => (
        Math.max(...files.map(v => Date.parse(v.default.frontmatter.date)).filter(n => !isNaN(n)))
    );

    const categories = Object.entries(
        objectGroupBy(showcase, (file) => file.default.frontmatter.category ?? "Other")
    );

    const years = toSorted(
        Array.from(
            mapGroupBy(categories, ([category, items]) => {
                const time = newestEntryTime(items);
                return isNaN(time) ? NaN : new Date(time).getFullYear();
            }).entries()
        ), ([yearA], [yearB]) => (
            yearA < yearB
                ? 1
                : -1
        ))

    console.log(JSON.stringify(years))

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
            {years.map(([year, categories]) => (
                <React.Fragment key={year}>
                    <Typography variant="h2">{year}</Typography>
                    {categories.map(([category, items]) => (
                        <React.Fragment key={category}>
                            <Typography variant="h3">{category}</Typography>
                            <Masonry columns={3} spacing={2}>
                                { items.map(item => (
                                    <ShowcaseItem item={item} key={item.default.frontmatter.title} />
                                )) }
                            </Masonry>
                        </React.Fragment>
                    ))}
                </React.Fragment>
            ))}
            {Object.keys(years).length === 0 && <Typography variant="body1">No content {`(\u25CF\u00B4\u2313\`\u25CF)`}</Typography>}
        </Container>
    );
}