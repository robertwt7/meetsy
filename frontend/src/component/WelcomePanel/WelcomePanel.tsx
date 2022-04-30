import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import {
  useRef,
  useEffect,
  useState,
  FunctionComponent,
  ReactNode,
} from "react";
import { signIn, useSession, signOut } from "next-auth/react";
import meetingImage from "public/images/meeting.png";

export const WelcomePanel: FunctionComponent = () => {
  const router = useRouter();
  const handleMeet = (): void => {
    void router.push("/meet");
  };
  const { status } = useSession();
  const isUnauthenticated = status !== "authenticated";
  const [iWord, setIWord] = useState(0);
  const words = [
    "Calendly Alternative",
    "Scheduling System",
    "Meeting Scheduler",
  ];
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (iWord === words.length - 1) {
        setIWord(0);
      } else {
        setIWord(iWord + 1);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [iWord]);

  const renderWord = (i: number): ReactNode => {
    return words.map((word, index) => (
      <span
        className={`absolute text-primary transition-all duration-300 ${
          index !== i ? "opacity-0" : ""
        }`}
      >
        {word}
      </span>
    ));
  };

  return (
    <div className="flex flex-1 flex-col items-center">
      <div className="relative my-8">
        <Typography variant="h3" fontWeight="800" ref={containerRef}>
          Simple and open source <br />
          {renderWord(iWord)}
        </Typography>
      </div>

      <div className="mt-8 flex w-2/3 flex-1 flex-col items-center justify-center md:w-1/3">
        <div className="w-full">
          <Image src={meetingImage} alt="meeting" layout="responsive" />
        </div>
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
            <Button
              variant="outlined"
              // eslint-disable-next-line @typescript-eslint/promise-function-async
              onClick={() => signOut()}
            >
              Sign out
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
