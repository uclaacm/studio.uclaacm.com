import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import "@fontsource/poppins/800.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins";
import { PaletteOptions } from "@mui/material/styles";
import BasicLink from "./components/BasicLink";

// https://design.uclaacm.com/committees/studio/

const paletteOptions: PaletteOptions = {
    primary: {
        main: "#FB4469",
        contrastText: "#FFFFFF",
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

const SPACING = 8;

export default createTheme({
    palette: paletteOptions,
    spacing: SPACING,
    typography: {
        fontFamily: [
            "Poppins",
            "sans-serif"
        ].join(","),


        display1: {
            fontSize: "4.75rem",
            lineHeight: "5.33rem",
            fontWeight: 700,
            fontFamily: "Poppins",
        },
        display2: {
            fontSize: "3rem",
            lineHeight: "3.66rem",
            fontWeight: 700,
            fontFamily: "Poppins",
        },

        h1: {
            fontSize: "2.66rem",
            lineHeight: "3.33rem",
            fontWeight: 400,
            fontFamily: "Poppins",
        },
        h2: {
            fontSize: "2.33rem",
            lineHeight: "3rem",
            fontWeight: 400,
            fontFamily: "Poppins",
        },
        h3: {
            fontSize: "2rem",
            lineHeight: "2.66rem",
            fontWeight: 400,
            fontFamily: "Poppins",
        },

        title1: {
            fontSize: "1.833rem",
            lineHeight: "2.33rem",
            fontWeight: 400,
            fontFamily: "Poppins",
        },
        title2: {
            fontSize: "1.33rem",
            lineHeight: "2rem",
            fontWeight: 400,
            fontFamily: "Poppins",
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
            fontSize: "1.33rem",
            lineHeight: "2rem",
            fontWeight: 400
        },
        body2: {
            fontSize: "1rem",
            lineHeight: "1.33rem",
            fontWeight: 400
        },

        button: {
            fontFamily: "sans-serif",
            fontSize: "1rem",
            fontWeight: 400,
            textTransform: "none",
            lineHeight: 1,
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
                LinkComponent: BasicLink,
            },
        },
        MuiButton: {
            defaultProps: {
                disableElevation: true,
            },
            styleOverrides: {
                sizeLarge: {
                    fontSize: "1.75rem",
                    borderRadius: "0.625em",
                    padding: "0.75em 1em",
                },
                sizeMedium: {
                    fontSize: "1.33rem",
                    borderRadius: "0.625em",
                    padding: "0.75em 1em",
                },
                endIcon: {
                    "& > :nth-of-type(1)": {
                        fontSize: "1em",
                    }
                }
            }
        },
        MuiIconButton: {
            defaultProps: {
                disableRipple: true,
                disableTouchRipple: true,
            },
        },
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    display1: "p",
                    display2: "p",

                    title1: "h1",
                    title2: "h2",

                    h1: "h1",
                    h2: "h2",
                    h3: "h3",

                    body1: "p",
                    body2: "p",
                }
            }
        }
    }
})