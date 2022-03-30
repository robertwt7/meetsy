import {
  MeetsyEventResponse,
  useGetMeetsyEventsQuery,
} from "src/services/backend";
import { app } from "src/env";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { FunctionComponent, ReactNode } from "react";
import { useSnackBar } from "../SnackBar";

export const MyEventsPanel: FunctionComponent = () => {
  const { data, isError, isLoading } = useGetMeetsyEventsQuery();
  const setSnackBar = useSnackBar();

  const renderStatus = (event: MeetsyEventResponse): ReactNode => {
    const expired = dayjs().isAfter(dayjs(event.expiry));
    let text = "Pending";
    let color = "text.secondary";

    if (!event?.pending) {
      text = "Accepted";
      color = "success.contrastText";
    } else if (expired) {
      text = "Expired";
      color = "error";
    }

    return (
      <Typography className="mb-2">
        Status:{" "}
        <Typography display="inline" color={color}>
          {text}
        </Typography>
      </Typography>
    );
  };

  const handleCopy = (url: string) => (): void => {
    const inviteUrl = `${app.APP_URL}/invite/?url=${url}`;
    navigator.clipboard.writeText(inviteUrl);
    setSnackBar({ message: "Copied to clipboard" });
  };

  return !isLoading && !isError ? (
    <div className="grid md:grid-cols-4 grid-cols-2 gap-4">
      {data?.results.map((event) => (
        <div className="h-full">
          <Card className="h-full flex flex-col">
            <CardContent className="flex-1">
              <Typography variant="h5" component="div">
                {event?.name}
              </Typography>
              {event?.location !== "" && event?.location !== null && (
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {event?.location}
                </Typography>
              )}
              {renderStatus(event)}
              {event?.pending && (
                <Typography className="mb-2">
                  Expiry: {dayjs(event?.expiry).format("DD MMM YYYY HH:mm")}
                </Typography>
              )}

              {event?.selected_time !== null && (
                <Typography className="mb-2">
                  Selected Time:{" "}
                  {dayjs(event?.selected_time).format("DD MMM YYYY HH:mm")}
                </Typography>
              )}

              <Typography variant="body2">{event?.notes}</Typography>
            </CardContent>
            <CardActions>
              <Button
                size="small"
                color="primary"
                disabled={
                  !event?.pending || dayjs().isAfter(dayjs(event.expiry))
                }
                onClick={handleCopy(event?.invite_url)}
              >
                Copy URL
              </Button>
              <Button size="small" color="error" disabled={!event?.pending}>
                Delete Event
              </Button>
            </CardActions>
          </Card>
        </div>
      ))}
    </div>
  ) : null;
};
