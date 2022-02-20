import { FunctionComponent, ReactNode, useContext, useState } from "react";
import { SnackBarContext, SnackBar } from "./SnackBar";
import { SnackBarOptions, SetSnackBarFn } from "./types";

interface SnackBarProviderProps {
  children: ReactNode;
}

const defaultOption: SnackBarOptions = {
  open: false,
  message: "",
  severity: "success",
  autoHideDuration: 5000,
};

export const SnackBarProvider: FunctionComponent<SnackBarProviderProps> = ({
  children,
}) => {
  const [snackBarOptions, setSnackBarOptions] =
    useState<SnackBarOptions>(defaultOption);

  return (
    <SnackBarContext.Provider value={{ snackBarOptions, setSnackBarOptions }}>
      <SnackBar />
      {children}
    </SnackBarContext.Provider>
  );
};

export const useSnackBar = (): SetSnackBarFn => {
  const { setSnackBarOptions } = useContext(SnackBarContext);

  return (options: SnackBarOptions) => {
    setSnackBarOptions({
      ...defaultOption,
      open: true,
      ...options,
    });
  };
};

export * from "./types";
