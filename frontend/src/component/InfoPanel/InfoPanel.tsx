import { Typography } from "@mui/material";
import { FunctionComponent } from "react";

export const InfoPanel: FunctionComponent = () => {
  return (
    <div className="flex min-h-[500px] w-full flex-1 flex-col items-center justify-center bg-black text-center text-white">
      <div>
        <Typography variant="h3" fontWeight="800">
          Meetsy takes two calendars and finds the best times to meet up!
        </Typography>
      </div>
    </div>
  );
};
