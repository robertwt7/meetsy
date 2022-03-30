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
    <div className="flex-1 flex flex-col w-full items-center justify-center mx-2">
      <SuccessPanel url={url as string} />
    </div>
  );
};

export default Success;
