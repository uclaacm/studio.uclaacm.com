import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {ImageList, ImageListItem} from '@mui/material'; // for masonry
import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material"; // maybe use accordions for each image? unfold when clicked for details
// question: how do I use both imagelistitem AND accordion in an imagelist set to masonry? questions questions

type ShowcaseProps = {};

// Faustine: figuring out how to use this... unfortunately didn't have much time these past two weeks sadge!
// type itemData = {
//     {
//         img: ,

//     }
// }

export default function Showcase({}: ShowcaseProps) {
    return (
        <Box>
            <Typography variant="h1">Showcase</Typography>
            {/* <ImageList variant="masonry" cols={3} gap={8}>
                {itemData.map((item) => (
                    <ImageListItem key={item.img}>
                    <img
                        src={`${item.img}?w=248&fit=crop&auto=format`}
                        srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                        alt={item.title}
                        loading="lazy"
                    />
                    </ImageListItem>
                ))}
            </ImageList> */}
        </Box>
    );
}
