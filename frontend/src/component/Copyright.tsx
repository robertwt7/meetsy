import Typography from "@mui/material/Typography";
import type { FunctionComponent } from "react";
import { app } from "src/env";
import MuiLink from "./Link";

export const Copyright: FunctionComponent = () => {
  const { APP_URL } = app;
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <MuiLink color="inherit" href={APP_URL}>
        Meetsy
      </MuiLink>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
};
