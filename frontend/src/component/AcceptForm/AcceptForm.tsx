import { FunctionComponent } from "react";
import { useGetInvitedEventQuery } from "src";

interface AcceptFormProps {
  url: string;
}
export const AcceptForm: FunctionComponent<AcceptFormProps> = ({ url }) => {
  const { data, isFetching, isError, error } = useGetInvitedEventQuery(url);

  // TODO: check if there is any error in the query
  console.log(data);
  return <div>AcceptForm</div>;
};
