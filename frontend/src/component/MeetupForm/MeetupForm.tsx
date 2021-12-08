import Typography from "@mui/material/Typography";
import MuiLink from "@mui/material/Link";
import type { FunctionComponent } from "react";
import { FormikTextField } from "src/form"
import { Form, Formik } from "formik"
import * as yup from "yup"

const validationSchema = yup.object().shape({
	name: yup.string().required("Name is required"),
	location: yup.string(),
	notes: yup.string(),
	timeStart: yup.string().required("Time is required"),
	timeEnd: yup.string().required("Time is required"),
})

const initialValues = {
	name: "",
	location: "",
	notes: "",
	timeStart: "",
	timeEnd: "",
}

export const MeetupForm: FunctionComponent = () => {
	const handleSubmit = (): void => {

	}
	return (
		<Formik onSubmit={handleSubmit} initialValues={initialValues} validationSchema={validationSchema}>
			<Form>

			</Form>
		</Formik>
	);
};
