import { Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState, FunctionComponent, ReactNode } from "react";
import { useSession } from "next-auth/react";
import telecommuting from "src/assets/telecommuting.svg";

export const WelcomePanel: FunctionComponent = () => {
  const router = useRouter();
  const handleMeet = (): void => {
    if (isUnauthenticated) {
      router.push("/signin");
    } else {
      void router.push("/meet");
    }
  };
  const { status } = useSession();
  const isUnauthenticated = status !== "authenticated";
  const [iWord, setIWord] = useState(0);
  const words = [
    "Calendly Alternative",
    "Scheduling System",
    "Meeting Scheduler",
  ];

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
      <div
        className={`absolute text-primary transition duration-500 ${
          index !== i ? "-translate-y-6 opacity-0" : "opacity-100"
        }`}
      >
        <Typography variant="h3" fontWeight="800">
          {word}
        </Typography>
      </div>
    ));
  };

  return (
    <div className="flex w-full flex-1 flex-col">
      <div className="mt-8 flex w-full flex-1 flex-col items-center justify-center">
        <div className="flex w-full flex-col-reverse flex-wrap items-center justify-center md:flex-row">
          <div className="my-8 w-full md:w-1/2">
            <div className="flex flex-col">
              <div>
                <Typography variant="h3" fontWeight="800">
                  Simple and open source <br />
                </Typography>
                {renderWord(iWord)}
              </div>
              <div className="mt-32 md:mt-16">
                <Typography variant="h6">
                  Finding meeting times are painful. Meetsy simplifies finding a
                  time that works for you and your friend!
                </Typography>
              </div>
              <div className="mt-8">
                <Button variant="contained" onClick={handleMeet}>
                  Let&apos;s Meetsy
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2">
            <Image src={telecommuting} alt="meeting" layout="responsive" />
          </div>
        </div>
      </div>
    </div>
  );
};
