import { NextPage } from "next";
import { useRouter } from "next/router";
import { SuccessPanel, useSnackBar } from "src";
import { useEffect } from "react";

const Success: NextPage = () => {
  const router = useRouter();
  const setSnackBar = useSnackBar();
  const url = router.query?.url ?? "";

  useEffect(() => {
    if (url === "") {
      setSnackBar({ message: "Invalid signed url", severity: "error" });
      setTimeout(() => {
        void router.push("/");
      }, 3000);
    }
  }, [router, url]);

  return (
    <div className="flex flex-col md:items-center lg:w-1/2 w-3/4">
      <SuccessPanel url={url as string} />
    </div>
  );
};

export default Success;
