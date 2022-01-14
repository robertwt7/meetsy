const BACKEND_URL = process.env.BACKEND_API_BASE ?? "";

export const VERIFY_TOKEN_URL = `${BACKEND_URL}/api/auth/token/verify/`;
export const REFRESH_TOKEN_URL = `${BACKEND_URL}/api/auth/token/refresh/`;
export const LOGIN_URL = (provider: string): string =>
  `${BACKEND_URL}/api/social/login/${provider}/`;
