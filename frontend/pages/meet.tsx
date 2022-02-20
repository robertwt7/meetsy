import type { NextPage } from "next";
import { MeetupForm } from "src";

const Meet: NextPage = () => {
  return (
    <div className="flex flex-col items-center lg:w-1/2 w-3/4">
      <MeetupForm />
    </div>
  );
};

export default Meet;
