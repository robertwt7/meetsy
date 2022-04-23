import { useRouter } from "next/router";

export enum PageNames {
  INDEX = "Home",
  INVITE = "Invitation",
  MEET = "Meet",
  SUCCESS = "Success",
  THANKYOU = "Thankyou",
  MY_EVENTS = "My Events",
  PRIVACY_POLICY = "Privacy Policy",
}

export enum Route {
  INDEX = "/",
  INVITE = "/invite",
  MEET = "/meet",
  SUCCESS = "/success",
  THANKYOU = "/thankyou",
  MY_EVENTS = "/my-events",
  PRIVACY_POLICY = "/privacy-policy",
}

export const routePageNames: Partial<Record<Route, PageNames>> = {
  [Route.INDEX]: PageNames.INDEX,
  [Route.INVITE]: PageNames.INVITE,
  [Route.MEET]: PageNames.MEET,
  [Route.SUCCESS]: PageNames.SUCCESS,
  [Route.THANKYOU]: PageNames.THANKYOU,
  [Route.THANKYOU]: PageNames.THANKYOU,
  [Route.MY_EVENTS]: PageNames.MY_EVENTS,
  [Route.PRIVACY_POLICY]: PageNames.PRIVACY_POLICY,
};

export const useRoutePageName = (): PageNames | undefined => {
  const { pathname } = useRouter();
  return routePageNames[pathname as Route];
};
