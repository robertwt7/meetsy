import { NextPage } from "next";
import ErrorImage from "src/assets/404_error.svg";
import Image from "next/image";

const Error: NextPage = () => {
  return (
    <div className="m-auto w-4/5 max-w-screen-md">
      <Image src={ErrorImage} alt="error" layout="responsive" />
    </div>
  );
};

export default Error;
