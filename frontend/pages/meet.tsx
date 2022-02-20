import type { NextPage } from "next";
import { MeetupForm } from "src";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Meet: NextPage = () => {
  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      void router.push("/");
    }
  }, [status, router]);

  return (
    <div className="flex flex-col items-center lg:w-1/2 w-3/4">
      <MeetupForm />
    </div>
  );
};

export default Meet;
