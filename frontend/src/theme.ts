import { createTheme } from "@mui/material/styles";
import type {} from "@mui/lab/themeAugmentation";
import { red, green } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    "2xl": true;
  }
}

// Create a theme instance.
const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      "2xl": 1536,
    },
  },
  palette: {
    primary: {
      main: "#0D47A1",
    },
    secondary: {
      main: "#bbdefb",
    },
    success: {
      main: green.A200,
      contrastText: green[500],
    },
    error: {
      main: red.A200,
    },
  },
});

export default theme;
