import type { FunctionComponent } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { FormikTextField, FormikDateTimePicker } from "src/form";
import { Stack, Button, Typography } from "@mui/material";
import { UserCalendar } from "src/component";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  location: yup.string(),
  notes: yup.string(),
  timeStart: yup.string().required("Start Time is required"),
  timeEnd: yup.string().required("End Time is required"),
});

const initialValues = {
  name: "",
  location: "",
  notes: "",
  timeStart: "",
  timeEnd: "",
};

export const MeetupForm: FunctionComponent = () => {
  const handleSubmit = (): void => { };
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
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
              <FormikTextField name="notes" label="Notes" multiline rows={5} />
              <FormikDateTimePicker
                name="timeStart"
                label="Start Time"
                className="w-full"
              />
              <FormikDateTimePicker name="timeEnd" label="End Time" />
              <Button variant="contained">Next</Button>
            </Stack>
            <UserCalendar />
          </Stack>
        </Form>
      </Stack>
    </Formik>
  );
};
