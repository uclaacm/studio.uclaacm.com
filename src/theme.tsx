import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import "@fontsource/poppins/800.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins";
import { PaletteOptions } from "@mui/material/styles";

// https://design.uclaacm.com/committees/studio/

const paletteOptions = {
    primary: {
        main: "#FB4469"
    },
    secondary: {
        light: "#FF8C93",
        main: "#E83D3D",
        dark: "#4C1941",
    },
    background: {
        default: "#FCFCFC"
    }
}

export default responsiveFontSizes(createTheme({
    palette: paletteOptions,
    spacing: 8,
    typography: {
        fontFamily: [
            "Poppins",
            "sans-serif"
        ].join(","),
        h1: {
            fontSize: "2.5rem",
            fontWeight: 700
        },
        h2: {
            fontSize: "2rem",
            fontWeight: 700
        },
        h3: {
            fontSize: "1.5rem",
            fontWeight: 700
        },
        h4: {
            fontSize: "1.5rem",
            fontWeight: 400
        },
        h5: {
            fontSize: "1.25rem",
            fontWeight: 400
        },
        h6: {
            fontSize: "1rem",
            fontWeight: 400
        },
        subtitle1: {
            fontSize: "1rem",
            fontWeight: 400
        },
        subtitle2: {
            fontSize: "0.875rem",
            fontWeight: 400
        },
        body1: {
            fontSize: "1rem",
            fontWeight: 400
        },
        body2: {
            fontSize: "0.875rem",
            fontWeight: 400
        },
        button: {
            fontSize: "0.875rem",
            fontWeight: 700
        },
        caption: {
            fontSize: "0.75rem",
            fontWeight: 400
        },
        overline: {
            fontSize: "0.75rem",
            fontWeight: 700
        }
    },
    components: {
        MuiButtonBase: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
            },
        },
        MuiIconButton: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
            },
        },
    }
}))