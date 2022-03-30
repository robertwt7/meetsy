import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { api } from "src/env";
import { getSession } from "next-auth/react";
import {
  ConfirmEventRequest,
  EventsRequest,
  EventsResponse,
  MeetsyEventResponse,
  MeetsyEventsRequest,
} from "./model";
import {
  CreateMeetsyEventsRequest,
  MeetsyEventsResponse,
  MeetsyOpenInviteResponse,
} from ".";

export const backendApi = createApi({
  reducerPath: "backendApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${api.BACKEND_URL}/api`,
    prepareHeaders: async (headers) => {
      const session = await getSession();
      const token = session?.accessToken;

      if (token !== null && token !== undefined) {
        headers.set("authorization", `Bearer ${token as string}`);
      }

      return headers;
    },
  }),
  tagTypes: ["Events", "MeetsyEvents"],
  endpoints: (builder) => ({
    getEvents: builder.query<EventsResponse, EventsRequest>({
      query: (params) => ({
        url: "/events/",
        method: "GET",
        params,
      }),
      providesTags: ["Events"],
    }),
    confirmEvent: builder.mutation<MeetsyEventsResponse, ConfirmEventRequest>({
      query: (body) => ({
        url: "/events/",
        method: "POST",
        body,
      }),
    }),
    createMeetsyEvents: builder.mutation<
      MeetsyEventsResponse,
      CreateMeetsyEventsRequest
    >({
      query: (body) => ({
        url: "/meetsy-events/",
        method: "POST",
        body,
      }),
    }),
    getMeetsyEvents: builder.query<
      MeetsyEventsResponse,
      MeetsyEventsRequest | void
    >({
      query: (params) => ({
        url: `/meetsy-events/`,
        method: "GET",
        params: params ?? undefined,
      }),
      providesTags: ["MeetsyEvents"],
    }),
    getMeetsyEvent: builder.query<MeetsyEventResponse, number>({
      query: (id) => ({
        url: `/meetsy-events/${id}/`,
        method: "GET",
      }),
    }),
    deleteMeetsyEvent: builder.mutation<void, number>({
      query: (id) => ({
        url: `/meetsy-events/${id}/`,
        method: "DELETE",
      }),
      invalidatesTags: ["MeetsyEvents"],
    }),
    getInvitedEvent: builder.query<MeetsyOpenInviteResponse, string>({
      query: (signedUrl) => ({
        url: `/meetsy-events/open_invite/?invite_url=${signedUrl}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useConfirmEventMutation,
  useCreateMeetsyEventsMutation,
  useGetMeetsyEventQuery,
  useGetMeetsyEventsQuery,
  useGetInvitedEventQuery,
  useDeleteMeetsyEventMutation,
} = backendApi;
