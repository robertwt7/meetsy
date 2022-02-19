import React, { FunctionComponent, useContext } from "react";
import { Snackbar, Alert } from "@mui/material";
import { SnackBarState } from "./types";

export const SnackBarContext = React.createContext<SnackBarState>({
  open: false,
  setOpen: () => {},
  message: "",
  severity: "success",
});

export const SnackBar: FunctionComponent = () => {
  const { open, setOpen, message, severity } = useContext(SnackBarContext);

  const handleClose = (): void => {
    setOpen(false);
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
