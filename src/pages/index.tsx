import * as React from "react";

import Image from "next/image";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";

import wordmark from "~/assets/images/wordmark.png"
import logo from "~/assets/images/logo.png"
import uclove from "~/assets/images/uclove.png"

import { styled } from "@mui/material/styles";
import Title from "~/components/Title";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useInput } from "~/components/Input";
import { GamepadButtonPressedEvent, GamepadButtonReleasedEvent, XBoxButton } from "~/util/gamepad";

// client side, but use dynamic import
const Selection = dynamic(() => import("~/components/Selection").then(mod => mod.Selection), { ssr: false });

// const HomeLink = styled(Link)(({theme}) => ({
//     textAlign: "center",
//     textTransform: "lowercase",

//     color: theme.palette.text.primary,
//     textDecorationColor: theme.palette.primary.main,
//     "&:not(:last-child)": {
//         marginRight: theme.spacing(1),
//     }
// }))

type HomeButton = {
    href: string,
    label: string,
}

const HomeButtons: HomeButton[] = [
    {
        href: "/about-us",
        label: "about us"
    },
    {
        href: "/studios",
        label: "studios"
    },
    {
        href: "/events",
        label: "events"
    },
]

type HomeProps = {}

export default function Home({}: HomeProps){
    const input = useInput();

    const buttonRefs = Array.from<React.MutableRefObject<HTMLAnchorElement>>({length: 3}).map(_ => React.useRef<HTMLAnchorElement>());
    const [selectedButtonIndex, setSelectedButtonIndex] = React.useState(0);
    const selectPreviousButton = () => setSelectedButtonIndex(selectedButtonIndex === 0 ? selectedButtonIndex : (selectedButtonIndex - 1) % buttonRefs.length);
	const selectNextButton = () => setSelectedButtonIndex(selectedButtonIndex === buttonRefs.length - 1 ? selectedButtonIndex : (selectedButtonIndex + 1) % buttonRefs.length);

    React.useEffect(() => {
        if(input){
            hookInput();
            return unhookInput;
        }
    })

    function hookInput(){
        input.addEventListener("gamepadbuttonpressed", onButtonPressed);
        input.addEventListener("gamepadbuttonrepeat", onButtonPressed);
    }

    function unhookInput(){
        input.removeEventListener("gamepadbuttonpressed", onButtonPressed);
        input.removeEventListener("gamepadbuttonrepeat", onButtonPressed);
    }

    function onButtonPressed(e: GamepadButtonPressedEvent | GamepadButtonReleasedEvent) {
        if(e.button === XBoxButton.Right){
            selectNextButton();
        }
        else if(e.button === XBoxButton.Left){
            selectPreviousButton();
        }
        else if(e.button === XBoxButton.A){
            buttonRefs[selectedButtonIndex]?.current.click();
        }
    }

	return <>
        <Title/>
        <Box
            sx={(theme) => ({
                width: "100%",
                height: "100%",
                backgroundImage: `url(${uclove.src})`,

                display: "flex",
                alignItems: "center",

                p: theme.spacing(4),
            })}
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
                <Stack
                    direction="row"
                    justifyContent="space-evenly"
                    sx={{
                        "& > * + *": { marginLeft: 2 }
                    }} // & selects current, > * selects children, + * selects siblings
                >
                    {HomeButtons.map(({href, label}, i) => (
                        // <HomeLink key={label} href={href} variant="h2" ref={buttonRefs[i]}>
                        //     {label}
                        // </HomeLink>
                        <Button href={href} component={Link} ref={buttonRefs[i]} key={i}
                            disableRipple disableTouchRipple disableElevation disableFocusRipple
                            onMouseEnter={() => setSelectedButtonIndex(i)}
                        >
                            <Typography
                                variant="h2"
                                sx={{
                                    textTransform: "lowercase",
                                    mx: 1,
                                    my: 0.5,
                                }}
                            >{label}</Typography>
                        </Button>
                    ))}
                </Stack>
            </Container>
            <Selection
                selectionRef={buttonRefs[selectedButtonIndex]}
                useClientWidth useClientHeight
                transitionMaxWidth
            ></Selection>
        </Box>
    </>
}

// home uses custom layout
Home.getLayout = page => page;