export interface ApiType {
  BACKEND_URL: string;
}

export interface AppType {
  DEBUG_MODE: boolean | string;
  APP_URL: string;
  GOOGLE_CLIENT_ID: string;
  GOOGLE_CLIENT_SECRET: string;
  SESSION_SECRET: string;
  JWT_SECRET: string;
  NODE_ENV: string;
}
