import { AvailableSpot } from "src/services/backend";
import dayjs from "dayjs";
import { DateRange } from "..";

export const mapDatesToCalendarObject = (
  availableSpot: AvailableSpot[],
  eventDuration: number
): DateRange[] => {
  return availableSpot.map(({ start }) => {
    const eventStart = new Date(start);
    return {
      summary: "Available Time",
      start: { dateTime: eventStart },
      end: {
        dateTime: dayjs(eventStart).add(eventDuration, "minute").toDate(),
      },
    };
  });
};
