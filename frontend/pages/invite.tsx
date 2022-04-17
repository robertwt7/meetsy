import { NextPage } from "next";
import { useRouter } from "next/router";
import { useSnackBar } from "src";
import { useEffect } from "react";
import { AcceptForm } from "src/component/AcceptForm";

const Invite: NextPage = () => {
  const router = useRouter();
  const setSnackBar = useSnackBar();
  const url = router.query?.url ?? "";
  const urlUnsafe = router.isReady && url === "";

  useEffect(() => {
    /**
     * on first load, url is always undefined in nextjs: https://github.com/vercel/next.js/discussions/11484
     */
    if (urlUnsafe) {
      setSnackBar({ message: "Invalid signed url", severity: "error" });
      setTimeout(() => {
        void router.push("/");
      }, 3000);
    }
  }, [urlUnsafe]);

  return router.isReady ? (
    <div className="flex flex-col md:items-center w-full flex-1 justify-center">
      <AcceptForm url={url as string} />
    </div>
  ) : null;
};

export default Invite;
