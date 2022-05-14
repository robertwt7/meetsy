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
    <div className="flex w-full flex-col items-center justify-center">
      <div className="w-full p-4 md:w-2/3">
        <MeetupForm />
      </div>
    </div>
  );
};

export default Meet;
