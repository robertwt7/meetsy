import {
  IconButton,
  Box,
  List,
  ListItem,
  Drawer,
  Typography,
  useTheme,
  useMediaQuery,
  Button,
  ListItemButton,
} from "@mui/material";
import { Variant } from "@mui/material/styles/createTypography";
import MenuIcon from "@mui/icons-material/Menu";
import clsx, { ClassValue } from "clsx";
import { NextRouter, useRouter } from "next/router";
import { FunctionComponent, HTMLAttributeAnchorTarget } from "react";
import { signOut, useSession } from "next-auth/react";
import { Link } from "..";
import { Route } from "../../config/router";

interface NavigationProps {
  onMenuToggle?: () => void;
  menuActive?: boolean;
  handleCloseMenu?: () => void;
}

export interface INavigationItemProps {
  text: string;
  testId: string;
  route: Route;
  target?: HTMLAttributeAnchorTarget;
  textVariant?: Variant;
}

interface MenuToggleProps {
  handleToggleMenu: () => void;
}

interface NavigationMenuWithToggleProps {
  items: INavigationItemProps[];
  onMenuToggle: () => void;
  handleCloseMenu: () => void;
  menuActive: boolean;
}

interface Selectable {
  onSelect?: () => void;
}

interface NavigationMenuProps extends Selectable {
  items: INavigationItemProps[];
}

interface NavigationListProps extends Selectable {
  items: INavigationItemProps[];
  textVariant?: Variant;
}

export const NavigationMenu: FunctionComponent<NavigationMenuProps> = ({
  items,
  onSelect,
}) => {
  return (
    <Box sx={{ width: 250 }} role="presentation">
      <List>
        {items.map((item) => (
          <ListItem button key={item.route} onClick={onSelect}>
            <NavigationItem
              text={item.text}
              testId={item.testId}
              route={item.route}
            />
          </ListItem>
        ))}
        <ListItemButton key="signOut" onClick={onSelect}>
          <Button
            variant="outlined"
            // eslint-disable-next-line @typescript-eslint/promise-function-async
            onClick={() => signOut()}
          >
            Sign out
          </Button>
        </ListItemButton>
      </List>
    </Box>
  );
};

export const NavigationList: FunctionComponent<NavigationListProps> = ({
  items,
  onSelect,
  textVariant = "h6",
}) => {
  return (
    <ul className="flex flex-row items-center justify-center space-x-8 pl-0">
      {items.map((item) => (
        <NavigationItem
          key={item.testId}
          {...item}
          onSelect={onSelect}
          textVariant={textVariant}
        />
      ))}
    </ul>
  );
};

const NavigationItem: FunctionComponent<INavigationItemProps & Selectable> = ({
  text,
  testId,
  route,
  target = "_self",
  textVariant = "h6",
}) => {
  const router: NextRouter = useRouter();
  const classNames: ClassValue = clsx("w-full list-none");

  return (
    <li data-testid={testId} className={classNames}>
      <Link
        href={route}
        target={target}
        data-testid={`${testId}-a`}
        underline="hover"
      >
        <Typography
          variant={textVariant}
          fontWeight={`${router.route === route ? "bold" : "normal"}`}
          noWrap
        >
          {text}
        </Typography>
      </Link>
    </li>
  );
};

const MenuToggle: FunctionComponent<MenuToggleProps> = ({
  handleToggleMenu,
}): JSX.Element => {
  return (
    <IconButton
      onClick={() => handleToggleMenu()}
      data-testid="menu-toggle"
      aria-label="Toggle"
    >
      <MenuIcon />
    </IconButton>
  );
};

const NavigationMenuWithToggle: FunctionComponent<
  NavigationMenuWithToggleProps
> = ({
  items,
  onMenuToggle = () => {},
  handleCloseMenu = () => {},
  menuActive,
}): JSX.Element => {
  return (
    <>
      <MenuToggle handleToggleMenu={onMenuToggle} />
      <Drawer anchor="left" open={menuActive} onClose={handleCloseMenu}>
        <NavigationMenu items={items} onSelect={handleCloseMenu} />
      </Drawer>
    </>
  );
};

export const Navigation: FunctionComponent<NavigationProps> = ({
  onMenuToggle = () => {},
  menuActive,
  handleCloseMenu = () => {},
}) => {
  const theme = useTheme();
  const isBpMediumUp: boolean = useMediaQuery(theme.breakpoints.up("md"));
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";

  let items: INavigationItemProps[] = [
    {
      text: "Home",
      testId: "home",
      route: Route.INDEX,
    },
    {
      text: "About",
      testId: "about",
      route: Route.ABOUT,
    },
    {
      text: "Github",
      testId: "github",
      route: Route.GITHUB,
    },
  ];

  if (isAuthenticated) {
    items = [
      ...items,
      {
        text: "My Events",
        testId: "my-events",
        route: Route.MY_EVENTS,
      },
      {
        text: "Create a Meet",
        testId: "meet",
        route: Route.MEET,
      },
    ];
  }

  return (
    <>
      <nav className="flex w-full flex-row items-center justify-center">
        {isBpMediumUp ? (
          <NavigationList items={items} />
        ) : (
          <NavigationMenuWithToggle
            items={items}
            menuActive={menuActive ?? false}
            onMenuToggle={onMenuToggle}
            handleCloseMenu={handleCloseMenu}
          />
        )}
      </nav>
    </>
  );
};
