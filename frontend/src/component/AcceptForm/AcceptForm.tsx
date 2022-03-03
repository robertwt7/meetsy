import { FunctionComponent, useState } from "react";
import { Paper, Typography, Button } from "@mui/material";
import { useGetInvitedEventQuery } from "src";
import PersonIcon from "@mui/icons-material/Person";
import CalendarPicker from "@mui/lab/CalendarPicker";
import dayjs from "dayjs";
import { AvailableSpot } from "src/services/backend/model";
import type { Dayjs } from "dayjs";
import { FormikSelect, FormikSelectOptions } from "src/form";
import { Formik, Form } from "formik";
import * as yup from "yup";

interface AcceptFormProps {
  url: string;
}

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required"),
  notes: yup.string(),
  email: yup.string().email().required("Email is required"),
  spots: yup.string().required("Spots is required"),
});

const initialValues = {
  spots: "",
  name: "",
  email: "",
  notes: "",
};

export const AcceptForm: FunctionComponent<AcceptFormProps> = ({ url }) => {
  const { data, isFetching, isError, error } = useGetInvitedEventQuery(url);
  const [date, setDate] = useState<Dayjs | null>(dayjs(new Date()));
  const availableDates = data?.spots != null ? Object.keys(data?.spots) : [];
  const [options, setOptions] = useState<AvailableSpot[] | null>(null);

  const shouldDisableDate = (newDate: Dayjs): boolean => {
    // If not in available dates then we should disable it
    const parsedDate = dayjs(newDate).format("YYYY-MM-DD");

    return !availableDates.includes(parsedDate);
  };

  const handleChangedate = (newDate: Dayjs | null): void => {
    setDate(newDate);

    const parsedDate = dayjs(newDate).format("YYYY-MM-DD");
    const spots = data?.spots ?? null;
    const availableSpots = spots?.[parsedDate] ?? null;
    setOptions(availableSpots);
  };

  const handleSubmit = (): void => {};

  // TODO: check if there is any error in the query
  return !isFetching ? (
    <div className="flex flex-row w-full">
      <Paper className="w-full">
        <div className="flex flex-row items-stretch">
          <div className="w-1/4">
            <div className="flex flex-row space-x-4 m-4 mb-2 items-center">
              <PersonIcon />
              <Typography variant="h5">
                {data?.user?.first_name} {data?.user?.last_name}
              </Typography>
            </div>
            <Typography variant="h6" className="ml-4">
              {data?.user?.email}
            </Typography>
            <Typography variant="h4" className="m-4 mb-2">
              {data?.name}
            </Typography>
            <Typography variant="body1" className="ml-4 m-2">
              {data?.location}
            </Typography>
            <Typography variant="body2" className="ml-4 m-2">
              {data?.notes}
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
              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                <Form>
                  <div className="flex flex-col">
                    <FormikSelect
                      options={(options as FormikSelectOptions) ?? []}
                      name="spot"
                      label="Spot"
                      valueKey="start"
                      nameKey="startTime"
                    />
                    <div className="mt-8 w-full">
                      <Button
                        type="submit"
                        variant="contained"
                        className="w-full"
                      >
                        Confirm
                      </Button>
                    </div>
                  </div>
                </Form>
              </Formik>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  ) : null;
};
