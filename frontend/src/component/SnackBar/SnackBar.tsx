import React, { FunctionComponent, useContext } from "react";
import { Snackbar, Alert } from "@mui/material";
import { SnackBarState } from "./types";

export const SnackBarContext = React.createContext<SnackBarState>({
  setSnackBarOptions: () => {},
  snackBarOptions: {
    open: false,
    message: "",
    severity: "success",
  },
});

export const SnackBar: FunctionComponent = () => {
  const { setSnackBarOptions, snackBarOptions } = useContext(SnackBarContext);
  const { open, severity, message } = snackBarOptions;
  const handleClose = (): void => {
    setSnackBarOptions({
      ...snackBarOptions,
      open: false,
    });
  };
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};
