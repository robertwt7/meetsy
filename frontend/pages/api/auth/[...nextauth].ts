/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { refreshTokenRequest, isJwtExpired } from "src/utils";
import { LOGIN_URL } from "src/api";
import { app } from "src/env";

const {
  JWT_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  SESSION_SECRET,
  NODE_ENV,
} = app;

export default NextAuth({
  secret: SESSION_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: JWT_SECRET,
  },
  debug: NODE_ENV === "development",
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID ?? "",
      clientSecret: GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          scope:
            "https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/calendar.readonly openid email profile",
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log("[SESSION CALLBACK]");
      console.log("Token: ", token);
      console.log("Session: ", session);
      return {
        ...session,
        accessToken: token.accessToken,
      };
    },
    async jwt({ token, user, account }) {
      console.log("[JWT CALLBACK]");
      console.log("Token:", token);
      console.log("User: ", user);
      console.log("Account: ", account);
      let newToken = { ...token };
      // user just signed in
      if (user !== null && user !== undefined && account !== undefined) {
        // may have to switch it up a bit for other providers
        if (account.provider === "google") {
          // extract these two tokens
          const {
            access_token: accessToken,
            id_token: idToken,
            refresh_token: refreshToken,
            expires_at: expiresAt,
          } = account;

          const expireDate = new Date((expiresAt ?? 0) * 1000);
          const timeNow = new Date();

          /**
           * make a POST request to the DRF backend
           * It's called with expires_in key because that is the default google token response,
           * thus backend django-allauth is expecting expires_in key
           * */
          try {
            const response = await axios.post(LOGIN_URL(account.provider), {
              access_token: accessToken,
              id_token: idToken,
              refresh_token: refreshToken,
              expires_in: Math.floor(
                (expireDate.getTime() - timeNow.getTime()) / 1000
              ),
            });

            // extract the returned token from the DRF backend and add it to the `user` object
            const { access_token, refresh_token } = response.data;
            // reform the `token` object from the access token we appended to the `user` object
            newToken = {
              ...newToken,
              accessToken: access_token,
              refreshToken: refresh_token,
            };

            return newToken;
          } catch (error) {
            return {};
          }
        }
      }

      // user was signed in previously, we want to check if the token needs refreshing
      // token has been invalidated, try refreshing it
      if (isJwtExpired(token.accessToken as string)) {
        const [newAccessToken, newRefreshToken] = await refreshTokenRequest(
          token.refreshToken as string
        );

        if (newAccessToken !== null && newRefreshToken !== null) {
          return {
            ...token,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
          };
        }

        // unable to refresh tokens from DRF backend, invalidate the token
        return {
          ...token,
          exp: 0,
        };
      }

      // token valid
      return token;
    },
  },
});
