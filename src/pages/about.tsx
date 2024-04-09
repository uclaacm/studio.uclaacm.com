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
import { GetStaticPropsResult, GetStaticPropsContext } from "next";

import notion, { getDatabaseProperties, getOfficers, getPagesInDatabase, NotionOfficerSchema } from "~/api/notion";
import { PageObjectResponse, PartialPageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export async function getStaticProps(ctx: GetStaticPropsContext): Promise<GetStaticPropsResult<AboutProps>> {
    const officers = await getOfficers();

    return {
        props: {
            officers
        }
    }
}

type OfficerProps = {
    officer: NotionOfficerSchema
}

function Officer({ officer }: OfficerProps) {
    const { name, selfIntro } = officer;
    return <Box display="grid" gridTemplateColumns="1fr 2fr" gridTemplateRows="1fr" gap={2}>
        <Box>
            {/* <img
                src={imageSrc}
                style={{
                    aspectRatio: 1,
                    objectFit: "cover",
                    maxWidth: "100%"
                }}
            ></img> */}
        </Box>
        <Stack spacing={2}>
            <Stack flexGrow={0} gap={1}>
                <Typography variant="h3">{officer.name}</Typography>
                <Stack direction="row" gap={1} flexWrap="wrap" mb={1}>
                    {officer.roles?.map(role => (
                        <Chip size="small" variant="outlined" label={role}/>
                    ))}
                </Stack>
                <Typography variant="body1">{officer.selfIntro}</Typography>
            </Stack>
            <Stack direction="row" spacing={1}>
                {/* {links?.map(({ type, href }, i) => {
                    const icon = getIconFromType(type);
                    if(icon === null){
                        return <Button variant="outlined" component={Link} href={href} target="_blank" key={i}>
                            {type}
                        </Button>
                    }
                    else{
                        return <IconButton component={Link} href={href} target="_blank" key={i}>
                            {icon}
                        </IconButton>
                    }
                })} */}
            </Stack>
        </Stack>
    </Box>
}

type AboutProps = {
    officers: NotionOfficerSchema[]
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
                    Hello
                </Box>
                <img src={Logo.src} alt="acm.studio Logo" />
            </Box>
            <Box>
                <Typography variant="h2" color="primary.main" mb={4}>Officers</Typography>
                <Stack spacing={2}>
                    {
                        officers.map(officer => <Officer key={officer.name} officer={officer}/>)
                    }
                </Stack>
            </Box>
        </Container>
    );
}
