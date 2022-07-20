import { useRouter } from "next/router";
import { protectedRoute } from "src/config/router";
import { FunctionComponent, useEffect } from "react";
import { useSession } from "next-auth/react";

export const Auth: FunctionComponent = ({ children }) => {
  const { status } = useSession();
  const isNotAuthenticated = status === "unauthenticated";
  const router = useRouter();

  useEffect(() => {
    if (isNotAuthenticated && protectedRoute.includes(router.pathname)) {
      void router.push("/signin");
    }
  }, [isNotAuthenticated, router, status]);

  return <>{children}</>;
};
