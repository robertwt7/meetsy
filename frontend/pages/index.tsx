import type { NextPage } from "next";
import { WelcomePanel, HowItWorksPanel, InfoPanel } from "src";

const Index: NextPage = () => {
  return (
    <>
      <div className=" self-center px-8 md:w-3/5 md:px-0">
        <WelcomePanel />
      </div>
      <div className="mt-8 w-full self-center px-4 md:w-3/5 md:px-0">
        <HowItWorksPanel />
      </div>
      <div className="mt-8">
        <InfoPanel />
      </div>
    </>
  );
};

export default Index;
