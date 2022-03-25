import {
  IconButton,
  Box,
  List,
  ListItem,
  Drawer,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import clsx, { ClassValue } from "clsx";
import { NextRouter, useRouter } from "next/router";
import { FunctionComponent, HTMLAttributeAnchorTarget } from "react";
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
      </List>
    </Box>
  );
};

export const NavigationList: FunctionComponent<NavigationMenuProps> = ({
  items,
  onSelect,
}) => {
  return (
    <ul className="flex flex-row space-x-8 justify-center items-center">
      {items.map((item) => (
        <NavigationItem key={item.testId} {...item} onSelect={onSelect} />
      ))}
    </ul>
  );
};

const NavigationItem: FunctionComponent<INavigationItemProps & Selectable> = ({
  text,
  testId,
  route,
  target = "_self",
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
          variant="h6"
          fontWeight={`${router.route === route ? "bold" : "normal"}`}
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
      {menuActive && (
        <Drawer anchor="left" open={menuActive} onClose={handleCloseMenu}>
          <NavigationMenu items={items} onSelect={handleCloseMenu} />
        </Drawer>
      )}
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

  const items: INavigationItemProps[] = [
    {
      text: "Home",
      testId: "home",
      route: Route.INDEX,
    },
    {
      text: "Meet",
      testId: "meet",
      route: Route.MEET,
    },
  ];

  return (
    <>
      <nav className="w-full flex flex-row items-center justify-center">
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
