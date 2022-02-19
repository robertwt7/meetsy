import { AlertColor } from "@mui/material";
import { Dispatch, SetStateAction } from "react";

export interface SnackBarState {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  message: string;
  severity: AlertColor;
}
