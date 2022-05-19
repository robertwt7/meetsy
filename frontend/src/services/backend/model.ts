/* eslint-disable camelcase */
import { calendar_v3 } from "googleapis";
import Schema$Events = calendar_v3.Schema$Events;

import Schema$Event = calendar_v3.Schema$Event;

export type { Schema$Event };

export interface EventsRequest {
  minDate: string;
  maxDate: string;
}

export interface EventsResponse extends Schema$Events {}

interface AvailableDate {
  start: string;
  end: string;
}
export interface CreateMeetsyEventsRequest {
  name: string;
  location: string;
  notes: string;
  available_dates: AvailableDate[];
}

export interface UserDetails {
  userId: string;
  email: string;
  first_name: string;
  last_name: string;
}

export type AvailableDates = Array<
  AvailableDate & { id: number; event: number }
>;

export interface AvailableSpot {
  start: string;
  startTime: string;
}

export interface Spots {
  [key: string]: AvailableSpot[];
}

export interface MeetsyEventsResponse {
  count: number;
  next: null | string;
  previous: null | string;
  results: MeetsyEventResponse[];
}

export interface MeetsyEventsRequest {
  page?: number;
}

export interface MeetsyEventResponse {
  id: number;
  user: UserDetails;
  duration: number;
  name: string;
  location: string;
  notes: string;
  expiry: string;
  selected_time: string;
  pending: boolean;
  available_dates: AvailableDates;
  invite_url: string;
}

export interface MeetsyOpenInviteResponse extends MeetsyEventResponse {
  spots: Spots;
}

export interface TimeZone {
  dateTime: string;
  timeZone: string;
}

export interface Attendees {
  email: string;
}

export interface GoogleEventPayload {
  summary: string;
  location: string;
  description: string;
  start: TimeZone;
  end: TimeZone;
  attendees: Attendees[];
  reminders: {
    useDefault: boolean;
  };
}

export interface ConfirmEventRequest {
  inviterId: string | number;
  eventId: number;
  googleEventPayload: GoogleEventPayload;
}

export interface MeetsyBackendError {
  detail: string;
}
