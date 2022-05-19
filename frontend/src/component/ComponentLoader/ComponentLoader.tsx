import type { FunctionComponent } from "react";
import { CircularProgress } from "@mui/material";

export const ComponentLoader: FunctionComponent = () => {
  return (
    <div className="mt-20 text-center">
      <CircularProgress size="10%" />
    </div>
  );
};
