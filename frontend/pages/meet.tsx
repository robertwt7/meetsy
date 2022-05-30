import type { NextPage } from "next";
import { MeetupForm } from "src";

const Meet: NextPage = () => {
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-full p-4 md:w-2/3">
        <MeetupForm />
      </div>
    </div>
  );
};

export default Meet;
