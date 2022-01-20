export const api = {
  BACKEND_URL: process.env.BACKEND_URL ?? "",
};
export const app = {
  DEBUG_MODE: process.env.DEBUG_MODE ?? false,
  APP_URL: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID ?? "",
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET ?? "",
  SESSION_SECRET: process.env.SESSION_SECRET ?? "",
  JWT_SECRET: process.env.JWT_SECRET ?? "",
  NODE_ENV: process.env.NODE_ENV ?? "development",
};
