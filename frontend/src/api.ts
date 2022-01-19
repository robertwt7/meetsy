import { api } from "src/env";

const { BACKEND_URL } = api;
export const VERIFY_TOKEN_URL = `${BACKEND_URL}/api/auth/token/verify/`;
export const REFRESH_TOKEN_URL = `${BACKEND_URL}/api/auth/token/refresh/`;
export const LOGIN_URL = (provider: string): string =>
  `${BACKEND_URL}/api/social/login/${provider}/`;
