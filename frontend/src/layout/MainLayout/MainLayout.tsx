import { FunctionComponent } from "react";
import { Copyright } from "src";
import Image from "next/image";
import logo from "public/images/meetsy_logo.png";
import { useSession } from "next-auth/react";
import { Navigation } from "../../component";

export const MainLayout: FunctionComponent = ({ children }) => {
  const { status } = useSession();
  const isAuthenticated = status !== "authenticated";
  const navigationClassName = isAuthenticated
    ? "hidden"
    : "lg:w-1/6 lg:flex lg:flex-col lg:items-center h-full";

  const contentClassName = isAuthenticated ? "w-full" : "w-full lg:w-5/6";
  // TODO: readjust navigation on mobile
  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center">
      <div className="flex lg:flex-row flex-col ml-auto mr-auto px-8 md:w-3/5 space-x-8">
        <div className={navigationClassName}>
          <Image src={logo} alt="logo" />
          <Navigation />
        </div>
        <div className={contentClassName}>
          {children}
          <div className="my-8">
            <Copyright />
          </div>
        </div>
      </div>
    </div>
  );
};
