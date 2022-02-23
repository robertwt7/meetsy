import { FunctionComponent } from "react";
import { Paper, Typography } from "@mui/material";
import { useGetInvitedEventQuery } from "src";

interface AcceptFormProps {
  url: string;
}
export const AcceptForm: FunctionComponent<AcceptFormProps> = ({ url }) => {
  const { data, isFetching, isError, error } = useGetInvitedEventQuery(url);

  // TODO: check if there is any error in the query
  return (
    <div className="flex flex-row w-full">
      <Paper className="w-full">
        <div className="flex flex-row items-center">
          <div className="w-1/4">
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
          <div className="w-3/4 border-l h-full p-4 border-gray-300">
            <Typography variant="body1" sx={{ marginLeft: 2 }}>
              Event calendar here
            </Typography>
          </div>
        </div>
      </Paper>
    </div>
  );
};
