import { NextPage } from "next";
import { blue } from "@mui/material/colors";
import { Typography } from "@mui/material";

const Thankyou: NextPage = () => {
  return (
    <div className="flex flex-col md:items-center lg:w-1/2 w-3/4">
      <Typography variant="h5" align="center" color={blue[500]}>
        Thankyou for using Meetsy, please check your calendar to see your event
        details.
      </Typography>
    </div>
  );
};

export default Thankyou;
