import {
  MeetsyEventResponse,
  useGetMeetsyEventsQuery,
  useDeleteMeetsyEventMutation,
} from "src/services/backend";
import { app } from "src/env";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
} from "@mui/material";
import dayjs from "dayjs";
import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { useSnackBar } from "../SnackBar";

export const MyEventsPanel: FunctionComponent = () => {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(0);
  const {
    data,
    isError: isGetEventsError,
    isLoading: isGetEventsLoading,
  } = useGetMeetsyEventsQuery();
  const [
    deleteMeetsyEvent,
    {
      isError: isDeleteError,
      isLoading: isDeleteLoading,
      isSuccess: isDeleteSuccess,
    },
  ] = useDeleteMeetsyEventMutation();
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

  const handleDeleteClicked = (id: number) => (): void => {
    setSelectedEvent(id);
    setDeleteModalOpen(true);
  };

  const handleDelete = async (): Promise<void> => {
    await deleteMeetsyEvent(selectedEvent);
  };

  useEffect(() => {
    if (isDeleteSuccess) {
      setSnackBar({ message: "Event deleted" });
      setDeleteModalOpen(false);
    }

    if (isDeleteError) {
      setSnackBar({
        message: "There is a problem with deleting this event",
        severity: "error",
      });
    }
  }, [isDeleteError, isDeleteSuccess]);

  return !isGetEventsLoading && !isGetEventsError ? (
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
              <Button
                size="small"
                color="error"
                disabled={!event?.pending}
                onClick={handleDeleteClicked(event?.id)}
              >
                Delete Event
              </Button>
            </CardActions>
          </Card>
        </div>
      ))}
      <Dialog
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <DialogTitle id="delete-modal-title">
          <Typography id="delete-modal-title" variant="h6">
            Delete Event?
          </Typography>
        </DialogTitle>
        <DialogContent id="delete-modal-description">
          <Typography id="delete-modal-description">
            Are you sure? This is irreversible
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteModalOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            disabled={isDeleteLoading}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  ) : null;
};
