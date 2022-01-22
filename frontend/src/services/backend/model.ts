/* eslint-disable camelcase */
import { calendar_v3 } from "googleapis";
import Schema$Events = calendar_v3.Schema$Events;

export interface EventsRequest {
  minDate: string;
  maxDate: string;
}

export interface EventsResponse extends Schema$Events {}
