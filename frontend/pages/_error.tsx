import { NextPage } from "next";
import { Typography } from "@mui/material";
import { common } from "@mui/material/colors";
import { Link } from "src/component/Link";
import ErrorImage from "src/assets/404_error.svg";
import Image from "next/image";

const Error: NextPage = () => {
  return (
    <div className="m-auto w-4/5 max-w-screen-md">
      <Typography
        variant="h4"
        align="center"
        color={common.black}
        fontWeight="bold"
      >
        Page Not Found!
      </Typography>
      <Typography className="mt-0.5 mb-3" variant="h6" align="center">
        <Link href="/">Back to Home</Link>
      </Typography>
      <Image src={ErrorImage} alt="error" layout="responsive" />
    </div>
  );
};

export default Error;
