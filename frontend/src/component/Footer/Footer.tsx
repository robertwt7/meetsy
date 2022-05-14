import { FunctionComponent } from "react";
import { Route } from "src/config/router";
import { NavigationList, INavigationItemProps } from "../Navigation";
import { Copyright } from "../Copyright";

export const Footer: FunctionComponent = () => {
  const items: INavigationItemProps[] = [
    {
      text: "Privacy Policy",
      testId: "privacypolicy",
      route: Route.PRIVACY_POLICY,
    },
    {
      text: "Terms of Service",
      testId: "termsOfService",
      route: Route.TERMS_OF_SERVICE,
    },
  ];
  return (
    <div className="flex flex-col">
      <Copyright />
      <div className="flex flex-row justify-center">
        <NavigationList items={items} textVariant="body1" />
      </div>
    </div>
  );
};
