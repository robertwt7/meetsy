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

export interface UserDetails {
  userId: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type AvailableDates = Array<
  availableDates & { id: number; event: number }
>;

export interface AvailableSpot {
  start: string;
  startTime: string;
}

export interface Spots {
  [key: string]: AvailableSpot[];
}

export interface MeetsyEventsResponse {
  id: number;
  user: UserDetails;
  name: string;
  location: string;
  notes: string;
  expiry: string;
  selected_time: string;
  pending: boolean;
  available_dates: AvailableDates;
  invite_url: string;
}

export interface MeetsyOpenInviteResponse extends MeetsyEventsResponse {
  spots: Spots;
}
