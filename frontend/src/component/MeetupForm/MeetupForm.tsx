import type { FunctionComponent } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { FormikTextField } from "src/form";
import { Stack, Button, Typography } from "@mui/material";
import { UserCalendar } from "src/component";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  location: yup.string(),
  notes: yup.string(),
  selectedTimes: yup
    .array()
    .min(1, "Please select at least 1 time slot")
    .required("Required"),
});

const initialValues = {
  name: "",
  location: "",
  notes: "",
  selectedTimes: [],
};

export const MeetupForm: FunctionComponent = () => {
  const handleSubmit = (): void => { };
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
                <Button variant="contained">Next</Button>
              </Stack>
              <Stack spacing={1} width={{ lg: "50%", xs: "100%" }}>
                <UserCalendar
                  selectable
                  onSelect={(selectedDates) =>
                    setFieldValue("selectedTimes", selectedDates)
                  }
                />
                {Boolean(errors?.selectedTimes) && (
                  <Typography variant="body2" color="error">
                    {errors?.selectedTimes}
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
