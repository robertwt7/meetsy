import type { NextPage } from "next";
import { Copyright, WelcomePanel } from "src";

const Index: NextPage = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <WelcomePanel />
      <div className="my-8">
        <Copyright />
      </div>
    </div>
  );
};

export default Index;
