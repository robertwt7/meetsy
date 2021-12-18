import axios from "axios";

export const checkAccessTokenValidity = async (
  accessToken: string
): Promise<boolean> => {
  try {
    const response = await axios.post(
      "http://localhost:8000/api/auth/token/verify/",
      {
        token: accessToken,
      }
    );

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
    const response = await axios.post(
      "http://localhost:8000/api/auth/token/refresh/",
      {
        refresh: refreshToken,
      }
    );

    const { access, refresh } = response.data;

    return [access, refresh];
  } catch {
    return [null, null];
  }
};
