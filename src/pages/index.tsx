import * as React from "react";

import Image from "next/image";
import Link from "next/link";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import wordmark from "~/assets/images/wordmark.png"
import logo from "~/assets/images/logo.png"
import uclove from "~/assets/images/uclove.png"

type HomeProps = {}

export default function Home({}: HomeProps){
	return (
        <Box
            sx={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                backgroundColor: "blue",
                backgroundImage: `url(${uclove.src})`,
                alignItems: "start",
            }}
        >
            <Box
                sx={(theme) => ({
                    width: "50vw",
                    backgroundColor: theme.palette.background.default,
                    mt: "15vh",
                    p: theme.spacing(8),
                    boxShadow: 3,
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
                    <Link href="/about-us" className="homeLink">
                        <Typography
                            variant="h3"
                            textAlign="center"
                            textTransform="lowercase"
                            sx={{
                                flex: 1,
                                cursor: "pointer",
                            }}
                            color="textPrimary"
                        >
                            About Us
                        </Typography>
                    </Link>
                    <Link href="/studios" className="homeLink">
                        <Typography
                            variant="h3"
                            textAlign="center"
                            textTransform="lowercase"
                            sx={{ flex: 1, cursor: "pointer" }}
                            color="textPrimary"
                        >
                            Studios
                        </Typography>
                    </Link>
                    <Link href="/events" className="homeLink">
                        <Typography
                            variant="h3"
                            textAlign="center"
                            textTransform="lowercase"
                            sx={{ flex: 1, cursor: "pointer" }}
                            color="textPrimary"
                        >
                            Events
                        </Typography>
                    </Link>
                </Box>
            </Box>
        </Box>
    );
}