import { FunctionComponent } from "react";
import { Paper, Typography } from "@mui/material";
import { useGetInvitedEventQuery, UserCalendar } from "src";
import PersonIcon from "@mui/icons-material/Person";
import { mapDatesToCalendarObject } from "./utils";

interface AcceptFormProps {
  url: string;
}
export const AcceptForm: FunctionComponent<AcceptFormProps> = ({ url }) => {
  const { data, isFetching, isError, error } = useGetInvitedEventQuery(url);

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
          <div className="w-3/4 border-l p-4 border-gray-300">
            <UserCalendar
              selectable={false}
              availableDates={mapDatesToCalendarObject(data?.available_dates)}
            />
          </div>
        </div>
      </Paper>
    </div>
  ) : null;
};
