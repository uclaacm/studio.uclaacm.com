import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import "@fontsource/poppins/800.css";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins";
import "@fontsource/noto-color-emoji";
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
    default: "#FCFCFC",
  },
};

const SPACING = 8;

const theme = createTheme({
  cssVariables: true,
  shape: {
    borderRadius: 16,
  },
  palette: paletteOptions,
  spacing: SPACING,
  typography: {
    fontFamily: ["Poppins", "Noto Color Emoji", "sans-serif"].join(","),
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
        LinkComponent: BasicLink,
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderRadius: theme.shape.borderRadius,
        }),
      }
    },
    MuiCard: {
      defaultProps: {
        raised: true,
        elevation: 1,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(2),
        }),
      }
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
        sizeSmall: {
          fontSize: "1rem",
          borderRadius: "0.625em",
          padding: "0.75em 1em",
        },
        endIcon: {
          "& > :nth-of-type(1)": {
            fontSize: "1em",
          },
        },
      },
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
        },
      },
    },
  },
});

const md = theme.breakpoints.down("md");
const sm = theme.breakpoints.down("sm");

theme.components.MuiContainer = {
  styleOverrides: {
    root: {
      paddingLeft: `${SPACING * 4}px`,
      paddingRight: `${SPACING * 4}px`,
      [theme.breakpoints.up("sm")]: {
        paddingLeft: `${SPACING * 4}px`,
        paddingRight: `${SPACING * 4}px`,
      },
    },
  },
};

const fontFamily = theme.typography.fontFamily;

theme.typography = {
  ...theme.typography,

  display1: {
    fontSize: "4.75rem",
    lineHeight: 1.125,
    fontWeight: 700,
    fontFamily,
    [md]: {
      fontSize: "2.5rem",
    },
    [sm]: {
      fontSize: "2rem",
    },
  },
  display2: {
    fontSize: "3rem",
    lineHeight: 1.25,
    fontWeight: 700,
    fontFamily,
    [md]: {
      fontSize: "2.25rem",
    },
    [sm]: {
      fontSize: "1.875rem",
    },
  },

  h1: {
    fontSize: "2.66rem",
    lineHeight: 1.25,
    fontWeight: 400,
    fontFamily,
    [md]: {
      fontSize: "2rem",
    },
    [sm]: {
      fontSize: "1.75rem",
    },
  },
  h2: {
    fontSize: "2.33rem",
    lineHeight: 1.25,
    fontWeight: 400,
    fontFamily,
    [md]: {
      fontSize: "1.833rem",
    },
    [sm]: {
      fontSize: "1.66rem",
    },
  },
  h3: {
    fontSize: "2rem",
    lineHeight: 1.25,
    fontWeight: 400,
    fontFamily,
    [md]: {
      fontSize: "1.5rem",
    },
  },

  title1: {
    fontSize: "1.833rem",
    lineHeight: 1.25,
    fontWeight: 400,
    fontFamily,
    [md]: {
      fontSize: "1.333rem",
    },
  },
  title2: {
    fontSize: "1.33rem",
    lineHeight: 1.5,
    fontWeight: 400,
    fontFamily,
    [md]: {
      fontSize: "1.25rem",
    },
  },

  subtitle1: {
    fontSize: "1rem",
    fontWeight: 400,
    fontFamily,
  },
  subtitle2: {
    fontSize: "0.875rem",
    fontWeight: 400,
    fontFamily,
  },

  body1: {
    fontSize: "1.33rem",
    lineHeight: 1.5,
    fontWeight: 400,
    fontFamily: theme.typography.fontFamily,
    [md]: {
      fontSize: "1rem",
    },
  },
  body2: {
    fontSize: "1rem",
    lineHeight: 1.33,
    fontWeight: 400,
    fontFamily,
    [md]: {
      fontSize: "0.875rem",
    },
  },

  button: {
    fontFamily,
    fontSize: "1rem",
    fontWeight: 400,
    textTransform: "none",
    lineHeight: 1,
  },

  caption: {
    fontSize: "0.75rem",
    fontWeight: 400,
    fontFamily,
  },

  overline: {
    fontSize: "0.75rem",
    fontWeight: 700,
    fontFamily,
  },
};

export default theme;
