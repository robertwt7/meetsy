import { useGetMeetsyEventsQuery } from "src/services/backend";
import { FunctionComponent } from "react";

export const MyEventsPanel: FunctionComponent = () => {
  const { data, loading, error } = useGetMeetsyEventsQuery({});
  return <div>MyEventsPanel</div>;
};
