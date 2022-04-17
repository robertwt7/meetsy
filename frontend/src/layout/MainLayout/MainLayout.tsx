import { FunctionComponent, useState } from "react";
import { Button, useMediaQuery, useTheme } from "@mui/material";
import { Copyright } from "src";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import logo from "public/images/meetsy_logo.png";
import { useRouter } from "next/router";
import { Navigation } from "../../component";

const hiddenNavigation = ["/invite"];

export const MainLayout: FunctionComponent = ({ children }) => {
  const { status } = useSession();
  const isUnauthenticated = status !== "authenticated";
  const router = useRouter();
  const shouldHideNavigation = hiddenNavigation.includes(router.route);
  const navigationClassName =
    isUnauthenticated || shouldHideNavigation
      ? "hidden"
      : "w-full flex flex-row justify-between my-8 items-center";
  const theme = useTheme();
  const isBpMediumUp: boolean = useMediaQuery(theme.breakpoints.up("md"));
  const [menuActive, setMenuActive] = useState(false);

  const handleMenuToggle = (): void => {
    setMenuActive(!menuActive);
  };

  const handleCloseMenu = (): void => {
    setMenuActive(false);
  };
  return (
    <div className="w-full min-h-screen flex flex-col items-center">
      <div className="flex flex-col ml-auto mr-auto px-8 md:w-3/5 min-h-screen w-full">
        <div className={navigationClassName}>
          <div className="w-1/6">
            <Image src={logo} alt="logo" layout="responsive" />
          </div>
          <div className="ml-auto mr-0 flex flex-row space-x-8">
            <Navigation
              menuActive={menuActive}
              onMenuToggle={handleMenuToggle}
              handleCloseMenu={handleCloseMenu}
            />
            {isBpMediumUp && (
              <div className="w-full flex items-center">
                <Button
                  variant="outlined"
                  // eslint-disable-next-line @typescript-eslint/promise-function-async
                  onClick={() => signOut()}
                >
                  Sign out
                </Button>
              </div>
            )}
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
