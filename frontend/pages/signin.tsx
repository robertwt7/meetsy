import { Button } from "@mui/material";
import { NextPage } from "next";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/router";
import googleLogo from "src/assets/google_dark.svg";

import { useSnackBar } from "src";
import { useEffect } from "react";

const Signin: NextPage = () => {
  const router = useRouter();
  const error = router.query?.error;
  const { status } = useSession();

  const setSnackBar = useSnackBar();

  useEffect(() => {
    if (status === "authenticated") {
      void router.push("/");
      setSnackBar({ message: "Successfully signed in" });
    }
  }, [status]);

  useEffect(() => {
    if (error !== undefined && error !== null) {
      setSnackBar({
        message: "There is an error in your sign in",
        severity: "error",
      });
    }
  }, [error]);

  return (
    <div className="mx-2 flex w-full flex-1 flex-col items-center justify-center">
      <div className="rounded-md border border-solid border-grey-400 p-8">
        <Button
          variant="contained"
          // eslint-disable-next-line @typescript-eslint/promise-function-async
          onClick={() => signIn("google")}
          className="bg-[#4285F4] py-1 pl-1 font-roboto capitalize"
          startIcon={
            <Image src={googleLogo} alt="google" width={38} height={38} />
          }
        >
          Sign in with Google
        </Button>
      </div>
    </div>
  );
};

export default Signin;
