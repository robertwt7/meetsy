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
    <div className="mx-2 flex flex-1 flex-col items-center justify-center px-4 md:px-0">
      <div className="w-full md:w-2/3">
        <SuccessPanel url={url as string} />
      </div>
    </div>
  );
};

export default Success;
