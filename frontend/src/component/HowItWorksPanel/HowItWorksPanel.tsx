import { Typography } from "@mui/material";
import Image from "next/image";
import { FunctionComponent } from "react";
import loginImage from "src/assets/login.svg";
import marketingImage from "src/assets/marketing.svg";
import eventsImage from "src/assets/events.svg";

export const HowItWorksPanel: FunctionComponent = () => {
  return (
    <div className="flex flex-1 flex-col items-center">
      <div>
        <Typography variant="h4" fontWeight="700">
          How Meetsy Works
        </Typography>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="flex w-full flex-col items-center p-4 md:w-1/3">
          <div className="w-full">
            <Image src={loginImage} alt="login" layout="responsive" />
          </div>
          <Typography variant="h6" fontWeight="bold">
            Sign in with Google.
          </Typography>
          <Typography variant="h6" fontWeight="500">
            Simply login using your most used Google account so Meetsy can find
            available time slots
          </Typography>
        </div>
        <div className="flex w-full flex-col items-center p-4 md:w-1/3">
          <div className="w-full">
            <Image src={marketingImage} alt="login" layout="responsive" />
          </div>
          <Typography variant="h6" fontWeight="bold">
            Create an event.
          </Typography>
          <Typography variant="h6" fontWeight="500">
            Within a couple of clicks, set up an event with potential times.
          </Typography>
        </div>
        <div className="flex w-full flex-col items-center p-4 md:w-1/3">
          <div className="w-full">
            <Image src={eventsImage} alt="login" layout="responsive" />
          </div>
          <Typography variant="h6" fontWeight="bold">
            Share & select a time.
          </Typography>
          <Typography variant="h6" fontWeight="500">
            Share your event with friends via a link. Meetsy will help book a
            time that suits them and you.
          </Typography>
        </div>
      </div>
    </div>
  );
};
