import { FunctionComponent, ReactNode, useContext, useState } from "react";
import { SnackBarContext, SnackBar } from "./SnackBar";
import { SetSnackBarFn, SnackBarOptions } from "./types";

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
  });

  return (
    <SnackBarContext.Provider value={{ snackBarOptions, setSnackBarOptions }}>
      <SnackBar />
      {children}
    </SnackBarContext.Provider>
  );
};

export const useSnackbar = (): SetSnackBarFn => {
  const { setSnackBarOptions } = useContext(SnackBarContext);

  return setSnackBarOptions;
};

export * from "./types";
