import * as React from "react";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

type AboutProps = {};

export default function About({}: AboutProps) {
    return (
        <Box>
            <Typography variant="h1">About us </Typography>;
        </Box>
    );
}
