import { createTheme, responsiveFontSizes } from "@mui/material/styles";

import "@fontsource/poppins/800.css";
import "@fontsource/poppins";

export default responsiveFontSizes(createTheme({
	palette: {
		background: {
			default: "#FCFCFC"
		}
	},
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
            fontSize: "3rem",
            fontWeight: 700
        },
        h4: {
            fontSize: "1.5rem",
            fontWeight: 700
        },
        h5: {
            fontSize: "1.25rem",
            fontWeight: 700
        },
        h6: {
            fontSize: "1rem",
            fontWeight: 700
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
}))