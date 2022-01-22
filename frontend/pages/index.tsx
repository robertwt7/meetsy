import type { NextPage } from "next";
import { Copyright, WelcomePanel, UserCalendar } from "src";

const Index: NextPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <WelcomePanel />
      <UserCalendar />
      <div className="my-8">
        <Copyright />
      </div>
    </div>
  );
};

export default Index;
