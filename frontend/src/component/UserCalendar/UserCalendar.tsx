import { FunctionComponent, useState } from "react";
import { Typography } from "@mui/material";
import { useGetEventsQuery } from "src/services/backend";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enAU from "date-fns/locale/en-AU";
import { startOfMonth, endOfMonth, formatISO } from "date-fns";
import type { SlotInfo } from "react-big-calendar";

import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";

const locales = {
  "en-AU": enAU,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Follow google event type format for react-big-calendar
interface DateTime {
  dateTime: Date;
  date?: Date;
}
export interface DateRange {
  summary: string;
  start: DateTime;
  end: DateTime;
}

interface UserCalendarProps {
  selectable?: boolean;
  onSelect?: (selectedDates: DateRange[]) => void;
}

export const UserCalendar: FunctionComponent<UserCalendarProps> = ({
  selectable = false,
  onSelect,
}) => {
  const [availableDate, setAvailableDate] = useState<DateRange[]>([]);
  const currentDate = new Date();
  const payload = {
    minDate: formatISO(startOfMonth(currentDate)),
    maxDate: formatISO(endOfMonth(currentDate)),
  };
  const { data } = useGetEventsQuery(payload);
  const eventTimes =
    data?.items != null ? [...data.items, ...availableDate] : availableDate;

  const handleSelect = (slotInfo: SlotInfo): void => {
    const newAvailableDates = [
      ...availableDate,
      {
        summary: "Blocked Time",
        start: {
          dateTime: slotInfo.start as Date,
        },
        end: {
          dateTime: slotInfo.end as Date,
        },
      },
    ];
    setAvailableDate(newAvailableDates);

    if (onSelect != null) {
      onSelect(newAvailableDates);
    }
  };

  return (
    <div className="w-full">
      <Typography align="center" variant="h5">
        Your events
      </Typography>
      <Calendar
        localizer={localizer}
        selectable={selectable}
        events={eventTimes}
        titleAccessor={(event) => event.summary ?? ""}
        startAccessor={(event) =>
          new Date(event?.start?.dateTime ?? event?.start?.date ?? "")
        }
        endAccessor={(event) =>
          new Date(event?.end?.dateTime ?? event?.end?.date ?? "")
        }
        allDayAccessor={(event) => Boolean(event?.end?.date)}
        onSelectSlot={handleSelect}
        style={{ height: 500 }}
      />
    </div>
  );
};
