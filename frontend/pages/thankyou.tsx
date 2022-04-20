import { NextPage } from "next";
import { blue } from "@mui/material/colors";
import { Typography } from "@mui/material";

const Thankyou: NextPage = () => {
  return (
    <div className="flex w-full flex-1 flex-col justify-center">
      <Typography variant="h5" align="center" color={blue[500]}>
        Thankyou for using Meetsy, please check your calendar to see your event
        details.
      </Typography>
    </div>
  );
};

export default Thankyou;
