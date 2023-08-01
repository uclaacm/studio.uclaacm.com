import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {ImageList, ImageListItem} from '@mui/material'; // for masonry
import ImageListItemBar from '@mui/material/ImageListItemBar';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';


import Masonry from '@mui/lab/Masonry';
import { styled } from '@mui/material/styles'; // for styling
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'; // expand icon
import Paper from '@mui/material/Paper'; // paper
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material"; // maybe use accordions for each image? unfold when clicked for details
import Container from "~/components/Container";
// question: how do I use both imagelistitem AND accordion in an imagelist set to masonry? questions questions

type ShowcaseProps = {};

const colNum = 5;
const gapSize = 15;

// need a lower zindex
export default function Showcase({}: ShowcaseProps) {
    return (
        <Container>
            <Typography variant="h1">Showcase</Typography>
            <Typography variant="h2">2023</Typography>
            <ImageList variant="masonry" cols={colNum} gap={gapSize}>
                {/* {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                      <img
                          src={`${item.img}?w=248&fit=crop&auto=format`}
                          alt={item.title}
                          loading="lazy"
                      />
                      <ImageListItemBar
                          title={item.title}
                          subtitle={item.author}
                          actionIcon={
                            <IconButton
                              sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                              aria-label={`info about ${item.title}`}
                            >
                              <InfoIcon />
                            </IconButton>
                          }
                      />
                    </ImageListItem>
                ))} */}
            </ImageList>
        </Container>
    );
}