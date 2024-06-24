import * as React from "react";

import content from "~/__generated__/content";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MUIContainer from "@mui/material/Container";
import Container from "~/components/Container";
import Title from "~/components/Title";

import BackgroundImage from "~/assets/images/backgrounds/ps5.svg"

import Logo from "~/assets/images/logo.png"

import { Chip, useTheme } from "@mui/material";
import { getIconFromType } from "~/util/getIconFromType";
import Link from "~/components/Link";
import IconButton from "~/components/IconButton";
import { GetStaticPropsResult, GetStaticPropsContext, GetServerSidePropsContext, GetServerSidePropsResult } from "next";

import { objectGroupBy } from "~/util/polyfills";
import { getOfficers, getOfficerSocialLinks, NotionOfficerSchema, NotionSocialLinksSchema } from "~/api/notion/schema";

type OfficerWithSocialLinks = NotionOfficerSchema & {
    links?: NotionSocialLinksSchema[]
};

export async function getServerSideProps(ctx: GetServerSidePropsContext): Promise<GetServerSidePropsResult<AboutProps>> {
    const socialLinks = await getOfficerSocialLinks();
    const officers = (await getOfficers()).map((officer): OfficerWithSocialLinks => ({
        ...officer,
        links: socialLinks.filter(v => v.officer === officer.id)
    }));

    const { current, alumni } = objectGroupBy(officers, ({ boardStatus }) => (
        boardStatus === "Alumni" ? "alumni" :
        boardStatus === "Current" ? "current" :
        undefined
    ));

    const { presidents, chairs, other } = objectGroupBy(current, ({ category }) => (
        category === "President" ? "presidents" :
        category === "Chair" ? "chairs" :
        "other"
    ));

    current.sort((a, b) => a.category === "President" ? -1 : 1);

    return {
        props: {
            officers: {
                alumni,
                current: {
                    presidents, chairs, other
                },
            }
        }
    }
}

type OfficerProps = {
    officer: OfficerWithSocialLinks
}

function Officer({ officer }: OfficerProps) {
    const { name, selfIntro, image, links } = officer;
    return <Box display="grid" gridTemplateColumns="1fr 2fr" gridTemplateRows="1fr" gap={2}>
        <Box>
            <img
                src={image}
                style={{
                    aspectRatio: 1,
                    objectFit: "cover",
                    maxWidth: "100%"
                }}
            ></img>
        </Box>
        <Stack spacing={2}>
            <Stack flexGrow={0} gap={1}>
                <Typography variant="h3">{officer.name}</Typography>
                {officer.title && <Box><Chip color="primary" variant="filled" label={officer.title} /></Box>}
                <Stack direction="row" gap={1} flexWrap="wrap" mb={1}>
                    {officer.roles?.map(role => (
                        <Chip key={role} size="small" variant="outlined" label={role}/>
                    ))}
                </Stack>
                <Typography variant="body1">{officer.selfIntro}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
                {links?.map(({ social, url }, i) => {
                    const icon = getIconFromType(social);
                    if(icon === null){
                        return <Button variant="outlined" component={Link} href={url} target="_blank" key={i}>
                            {social}
                        </Button>
                    }
                    else{
                        return <IconButton component={Link} href={url} target="_blank" key={i}>
                            {icon}
                        </IconButton>
                    }
                })}
            </Stack>
        </Stack>
    </Box>
}

type AboutProps = {
    officers: {
        current: {
            presidents: OfficerWithSocialLinks[],
            chairs: OfficerWithSocialLinks[],
            other: OfficerWithSocialLinks[],
        },
        alumni: OfficerWithSocialLinks[],
    }
}

export default function About({ officers }: AboutProps) {
    const theme = useTheme();

    return (
        <Container
            background={
                <MUIContainer maxWidth="lg" sx={{
                    width: "100%", height: "100%",
                    display: "grid", gridTemplate: "1fr / 4fr 8fr",
                }}>
                    <img alt="" src={BackgroundImage.src} style={{ gridColumnStart: 2, width: "100%" }}></img>
                </MUIContainer>
            }
        >
            <Title>About Us</Title>
            <Typography mb={4} variant="h1" sx={{ lineHeight: 1 }}><i className="isax isax-info-circle5" style={{ color: theme.palette.primary.main }}></i> About acm.studio</Typography>
            <Box mb={4} display="grid" gridTemplateColumns="2fr 1fr" gap={2}>
                <Box>
                Our mission is to teach skills revolving around
                video game development such as computer science,
                game design and art in order to help usher
                students into the game development industry.
                </Box>
                <img src={Logo.src} alt="acm.studio Logo" />
            </Box>
            <Box>
                <Typography variant="h2" color="primary.main" mb={4}>meet the board</Typography>
                <Stack spacing={2}>
                    {
                        [
                            ...officers.current.presidents,
                            ...officers.current.chairs,
                            ...officers.current.other,
                        ].map(officer => <Officer key={officer.name} officer={officer}/>)
                    }
                </Stack>
                <Typography variant="h2" color="primary.main" mb={4}>meet the alumni</Typography>
                <Stack spacing={2}>
                    {
                        officers.alumni.map(officer => <Officer key={officer.name} officer={officer}/>)
                    }
                </Stack>
            </Box>
        </Container>
    );
}
