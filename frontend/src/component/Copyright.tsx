import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import type { FunctionComponent } from "react";
import { app } from "src/env";

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
