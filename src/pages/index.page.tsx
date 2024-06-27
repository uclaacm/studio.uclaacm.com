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
import HomeGame from "./home/Game";
import Logline from "./home/Logline";


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
            <Logline/>
        </Box>
    </>
}