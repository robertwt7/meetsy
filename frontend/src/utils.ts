import axios from "axios";
import jwt from "jsonwebtoken";
import { VERIFY_TOKEN_URL, REFRESH_TOKEN_URL } from "./api";

export const checkAccessTokenValidity = async (
  accessToken: string
): Promise<boolean> => {
  try {
    const response = await axios.post(VERIFY_TOKEN_URL, {
      token: accessToken,
    });

    return true;
  } catch {
    return false;
  }
};

type RefreshResponse = [access: string | null, refresh: string | null];
export const refreshTokenRequest = async (
  refreshToken: string
): Promise<RefreshResponse> => {
  try {
    const response = await axios.post(REFRESH_TOKEN_URL, {
      refresh: refreshToken,
    });

    const { access, refresh } = response.data;

    return [access, refresh];
  } catch {
    return [null, null];
  }
};

export const isJwtExpired = (token: string): boolean => {
  // offset by 60 seconds, so we will check if the token is "almost expired".
  const currentTime = Math.round(Date.now() / 1000 + 60);
  const decoded = jwt.decode(token);

  console.log(`Current time + 60 seconds: ${new Date(currentTime * 1000)}`);
  console.log(`Token lifetime: ${new Date(decoded.exp * 1000)}`);

  if (decoded.exp) {
    const adjustedExpiry = decoded.exp;

    if (adjustedExpiry < currentTime) {
      console.log("Token expired");
      return true;
    }

    console.log("Token has not expired yet");
    return false;
  }

  console.log('Token["exp"] does not exist');
  return true;
};

export const makeUrl = (...endpoints: string[]): string => {
  const url = endpoints.reduce((prevUrl, currentPath) => {
    if (prevUrl.length === 0) {
      return prevUrl + currentPath;
    }

    return prevUrl.endsWith("/")
      ? `${prevUrl + currentPath}/`
      : `${prevUrl}/${currentPath}/`;
  }, "");
  return url;
};
