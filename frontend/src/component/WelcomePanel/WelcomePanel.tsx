import { Button, Typography, Stack } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { signIn, useSession, signOut } from "next-auth/react";
import { FunctionComponent } from "react";
import meetingImage from "public/images/meeting.png";

export const WelcomePanel: FunctionComponent = () => {
  const router = useRouter();
  const handleMeet = (): void => {
    void router.push("/meet");
  };
  const { data, status } = useSession();
  const isUnauthenticated = status !== "authenticated";

  return (
    <div className="flex flex-1 flex-col items-center justify-center">
      {!isUnauthenticated && (
        <Typography variant="h5">Welcome, {data?.user?.name}</Typography>
      )}
      <div className="mt-4 w-2/3 md:w-1/3">
        <Image src={meetingImage} alt="meeting" layout="responsive" />
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
        {isUnauthenticated ? (
          <Button
            variant="contained"
            // eslint-disable-next-line @typescript-eslint/promise-function-async
            onClick={() => signIn("google")}
          >
            Sign in with Google
          </Button>
        ) : (
          <Stack alignContent="center">
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
