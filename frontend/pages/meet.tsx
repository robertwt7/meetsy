import type { NextPage } from "next";
import { useRouter } from "next/router";
import { Copyright, MeetupForm } from "src";

const Index: NextPage = () => {
  const router = useRouter();
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <MeetupForm />
      </div>
      <div className="my-8">
        <Copyright />
      </div>
    </div>
  );
};

export default Index;
