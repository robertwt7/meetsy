/* eslint-disable camelcase */
import type { FunctionComponent } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { FormikTextField, FormikSelect } from "src/form";
import { Stack, Button, Typography } from "@mui/material";
import { UserCalendar } from "src/component";
import { formatISO } from "date-fns";
import { useCreateMeetsyEventsMutation } from "src/services/backend";
import { app } from "src/env";
import { useRouter } from "next/router";
import { useSnackBar } from "../SnackBar";
import { DateRange } from "../UserCalendar";

const durationOptions = [
  { id: "30", name: "30 Minutes" },
  { id: "45", name: "45 Minutes" },
  { id: "60", name: "60 Minutes" },
];

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  duration: yup.string().required("Duration is required"),
  location: yup.string(),
  notes: yup.string(),
  available_dates: yup
    .array()
    .min(1, "Please select at least 1 time slot")
    .required("Required"),
});

const initialValues: InitialValuesType = {
  name: "",
  duration: "",
  location: "",
  notes: "",
  available_dates: [],
};

interface InitialValuesType {
  name: string;
  duration: string;
  location: string;
  notes: string;
  available_dates: DateRange[];
}

export const MeetupForm: FunctionComponent = () => {
  const router = useRouter();
  const [createMeetsyEvent, { isLoading, isSuccess }] =
    useCreateMeetsyEventsMutation();
  const setSnackBar = useSnackBar();
  const handleSubmit = async (values: InitialValuesType): Promise<void> => {
    const processedValues = {
      ...values,
      available_dates: values.available_dates.map((item) => ({
        ...item,
        start: formatISO(item.start.dateTime),
        end: formatISO(item.end.dateTime),
      })),
    };

    try {
      const response = await createMeetsyEvent(processedValues).unwrap();

      const url = `${app.APP_URL}/invite/?url=${response.invite_url}`;
      setSnackBar({ message: "Event created successfully" });

      setTimeout(() => {
        void router.push(
          {
            pathname: "/success",
            query: { url },
          },
          `/success`
        );
      }, 2000);
    } catch (e) {
      setSnackBar({
        message: e?.data?.detail ?? "There was an error in creating your event",
        severity: "error",
      });
    }
  };
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, errors, isSubmitting }) => (
        <Stack width="100%">
          <Form>
            <Typography variant="h4" gutterBottom align="center">
              Add Event
            </Typography>
            <Stack
              spacing={3}
              direction={{ lg: "row", xs: "column" }}
              width="100%"
            >
              <Stack spacing={2} width={{ lg: "50%", xs: "100%" }}>
                <Typography variant="h5" gutterBottom align="center">
                  Event Details
                </Typography>
                <FormikTextField name="name" label="Name" />
                <FormikSelect
                  name="duration"
                  label="Duration"
                  options={durationOptions}
                />
                <FormikTextField name="location" label="Location" />
                <FormikTextField
                  name="notes"
                  label="Notes"
                  multiline
                  rows={5}
                />
                <Button
                  variant="contained"
                  type="submit"
                  disabled={isSubmitting || isLoading || isSuccess}
                >
                  Next
                </Button>
              </Stack>
              <Stack spacing={1} width={{ lg: "50%", xs: "100%" }}>
                <UserCalendar
                  selectable
                  onSelectSlot={(selectedDates) => {
                    setFieldValue("available_dates", selectedDates);
                  }}
                />
                {Boolean(errors?.available_dates) && (
                  <Typography variant="body2" color="error">
                    {errors?.available_dates}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Form>
        </Stack>
      )}
    </Formik>
  );
};
