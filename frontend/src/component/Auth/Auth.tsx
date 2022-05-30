import { useRouter } from "next/router";
import { protectedRoute } from "src/config/router";
import { FunctionComponent, useEffect } from "react";
import { useSession } from "next-auth/react";

export const Auth: FunctionComponent = ({ children }) => {
  const { status } = useSession();
  const isAuthenticated = status === "authenticated";
  const router = useRouter();

  useEffect(() => {
    if (!isAuthenticated && protectedRoute.includes(router.pathname)) {
      void router.push("/signin");
    }
  }, [isAuthenticated, router]);

  return <>{children}</>;
};
