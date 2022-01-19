import { Button, Typography } from "@mui/material";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { signIn, useSession } from "next-auth/react";
import { Copyright } from "src";
import Image from "next/image";
import logo from "public/images/logo.png";

const Index: NextPage = () => {
  const router = useRouter();
  const handleMeet = (): void => {
    void router.push("/meet");
  };
  const { data, status } = useSession();

  return (
    <div className="w-full h-screen flex flex-col justify-center items-center">
      <div className="flex flex-col items-center">
        <Image src={logo} alt="logo" width={200} height={200} />
        <Typography variant="h3" fontWeight="semibold" gutterBottom>
          Meetsy
        </Typography>
        <h4 className="text-lg font-semibold">
          Simple, fast, and open source online booking system
        </h4>
        <div className="mt-8">
          <Button variant="contained" onClick={handleMeet}>
            Create a meet
          </Button>
        </div>
        <div className="mt-8">
          {status !== "authenticated" ? (
            <Button
              variant="contained"
              // eslint-disable-next-line @typescript-eslint/promise-function-async
              onClick={() => signIn("google")}
            >
              Sign in with Google
            </Button>
          ) : (
            <Typography variant="h6" className="text-gray-600">
              Welcome, {data?.user?.name}
            </Typography>
          )}
        </div>
      </div>
      <div className="my-8">
        <Copyright />
      </div>
    </div>
  );
};

export default Index;
