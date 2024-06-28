import { purple, teal } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palatte: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: teal[500],
    },
  },
  typography: {
    fontFamily: "Roboto,  sans-serif",
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      marginBottom: "1rem",
    },
  },
});
