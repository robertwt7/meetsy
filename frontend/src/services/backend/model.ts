/* eslint-disable camelcase */
import { calendar_v3 } from "googleapis";
import Schema$Events = calendar_v3.Schema$Events;

export interface EventsRequest {
  minDate: string;
  maxDate: string;
}

export interface EventsResponse extends Schema$Events {}

interface availableDates {
  start: string;
  end: string;
}
export interface CreateMeetsyEventsRequest {
  name: string;
  location: string;
  notes: string;
  available_dates: availableDates[];
}

export interface MeetsyEventsResponse {
  id: number;
  user: string;
  name: string;
  location: string;
  notes: string;
  expiry: string;
  selected_time: string;
  pending: boolean;
  available_dates: Array<availableDates & { id: number; event: number }>;
  invite_url: string;
}
