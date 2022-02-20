import { NextPage } from "next";
import { Typography, Stack, Button } from "@mui/material";
import { useRouter } from "next/router";
import { useSnackBar } from "src";
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

  const handleCopy = (): void => {
    void navigator.clipboard.writeText(url as string);
    setSnackBar({ message: "Copied to clipboard" });
  };

  return (
    <div className="flex flex-col items-center lg:w-1/2 w-3/4">
      <Stack spacing={2}>
        <Typography align="center" variant="h5" color="blue">
          Events created successfully, please share the link below to your
          friends
        </Typography>
        <div className="bg-gray-200 rounded-lg relative">
          <Button variant="outlined" size="small" onClick={handleCopy}>
            Copy
          </Button>
          <Typography
            align="center"
            variant="body1"
            onClick={handleCopy}
            sx={{ margin: "1rem" }}
          >
            {url}
          </Typography>
        </div>
      </Stack>
    </div>
  );
};

export default Success;
