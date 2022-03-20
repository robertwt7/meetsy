import { createTheme } from "@mui/material/styles";
import type {} from "@mui/lab/themeAugmentation";
import { red } from "@mui/material/colors";

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#0D47A1",
    },
    secondary: {
      main: "#bbdefb",
    },
    error: {
      main: red.A200,
    },
  },
});

export default theme;
