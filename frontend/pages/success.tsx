import { NextPage } from "next";
import { Typography } from "@mui/material";
import { useRouter } from "next/router";

const Success: NextPage = () => {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center lg:w-1/2 w-3/4">
      <Typography align="center" variant="h4" color="blue">
        Events created successfully, please share the link below to your friends
      </Typography>
      <Typography align="center" variant="h5">
        {router.query?.url}
      </Typography>
    </div>
  );
};

export default Success;
