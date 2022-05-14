import type { NextPage } from "next";
import { WelcomePanel, HowItWorksPanel, InfoPanel } from "src";

const Index: NextPage = () => {
  return (
    <>
      <WelcomePanel />
      <div className="mt-8 w-3/5 self-center">
        <HowItWorksPanel />
      </div>
      <div className="mt-8">
        <InfoPanel />
      </div>
    </>
  );
};

export default Index;
