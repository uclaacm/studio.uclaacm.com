import * as React from "react";

import Image from "next/image";
import Link from "~/components/Link";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import wordmark from "~/assets/images/wordmark.png"
import logo from "~/assets/images/logo.png"
import uclove from "~/assets/images/uclove.png"

import { styled } from "@mui/material/styles";

type HomeProps = {}

const HomeLink = styled(Link)(({theme}) => ({
    color: "#FB4469",
    textAlign: "center",
    textTransform: "lowercase"
}))

export default function Home({}: HomeProps){
	return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${uclove.src})`,

                display: "flex",
                alignItems: "center",
            }}
        >
            <Container
                maxWidth="md"
                sx={(theme) => ({
                    backgroundColor: theme.palette.background.default,
                    p: theme.spacing(8),
                    mb: theme.spacing(16),
                    boxShadow: theme.shadows[4],
                    opacity: 0.9,
                })}
            >
                <Box
                    sx={(theme) => ({
                        display: "flex",
                        alignItems: "start",
                        mt: theme.spacing(2),
                        mb: theme.spacing(8),
                    })}
                >
                    <Image
                        src={logo}
                        alt="Studio Logo"
                        style={{
                            flexGrow: 0,
                            objectFit: "contain",
                            maxWidth: "100%",
                            minWidth: 0,
                            minHeight: 0,
                            height: "unset",
                        }}
                    ></Image>
                    <Image
                        src={wordmark}
                        alt="Studio Wordmark"
                        style={{
                            maxWidth: "100%",
                            objectFit: "contain",
                            minWidth: 0,
                            minHeight: 0,
                            height: "unset",
                        }}
                    ></Image>
                </Box>
                <Box
                    display="flex"
                    justifyContent="center"
                    sx={{ "& > * + *": { marginLeft: "2rem" } }} // & selects current, > * selects children, + * selects siblings
                >
                    <HomeLink href="/about-us">
                        <Typography
                            variant="h3"
                            color="text.primary"
                        >
                            About Us
                        </Typography>
                    </HomeLink>
                    <HomeLink href="/studios">
                        <Typography
                            variant="h3"
                            color="text.primary"
                        >
                            Studios
                        </Typography>
                    </HomeLink>
                    <HomeLink href="/events">
                        <Typography
                            variant="h3"
                            color="text.primary"
                        >
                            Events
                        </Typography>
                    </HomeLink>
                </Box>
            </Container>
        </Box>
    );
}

// home uses custom layout
Home.getLayout = page => page;