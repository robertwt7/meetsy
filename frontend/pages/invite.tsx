import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackBar } from "src";
import { useEffect } from "react";
import { AcceptForm } from "src/component/AcceptForm";

const Invite: NextPage = () => {
  const router = useRouter();
  const setSnackBar = useSnackBar();
  const url = router.query?.url ?? "";

  useEffect(() => {
    /**
     * on first load, url is always undefined in nextjs: https://github.com/vercel/next.js/discussions/11484
     */
    if (url === "") {
      setSnackBar({ message: "Invalid signed url", severity: "error" });
      setTimeout(() => {
        void router.push("/");
      }, 3000);
    }
  }, [router, url]);

  return (
    <div className="flex flex-col md:items-center lg:w-1/2 w-3/4">
      <AcceptForm url={url as string} />
    </div>
  );
};

export default Invite;
