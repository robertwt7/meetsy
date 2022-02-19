import { AlertColor } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export interface SnackBarState {
  setSnackBarOptions: Dispatch<SetStateAction<SnackBarOptions>>;
  snackBarOptions: SnackBarOptions;
}

export interface SnackBarOptions {
  open: boolean;
  message: string;
  severity: AlertColor;
}

export type SetSnackBarFn = (options: SnackBarOptions) => void;
