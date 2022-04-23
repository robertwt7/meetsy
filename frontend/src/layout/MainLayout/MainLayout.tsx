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
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="ml-auto mr-auto flex min-h-screen w-full flex-col px-8 md:w-3/5">
        {isUnauthenticated ? (
          <div className="mt-8 w-1/6 self-center">
            <Image src={logo} alt="logo" layout="responsive" />
          </div>
        ) : (
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
                <div className="flex w-full items-center">
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
        )}
        <div className="flex h-full w-full flex-1 flex-col">
          {children}
          <div className="mt-auto mb-0 py-8">
            <Copyright />
          </div>
        </div>
      </div>
    </div>
  );
};
