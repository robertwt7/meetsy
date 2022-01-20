import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "src/env";
import { EventsRequest, EventsResponse } from "./model";

export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({ baseUrl: api.BACKEND_URL }),
  tagTypes: ["Events"],
  endpoints: (builder) => ({
    getEvents: builder.query<EventsResponse, EventsRequest>({
      query: (body) => ({
        url: "/events",
        method: "POST",
        data: body,
      }),
      providesTags: ["Events"],
    }),
  }),
});
