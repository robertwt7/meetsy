import { Button, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Copyright } from "src";

const Index: NextPage = () => {
  const router = useRouter();
  const handleMeet = (): void => {
    void router.push("/meet");
  };
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <Typography variant="h3" fontWeight="semibold" gutterBottom>
          Meetsy
        </Typography>
        <h4 className="text-lg font-semibold">
          Simple, fast, and open source online booking system
        </h4>
        <div className="mt-8">
          <Button variant="contained" onClick={handleMeet}>
            Create a meet
          </Button>
        </div>
      </div>
      <div className="my-8">
        <Copyright />
      </div>
    </div>
  );
};

export default Index;
