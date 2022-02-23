import { AvailableDates } from "src";
import { DateRange } from "..";

export const mapDatesToCalendarObject = (
  availableDates: AvailableDates
): DateRange[] => {
  return availableDates.map(({ start, end }) => ({
    summary: "Available Time",
    start: { dateTime: new Date(start) },
    end: { dateTime: new Date(end) },
  }));
};
