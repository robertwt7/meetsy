import { FunctionComponent } from "react";
import { Copyright } from "src";

export const MainLayout: FunctionComponent = ({ children }) => {
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      {children}
      <div className="my-8">
        <Copyright />
      </div>
    </div>
  );
};
