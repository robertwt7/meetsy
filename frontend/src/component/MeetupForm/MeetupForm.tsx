/* eslint-disable camelcase */
import type { FunctionComponent } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { FormikTextField } from "src/form";
import { Stack, Button, Typography } from "@mui/material";
import { UserCalendar } from "src/component";
import { DateRange } from "../UserCalendar";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  location: yup.string(),
  notes: yup.string(),
  selectedTimes: yup
    .array()
    .min(1, "Please select at least 1 time slot")
    .required("Required"),
});

const initialValues: InitialValuesType = {
  name: "",
  location: "",
  notes: "",
  available_dates: [],
};

interface InitialValuesType {
  name: string;
  location: string;
  notes: string;
  available_dates: DateRange[];
}

export const MeetupForm: FunctionComponent = () => {
  const handleSubmit = (values: InitialValuesType): void => {
    const localTimezone =
      Intl.DateTimeFormat().resolvedOptions().timeZone ?? "Greenwich";
    const processedValues = {
      ...values,
      available_dates: values.available_dates.map((item) => ({
        ...item,
        start: {
          ...item.start,
          dateTime: item.start.dateTime.toISOString(),
          timeZone: localTimezone,
        },
        end: {
          ...item.end,
          dateTime: item.end.dateTime.toISOString(),
          timeZone: localTimezone,
        },
      })),
    };
  };
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {({ setFieldValue, errors }) => (
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
                  Select your available time slot
                </Typography>
                <FormikTextField name="name" label="Name" />
                <FormikTextField name="location" label="Location" />
                <FormikTextField
                  name="notes"
                  label="Notes"
                  multiline
                  rows={5}
                />
                <Button variant="contained" type="submit">
                  Next
                </Button>
              </Stack>
              <Stack spacing={1} width={{ lg: "50%", xs: "100%" }}>
                <UserCalendar
                  selectable
                  onSelect={(selectedDates) =>
                    setFieldValue("available_dates", selectedDates)
                  }
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
