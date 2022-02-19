import { FunctionComponent, ReactNode, useState } from "react";
import { SnackBarContext, SnackBar } from "./SnackBar";

interface SnackBarProviderProps {
  children: ReactNode;
}

export const SnackBarProvider: FunctionComponent<SnackBarProviderProps> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <SnackBarContext.Provider value={{ open, setOpen }}>
      <SnackBar />
      {children}
    </SnackBarContext.Provider>
  );
};
