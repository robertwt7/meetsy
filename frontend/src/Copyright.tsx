import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import type { FunctionComponent } from "react";

export const Copyright: FunctionComponent = () => {
  return (
    <Typography variant="body2" color="text.secondary" align="center">
      {"Copyright © "}
      <MuiLink color="inherit" href="https://mui.com/">
        Meetsy
      </MuiLink>{" "}
      {new Date().getFullYear()}.
    </Typography>
  );
};
