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

import { useTheme } from "@mui/material";
import { getIconFromType } from "~/util/getIconFromType";
import Link from "~/components/Link";
import IconButton from "~/components/IconButton";
import { OfficerSchema } from "~/Schema";
 
 

export default function About() {
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
                        content.officers.map((officer) => {
                            const {
                                name,
                                image_url: imageSrc,
                                links
                            } = officer.default.frontmatter as OfficerSchema;
                            return <Box display="grid" gridTemplateColumns="1fr 2fr" gridTemplateRows="1fr" gap={2} key={name}>
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
                                        <officer.default.default/>
                                    </Box>
                                    <Stack direction="row" spacing={1}>
                                        {links?.map(({ type, href }, i) => {
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
                        })
                    }
                </Stack>
            </Box>
        </Container>
    );
}
