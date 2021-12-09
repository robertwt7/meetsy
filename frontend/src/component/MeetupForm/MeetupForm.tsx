import type { FunctionComponent } from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { FormikTextField } from "src/form";

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  location: yup.string(),
  notes: yup.string(),
  timeStart: yup.string().required("Time is required"),
  timeEnd: yup.string().required("Time is required"),
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
      <Form>
        <FormikTextField name="name" label="Name" />
        <FormikTextField name="location" label="Location" />
        <FormikTextField name="notes" label="Notes" multiline rows={5} />
        <FormikTextField name="name" label="Name" />
        <FormikTextField name="name" label="Name" />
      </Form>
    </Formik>
  );
};
