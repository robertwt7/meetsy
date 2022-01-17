/* eslint-disable camelcase */
/* eslint-disable @typescript-eslint/naming-convention */
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import axios from "axios";
import { refreshTokenRequest, isJwtExpired } from "src/utils";
import { LOGIN_URL } from "src/api";

export default NextAuth({
  secret: process.env.SESSION_SECRET,
  session: {
    strategy: "jwt",
    maxAge: 24 * 60 * 60, // 24 hours
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  debug: process.env.NODE_ENV === "development",
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      console.log("[SESSION CALLBACK]");
      console.log(token);
      return {
        ...session,
        accessToken: token.accessToken,
      };
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      console.log("[JWT CALLBACK]");
      let newToken = { ...token };
      // user just signed in
      if (user !== null && user !== undefined) {
        // may have to switch it up a bit for other providers
        if (account.provider === "google") {
          // extract these two tokens
          const { access_token: accessToken, id_token: idToken } = account;

          // make a POST request to the DRF backend
          try {
            const response = await axios.post(
              // tip: use a seperate .ts file or json file to store such URL endpoints
              // "http://127.0.0.1:8000/api/social/login/google/",
              LOGIN_URL(account.provider),
              {
                access_token: accessToken,
                id_token: idToken,
              }
            );

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
          token.refreshToken
        );

        if (newAccessToken && newRefreshToken) {
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
