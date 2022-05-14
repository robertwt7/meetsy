import { FunctionComponent, MouseEvent, useState } from "react";
import {
  useMediaQuery,
  useTheme,
  Popover,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import logo from "public/images/meetsy_logo.png";
import { Footer } from "src/component/Footer";
import { useRouter } from "next/router";
import { Link, Navigation } from "../../component";

const hiddenNavigation = ["/invite"];

export const MainLayout: FunctionComponent = ({ children }) => {
  const { data, status } = useSession();
  const isUnauthenticated = status !== "authenticated";
  const router = useRouter();
  const shouldHideNavigation = hiddenNavigation.includes(router.route);
  const navigationClassName =
    isUnauthenticated || shouldHideNavigation
      ? "hidden"
      : "w-full flex flex-row justify-between my-8 items-center px-8";
  const theme = useTheme();
  const isBpMediumUp: boolean = useMediaQuery(theme.breakpoints.up("md"));
  const [menuActive, setMenuActive] = useState(false);
  const [profilePopover, setProfilePopover] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClose = (): void => {
    setProfilePopover(false);
    setAnchorEl(null);
  };

  const handleClick = (event: MouseEvent<HTMLButtonElement>): void => {
    setAnchorEl(event.currentTarget);
    setProfilePopover(true);
  };

  const handleMenuToggle = (): void => {
    setMenuActive(!menuActive);
  };

  const handleCloseMenu = (): void => {
    setMenuActive(false);
  };
  return (
    <div className="flex min-h-screen w-full flex-col items-center">
      <div className="ml-auto mr-auto flex min-h-screen w-full flex-col">
        {isUnauthenticated ? (
          <div className="mt-8 w-1/2 self-center md:w-1/6">
            <Link href="/">
              <Image src={logo} alt="logo" layout="responsive" />
            </Link>
          </div>
        ) : (
          <div className={navigationClassName}>
            <div className="w-1/3 md:w-[10%]">
              <Link href="/">
                <Image src={logo} alt="logo" layout="responsive" />
              </Link>
            </div>
            <div className="ml-auto mr-0 flex flex-row space-x-8">
              <Navigation
                menuActive={menuActive}
                onMenuToggle={handleMenuToggle}
                handleCloseMenu={handleCloseMenu}
              />
              {isBpMediumUp && (
                <div className="flex w-full items-center">
                  <Typography
                    variant="h6"
                    className="cursor-pointer text-primary hover:underline"
                    onClick={handleClick}
                  >
                    {data?.user?.name}
                  </Typography>

                  <Popover
                    open={profilePopover}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                  >
                    <List>
                      <ListItemButton
                        onClick={
                          // eslint-disable-next-line @typescript-eslint/promise-function-async
                          () => signOut()
                        }
                      >
                        Sign out
                      </ListItemButton>
                    </List>
                  </Popover>
                </div>
              )}
            </div>
          </div>
        )}
        <div className="flex h-full w-full flex-1 flex-col">
          {children}
          <div className="mt-auto mb-0 py-8">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};
