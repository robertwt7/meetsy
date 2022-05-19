import { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Paper, Typography, Button } from "@mui/material";
import { red } from "@mui/material/colors";
import { useGetInvitedEventQuery } from "src";
import CalendarPicker from "@mui/lab/CalendarPicker";
import dayjs from "dayjs";
import { AvailableSpot } from "src/services/backend/model";
import type { Dayjs } from "dayjs";
import { FormikTextField } from "src/form";
import { Formik, Form } from "formik";
import { useConfirmEventMutation } from "src/services/backend";
import * as yup from "yup";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { signIn, useSession } from "next-auth/react";
import { isMeetsyBackendError } from "src/services/backend/utils";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import Image from "next/image";
import googleLogo from "src/assets/google_dark.svg";
import { DateRange, UserCalendar } from "../UserCalendar";
import { useSnackBar } from "../SnackBar";
import { mapDatesToCalendarObject } from "./utils";

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
  spot: yup.string().required("Spot is required"),
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
  const allSpots =
    eventData?.spots != null
      ? ([] as AvailableSpot[]).concat(
          ...Object.values(eventData.spots).map((e) => e)
        )
      : [];
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

  const handleSelectEvent =
    (
      setFieldValue: (
        field: string,
        value: any,
        shouldValidate?: boolean | undefined
      ) => void
    ) =>
    (event: DateRange) => {
      setFieldValue("spot", dayjs(event?.start?.dateTime).format(), true);
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
        eventId: eventData.id,
        googleEventPayload: {
          summary: eventData.name,
          conferenceDataVersion: 1,
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

      await confirmEvent(payload).unwrap();

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
          className="bg-[#4285F4] py-1 pl-1 font-roboto capitalize"
          data-testid="sign-in-button"
          startIcon={
            <Image src={googleLogo} alt="google" width={38} height={38} />
          }
        >
          Sign in With Google to see Invite
        </Button>
      </div>
    );
  }

  // TODO: check if there is any error in the query
  return !isFetching ? (
    <div className="flex w-full flex-col py-4 md:py-0">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        validateOnMount
        enableReinitialize
      >
        {({ isSubmitting, isValid, setFieldValue, errors }) => (
          <Form>
            <Paper className="w-full">
              <div className="flex flex-col md:flex-row md:items-stretch">
                <div className="w-full bg-gray-50 md:w-1/3">
                  <div className="m-4 space-y-2">
                    <Typography variant="body1" className="text-gray-800">
                      Meeting Details
                    </Typography>
                    <Typography variant="h6">{eventData?.name}</Typography>
                    <Typography variant="body1">
                      🕖 Duration: {eventData?.duration}
                    </Typography>
                    <Typography variant="body1">
                      📍 Location: {eventData?.location}
                    </Typography>
                    <div className="flex flex-row items-center space-x-2">
                      <Typography variant="body1">
                        👋 From: {eventData?.user?.first_name}{" "}
                        {eventData?.user?.last_name} ({eventData?.user?.email})
                      </Typography>
                    </div>

                    <Typography variant="body1">
                      📖 Notes: {eventData?.notes}
                    </Typography>
                  </div>
                  <div className="m-4 space-y-2">
                    <Typography variant="body1" className="text-gray-800">
                      Your Details
                    </Typography>
                    <div className="flex flex-row items-center space-x-2">
                      <Typography variant="body1">
                        👋 Me: {sessionData?.user?.name} (
                        {sessionData?.user?.email})
                      </Typography>
                    </div>
                  </div>
                  <div className="m-4 mt-6 ">
                    <Typography variant="body1" className="text-gray-800">
                      Available Dates
                    </Typography>
                    <CalendarPicker
                      className="ml-0 mr-auto"
                      date={date}
                      views={["day", "month"]}
                      onChange={handleChangedate}
                      shouldDisableDate={shouldDisableDate}
                    />
                    <div className="m-4 mt-0">
                      <div className="flex flex-col">
                        {/* <div className="my-2 w-full">
                          <FormikSelect
                            options={options}
                            name="spot"
                            label="Spot"
                            valueKey="start"
                            nameKey="startTime"
                            className="w-full"
                          />
                        </div> */}
                        <div className="my-2">
                          <FormikTextField
                            name="notes"
                            label="Add your notes"
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
                    </div>
                  </div>
                </div>
                <div className="relative flex w-full flex-col overflow-auto border-l border-gray-300 p-4 md:w-2/3">
                  <UserCalendar
                    selectable={false}
                    label="Your calendar"
                    date={date?.toDate()}
                    onSelectEvent={handleSelectEvent(setFieldValue)}
                    availableDates={mapDatesToCalendarObject(
                      allSpots,
                      eventData?.duration ?? 30
                    )}
                    toolbar={() => <div />}
                  />
                  {Boolean(errors?.spot) && (
                    <div className="my-3">
                      <Typography variant="body2" color="error">
                        {errors?.spot}
                      </Typography>
                    </div>
                  )}
                </div>
              </div>
            </Paper>
          </Form>
        )}
      </Formik>
    </div>
  ) : null;
};
