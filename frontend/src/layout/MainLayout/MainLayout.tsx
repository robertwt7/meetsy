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
    : "w-full flex flex-row justify-between my-8";

  // TODO: readjust navigation on mobile
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex flex-col ml-auto mr-auto px-8 md:w-3/5 min-h-screen w-full">
        <div className={navigationClassName}>
          <div className="w-1/6">
            <Image src={logo} alt="logo" layout="responsive" />
          </div>
          <div className="ml-auto mr-0">
            <Navigation />
          </div>
        </div>
        <div className="w-full h-full flex-1 flex flex-col">
          {children}
          <div className="py-8 mt-auto mb-0">
            <Copyright />
          </div>
        </div>
      </div>
    </div>
  );
};
