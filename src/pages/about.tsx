import * as React from "react";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MUIContainer from "@mui/material/Container";
import Container from "~/components/Container";
import Title from "~/components/Title";

import BackgroundImage from "~/assets/images/backgrounds/ps5.svg"

import Logo from "~/assets/images/logo.png"

import { useTheme } from "@mui/material";
import { dbConnection } from "~/db/connection";
import { GetServerSideProps } from "next";
import Markdown from "~/components/Markdown";
import { TinaMarkdownContent } from "tinacms/dist/rich-text";
import { getIconFromType } from "~/util/getIconFromType";
import Link from "~/components/Link";
import IconButton from "~/components/IconButton";

type AboutProps = {
    officers: Array<{
        name: string,
        imageSrc: string,
        description: string,
        links: Array<{ type: string, href: string }>
    }>,
    blurb?: TinaMarkdownContent,
};

export const getServerSideProps: GetServerSideProps<AboutProps> = async () => {
    const { data: officersData } = await dbConnection.queries.officersConnection();
    const { data: blurbData } = await dbConnection.queries.content({ relativePath: "about.md" });
    return {
        props: {
            officers: officersData.officersConnection.edges.map(({ node: { name, image, image_url, description, links } }) => ({
                name,
                imageSrc: image && image.length > 0 ? image : image_url,
                description,
                links: links ?? []
            })),
            blurb: blurbData?.content.body ?? null
        }
    }
}
export default function About({ officers, blurb }: AboutProps) {
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
                    <Markdown content={blurb}/>
                </Box>
                <img src={Logo.src} alt="acm.studio Logo" />
            </Box>
            <Box>
                <Typography variant="h2" color="primary.main" mb={4}>Officers</Typography>
                <Stack spacing={2}>
                    {
                        officers.map(({ name, imageSrc, description, links }) => (
                            <Box display="grid" gridTemplateColumns="1fr 2fr" gridTemplateRows="1fr" gap={2} key={name}>
                                <Box>
                                    <img
                                        src={imageSrc}
                                        style={{
                                            aspectRatio: 1,
                                            objectFit: "cover",
                                            maxWidth: "100%"
                                        }}
                                    ></img>
                                </Box>
                                <Stack spacing={2}>
                                    <Box flexGrow={0}>
                                        <Typography variant="h3">{name}</Typography>
                                        <Typography variant="body1">
                                            {description}
                                        </Typography>
                                    </Box>
                                    <Stack direction="row" spacing={1}>
                                        {links.map(({ type, href }, i) => {
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
                                        })}
                                    </Stack>
                                </Stack>
                            </Box>
                        ))
                    }
                </Stack>
            </Box>
        </Container>
    );
}
