import * as React from "react";

import Image from "next/image";

import Box from "@mui/material/Box";

import { styled } from "@mui/material/styles";
import Title from "~/components/Title";

import dynamic from "next/dynamic";
import { useOnResize } from "~/util/useOnResize";
import { drawRainbow } from "~/util/canvas/rainbow";
import IconButton, { MotionIconButton } from "~/components/IconButton";
import { Close, KeyboardArrowDown, QuestionMark } from "@mui/icons-material";
import { AnimatePresence, motion, useAnimationFrame, Variants } from "framer-motion";
import { Button, Modal, Paper, Stack, Typography } from "@mui/material";
import { useTheme } from "@mui/material";

// client side, but use dynamic import
const Selection = dynamic(() => import("~/components/Selection").then(mod => mod.Selection), { ssr: false });

type HomeButton = {
    href: string,
    label: string,
}

const HomeButtons: HomeButton[] = [
    {
        href: "/about",
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

type HomeSectionProps = {
    children?: React.ReactNode,
}

type HomeGameProps = {
    scrollContainerRef: React.MutableRefObject<HTMLElement>,
}

function HomeGame({ scrollContainerRef }: HomeGameProps){
    const theme = useTheme();

    const canvasContainerRef = React.useRef<HTMLDivElement>();
    const canvasRef = React.useRef<HTMLCanvasElement>();
    const ctxRef = React.useRef<CanvasRenderingContext2D>();

    const [modalOpen, setModalOpen] = React.useState(false);

    React.useEffect(() => {
        ctxRef.current = canvasRef.current?.getContext("2d");
    }, [canvasRef])

    function render(){
        const canvas = canvasRef.current;
        const ctx = ctxRef.current;
        if(!canvas || !ctx) return;

        drawRainbow(canvas, ctx);
    }

    useOnResize(canvasContainerRef, (size) => {
        if(!canvasRef.current) return;
        canvasRef.current.width = size.inlineSize;
        canvasRef.current.height = size.blockSize;
        render();
    }, [canvasRef]);

    const transitionDuration = theme.transitions.duration.shortest / 1000;
    const easing = "circOut";

    const typographyItem: Variants = {
        button: i => ({
            opacity: 0,
            y: "-10px",
        }),
        modal: i => ({
            opacity: 1,
            y: 0,
        }),
    }

    return (<Box ref={canvasContainerRef} sx={{
        width: "100%",
        height: "100vh",
        scrollSnapAlign: "center",
        position: "relative",
    }}>
        <canvas ref={canvasRef} width="512" height="512" style={{
            width: "100%",
            height: "100%",
        }}></canvas>

        <Stack
            direction="row"
            justifyContent="center"
            alignItems="end"
            gap={2}
            sx={theme => ({
                fontSize: "3rem",
                position: "absolute",
                bottom: theme.spacing(8),
                left: 0,
                right: 0,
            })}
        >
            <IconButton
                sx={{
                    fontSize: "inherit",
                    width: "1em", height: "1em",
                }}
                onClick={() => {
                    scrollContainerRef.current.scrollBy({
                        top: 1,
                    });
                }}
            >
                <KeyboardArrowDown color="inherit" style={{ fontSize: "inherit" }}/>
            </IconButton>
            <Box
                component={motion.div}
                sx={theme => ({
                    position: "relative",
                    borderRadius: "0.5em",
                    overflow: "hidden",
                    fontSize: "3rem",
                    backgroundColor: theme.palette.primary.main
                })}
                variants={{
                    button: {
                        width: "1em",
                        height: "1em",
                    },
                    modal: {
                        width: "10em",
                        height: "4em",
                        transition: {
                            duration: transitionDuration, ease: easing
                        }
                    }
                }}
                initial={false}
                animate={modalOpen ? 'modal' : 'button'}
            >
                <Box
                    component={motion.div}
                    sx={{
                        display: "block",
                        position: "absolute",
                        left: 0, right: 0, top: 0, bottom: 0,
                        textAlign: "left",
                        padding: 2
                    }}
                    variants={{
                        button: {
                            opacity: 0,
                        },
                        modal: {
                            transition: {
                                staggerChildren: 0.3
                            }
                        }
                    }}
                    animate={modalOpen ? "modal" : "button"}
                    transition={{ duration: transitionDuration, ease: "circIn" }}
                >
                        <Typography variant="body1">
                            <Typography component={motion.span} variant="body1" variants={typographyItem}>
                                Hello
                            </Typography>{" "}
                            <Typography component={motion.span} variant="body1" variants={typographyItem}>
                                friend
                            </Typography>
                        </Typography>
                        <Typography component={motion.p} variant="body1" variants={typographyItem}>Game</Typography>
                        <Typography component={motion.p} variant="body1" variants={typographyItem}>Game</Typography>
                        <Typography component={motion.p} variant="body1" variants={typographyItem}>Game</Typography>
                </Box>
                <MotionIconButton
                    key={1}
                    variant="contained"
                    sx={{
                        width: "1em",
                        height: "1em",
                        position: "absolute",
                    }}
                    component={motion.div}
                    transition={{ duration: transitionDuration, ease: "circIn" }}

                    variants={{
                        button: {
                            top: 0,
                            right: 0,
                            fontSize: "100%",
                        },
                        modal: {
                            top: theme.spacing(1),
                            right: theme.spacing(1),
                            fontSize: "50%",
                        }
                    }}
                    initial={false}
                    animate={modalOpen ? 'modal' : 'button'}

                    onClick={() => { setModalOpen(!modalOpen); }}
                >
                    <AnimatePresence initial={false}>
                        { modalOpen || (
                            <motion.span
                                key={0}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: transitionDuration, ease: "circIn" }}
                            >
                                <QuestionMark color="inherit" style={{ fontSize: "80%" }}/>
                            </motion.span>
                        )}
                        { modalOpen && (
                            <motion.span
                                key={1}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: transitionDuration, ease: "circIn" }}
                            >
                                <Close color="inherit" style={{ fontSize: "80%" }}/>
                            </motion.span>
                        )}
                    </AnimatePresence>
                </MotionIconButton>
            </Box>
        </Stack>
    </Box>)
}

type HomeProps = {}

export default function Home({}: HomeProps){
    const scrollContainer = React.useRef<HTMLElement>();


	return <>
        <Title/>
        <Box ref={scrollContainer} sx={{
            width: "100%",
            height: "100vh",
            overflow: "auto",
            scrollSnapType: "y mandatory",
            scrollBehavior: "smooth",
            scrollSnapStop: "always",
        }}>
            <HomeGame scrollContainerRef={scrollContainer}/>
            <Box sx={{
                width: "100%",
                height: "100vh",
                backgroundColor: "blue",
                scrollSnapAlign: "center",
            }}>

            </Box>
        </Box>
    </>
}