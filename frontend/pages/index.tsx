import { Button } from "@mui/material";
import type { NextPage } from "next";

const Index: NextPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <h3 className="text-3xl font-bold">Meetsy</h3>
        <h4 className="text-lg font-semibold">
          Simple, fast, and open source online booking system
        </h4>
        <div className="mt-8">
          <Button variant="contained">Create a meet</Button>
        </div>
      </div>
    </div>
  );
};

export default Index;
