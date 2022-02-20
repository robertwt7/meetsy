import Typography from "@mui/material/Typography";
import type { FunctionComponent } from "react";
import { app } from "src/env";
import { Link } from "..";

export const Copyright: FunctionComponent = () => {
  const { APP_URL } = app;
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href={APP_URL}>
        Meetsy
      </Link>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
};
