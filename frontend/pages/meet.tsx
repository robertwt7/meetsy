import type { NextPage } from "next";
import { Copyright, MeetupForm } from "src";

const Index: NextPage = () => {
  return (
    <div className="w-full md:h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center lg:w-1/2 w-3/4">
        <MeetupForm />
      </div>
      <div className="my-8">
        <Copyright />
      </div>
    </div>
  );
};

export default Index;
