import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { checkAccessTokenValidity, refreshTokenRequest } from "src/utils";
import axios from "axios";

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
    // ...add more providers here
  ],
  callbacks: {
    async signIn(user, account, profile) {
      // may have to switch it up a bit for other providers
      if (account.provider === "google") {
        // extract these two tokens
        const { accessToken, idToken } = account;

        // make a POST request to the DRF backend
        try {
          const response = await axios.post(
            // tip: use a seperate .ts file or json file to store such URL endpoints, or better, an environment variable
            "http://localhost:8000/api/social/login/google/",
            {
              access_token: accessToken, // note the differences in key and value variable names
              id_token: idToken,
            }
          );

          // extract the returned token from the DRF backend and add it to the `user` object
          const { access_token, refresh_token } = response.data;
          user.accessToken = access_token;
          user.refreshToken = refresh_token;

          return true; // return true if everything went well
        } catch (error) {
          return false;
        }
      }
      return false;
    },

    async jwt(token, user, account, profile, isNewUser) {
      if (user) {
        const { accessToken, refreshToken } = user;

        // reform the `token` object from the access token we appended to the `user` object
        token = {
          ...token,
          accessToken,
          refreshToken,
        };

        // remove the tokens from the user objects just so that we don't leak it somehow
        delete user.accessToken;
        delete user.refreshToken;

        return token;
      }

      // cheking session validity, check if the token is still valid
      const accessTokenValid = await checkAccessTokenValidity(
        token.accessToken
      );

      // token has been invalidated, try refreshing it
      if (!accessTokenValid) {
        const [newAccessToken, newRefreshToken] = await refreshTokenRequest(
          token.refreshToken
        );

        if (newAccessToken && newRefreshToken) {
          token = {
            ...token,
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            iat: Math.floor(Date.now() / 1000),
            exp: Math.floor(Date.now() / 1000 + 2 * 60 * 60),
          };

          return token;
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
