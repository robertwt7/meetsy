import { FunctionComponent, ReactNode, useContext, useState } from "react";
import { SnackBarContext, SnackBar } from "./SnackBar";
import { SnackBarOptions, SnackBarState } from "./types";

interface SnackBarProviderProps {
  children: ReactNode;
}

export const SnackBarProvider: FunctionComponent<SnackBarProviderProps> = ({
  children,
}) => {
  const [snackBarOptions, setSnackBarOptions] = useState<SnackBarOptions>({
    open: false,
    message: "",
    severity: "success",
    autoHideDuration: 5000,
  });

  return (
    <SnackBarContext.Provider value={{ snackBarOptions, setSnackBarOptions }}>
      <SnackBar />
      {children}
    </SnackBarContext.Provider>
  );
};

export const useSnackbar = (): SnackBarState["setSnackBarOptions"] => {
  const { setSnackBarOptions } = useContext(SnackBarContext);

  return setSnackBarOptions;
};

export * from "./types";
