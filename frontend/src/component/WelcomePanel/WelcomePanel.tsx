import { Button, Typography, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { signIn, useSession, signOut } from "next-auth/react";
import Image from "next/image";
import logo from "public/images/meetsy_logo.png";
import { FunctionComponent } from "react";

export const WelcomePanel: FunctionComponent = () => {
  const router = useRouter();
  const handleMeet = (): void => {
    void router.push("/meet");
  };
  const { data, status } = useSession();

  return (
    <div className="flex flex-col items-center">
      <div className="w-1/6">
        <Image src={logo} alt="logo" />
      </div>
      <h4 className="text-lg font-semibold">
        Simple, fast, and open source online booking system
      </h4>
      {status === "authenticated" && (
        <div className="mt-8">
          <Button variant="contained" onClick={handleMeet}>
            Create a meet
          </Button>
        </div>
      )}

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
          <Stack alignContent="center">
            <Typography variant="h6" className="text-gray-600">
              Welcome, {data?.user?.name}
            </Typography>
            <Button
              variant="outlined"
              // eslint-disable-next-line @typescript-eslint/promise-function-async
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          </Stack>
        )}
      </div>
    </div>
  );
};
