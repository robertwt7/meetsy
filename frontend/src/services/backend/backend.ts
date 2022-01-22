import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "src/env";
import { getSession } from "next-auth/react";
import { EventsRequest, EventsResponse } from "./model";

export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${api.BACKEND_URL}/api`,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      console.log("result of getsession: ", session);

      const token = session?.accessToken;

      if (token) {
        headers.set("authorization", `Bearer ${token as string}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    getEvents: builder.query<EventsResponse, EventsRequest>({
      query: (body) => ({
        url: "/events/",
        method: "POST",
        data: body,
      }),
      providesTags: ["Events"],
    }),
  }),
});

export const { useGetEventsQuery } = backendApi;
