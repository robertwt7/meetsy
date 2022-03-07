import { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { red } from "@mui/material/colors";
import { Paper, Typography, Button } from "@mui/material";
import { useGetInvitedEventQuery } from "src";
import PersonIcon from "@mui/icons-material/Person";
import CalendarPicker from "@mui/lab/CalendarPicker";
import dayjs from "dayjs";
import { AvailableSpot } from "src/services/backend/model";
import type { Dayjs } from "dayjs";
import { FormikSelect, FormikTextField } from "src/form";
import { Formik, Form } from "formik";
import { useConfirmEventMutation } from "src/services/backend";
import * as yup from "yup";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { signIn, useSession } from "next-auth/react";
import { isMeetsyBackendError } from "src/services/backend/utils";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { UserCalendar } from "../UserCalendar";
import { useSnackBar } from "../SnackBar";

dayjs.extend(utc);
dayjs.extend(timezone);
interface AcceptFormProps {
  url: string;
}

interface FormikValues {
  spot: string;
  notes: string;
}

const validationSchema = yup.object().shape({
  spot: yup.string().required("Spots is required"),
  notes: yup.string(),
});

const initialValues = {
  spot: "",
  notes: "",
};

export const AcceptForm: FunctionComponent<AcceptFormProps> = ({ url }) => {
  const {
    data: eventData,
    isFetching,
    isError,
    error,
  } = useGetInvitedEventQuery(url);
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const availableDates =
    eventData?.spots != null ? Object.keys(eventData?.spots) : [];
  const [options, setOptions] = useState<AvailableSpot[]>([]);
  const [confirmEvent] = useConfirmEventMutation();
  const setSnackBar = useSnackBar();
  const router = useRouter();
  const { data: sessionData, status } = useSession();

  const shouldDisableDate = (newDate: Dayjs): boolean => {
    // If not in available dates then we should disable it
    const parsedDate = dayjs(newDate).format("YYYY-MM-DD");

    return !availableDates.includes(parsedDate);
  };

  const handleChangedate = (newDate: Dayjs | null): void => {
    setDate(newDate);

    const parsedDate = dayjs(newDate).format("YYYY-MM-DD");
    const spots = eventData?.spots ?? null;
    const availableSpots = spots?.[parsedDate] ?? [];
    setOptions(availableSpots);
  };

  const handleSubmit = async (values: FormikValues): Promise<void> => {
    try {
      if (eventData === undefined || sessionData === null) {
        throw new Error("Session is expired, please refresh the page");
      }
      const timeZone = dayjs.tz.guess();
      const spotInDayJs = dayjs(values.spot);
      const startTime = spotInDayJs.format();
      const endTime = spotInDayJs
        .add(eventData?.duration ?? 30, "minute")
        .format();
      const notes =
        eventData?.notes !== undefined
          ? `${eventData?.notes} <br/> Notes from ${
              sessionData?.user?.name ?? "invitee"
            }: ${values.notes}`
          : values.notes;

      const payload = {
        inviterId: eventData.user.userId,
        googleEventPayload: {
          summary: eventData.name,
          location: eventData.location,
          description: notes,
          start: {
            dateTime: startTime,
            timeZone,
          },
          end: {
            dateTime: endTime,
            timeZone,
          },
          attendees: [
            { email: sessionData.user?.email ?? "" },
            { email: eventData.user.email },
          ],
          reminders: {
            useDefault: true,
          },
        },
      };

      const response = await confirmEvent(payload).unwrap();

      setSnackBar({ message: "Event confirmed, please check your calendar" });
      setTimeout((): void => {
        void router.push("/thankyou");
      }, 3000);
    } catch (e) {
      let message = "Something has gone wrong, please refresh";
      if (isMeetsyBackendError(e?.data)) {
        message = e?.data?.detail;
      } else if (e?.message !== undefined) {
        message = e?.message;
      }
      setSnackBar({
        message,
        severity: "error",
      });
    }
  };

  useEffect(() => {
    if (isError) {
      setTimeout(() => {
        void router.push("/");
      }, 7000);
    }
  }, [isError, router]);

  if (isError) {
    const errorData = (error as FetchBaseQueryError)?.data;
    const errorText = isMeetsyBackendError(errorData)
      ? errorData.detail
      : "Something has gone wrong";
    return (
      <div className="flex flex-col items-center">
        <Typography variant="h4" color={red.A200}>
          {errorText}
        </Typography>
        <Typography variant="h5" className="mt-2">
          Redirecting you back to home...
        </Typography>
      </div>
    );
  }

  if (status !== "authenticated") {
    return (
      <div>
        <Button
          variant="contained"
          // eslint-disable-next-line @typescript-eslint/promise-function-async
          onClick={() => signIn("google")}
        >
          Sign in With Google to see Invite
        </Button>
      </div>
    );
  }

  // TODO: check if there is any error in the query
  return !isFetching ? (
    <div className="flex flex-col w-full">
      <Paper className="w-full">
        <div className="flex flex-row items-stretch">
          <div className="w-1/4">
            <div className="flex flex-row space-x-4 m-4 mb-2 items-center">
              <PersonIcon />
              <Typography variant="h5">
                {eventData?.user?.first_name} {eventData?.user?.last_name}
              </Typography>
            </div>
            <Typography variant="h6" className="ml-4">
              {eventData?.user?.email}
            </Typography>
            <Typography variant="h4" className="m-4 mb-2">
              {eventData?.name}
            </Typography>
            <Typography variant="body1" className="ml-4 m-2">
              {eventData?.location}
            </Typography>
            <Typography variant="body2" className="ml-4 m-2">
              {eventData?.notes}
            </Typography>
          </div>
          <div className="w-3/4 border-l p-4 border-gray-300 flex flex-row">
            <div className="w-1/2">
              <CalendarPicker
                date={date}
                views={["day", "month"]}
                onChange={handleChangedate}
                shouldDisableDate={shouldDisableDate}
              />
            </div>
            <div className="w-1/3">
              <div className="m-4 mt-2">
                <Typography variant="h5">Your Detail:</Typography>
              </div>
              <div className="flex flex-row space-x-4 m-4 mb-2 items-center">
                <PersonIcon />
                <Typography variant="h5">{sessionData?.user?.name}</Typography>
              </div>
              <Typography variant="h6" className="ml-4">
                {sessionData?.user?.email}
              </Typography>
            </div>
            <div className="w-1/3">
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, isValid }) => (
                  <Form>
                    <div className="flex flex-col">
                      <div className="my-2 w-full">
                        <FormikSelect
                          options={options}
                          name="spot"
                          label="Spot"
                          valueKey="start"
                          nameKey="startTime"
                          className="w-full"
                        />
                      </div>
                      <div className="my-2">
                        <FormikTextField
                          name="notes"
                          label="Extra notes"
                          multiline
                          rows={4}
                          className="w-full"
                        />
                      </div>
                      <div className="mt-8 w-full">
                        <Button
                          type="submit"
                          variant="contained"
                          className="w-full"
                          disabled={isSubmitting || !isValid}
                        >
                          Confirm
                        </Button>
                      </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Paper>
      <div className="my-2">
        <UserCalendar selectable={false} label="Your calendar" />
      </div>
    </div>
  ) : null;
};
