import type { FunctionComponent } from "react";
import { CircularProgress } from "@mui/material";

export const ComponentLoader: FunctionComponent = () => {
  return (
    <div className="flex h-full w-full items-center">
      <div className="w-full text-center">
        <CircularProgress size="10%" />
      </div>
    </div>
  );
};
