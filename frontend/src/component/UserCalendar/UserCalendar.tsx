import React, {
  useCallback,
  FunctionComponent,
  useState,
  useEffect,
  ReactElement,
} from "react";
import { Typography } from "@mui/material";
import { Schema$Event, useGetEventsQuery } from "src/services/backend";
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

// Typeguard
const isGoogleEvent = (e: DateRange | Schema$Event): e is Schema$Event =>
  Boolean((e as Schema$Event).kind);

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
  onSelectSlot?: (selectedDates: DateRange[]) => void;
  onSelectEvent?: (event: DateRange) => void;
  availableDates?: DateRange[];
  label?: string;
  date?: Date;
  toolbar?: () => ReactElement;
}

export const UserCalendar: FunctionComponent<UserCalendarProps> = ({
  selectable = false,
  onSelectSlot,
  onSelectEvent,
  availableDates,
  label = "Date Range",
  date,
  toolbar,
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

  const handleSelectSlot = (slotInfo: SlotInfo): void => {
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

    if (onSelectSlot != null) {
      onSelectSlot(newAvailableDates);
    }
  };

  const handleSelectEvent = (event: DateRange | Schema$Event): void => {
    const googleEvent = !!isGoogleEvent(event);

    if (onSelectEvent !== undefined && !googleEvent) {
      onSelectEvent(event);
    }
  };

  /**
   * Set default value if available
   */
  useEffect(() => {
    if (availableDates !== undefined) {
      setAvailableDate(availableDates);
    }
  }, [availableDates]);

  const eventPropGetter = useCallback(
    (
      event: DateRange | Schema$Event,
      start,
      end,
      isSelected: boolean
    ): React.HTMLAttributes<HTMLDivElement> => {
      const googleEvent = !!isGoogleEvent(event);
      const basicClassName = "flex flex-row flex-wrap text-sm";
      if (isSelected && !googleEvent) {
        return {
          className: `bg-blue-400 border-primary text-primary ${basicClassName}`,
        };
      }
      const backgroundColor = googleEvent
        ? "bg-grey-400 text-black opacity-80"
        : "bg-blue-100 border-primary text-primary";
      return { className: `${backgroundColor} ${basicClassName}` };
    },
    []
  );

  return (
    <div className="w-full">
      <Typography align="center" variant="h5">
        {label}
      </Typography>
      <Calendar
        localizer={localizer}
        date={date !== undefined ? date : undefined}
        selectable={selectable}
        components={{ toolbar: toolbar !== undefined ? toolbar : undefined }}
        events={eventTimes}
        defaultView="week"
        defaultDate={new Date()}
        titleAccessor={(event) => event.summary ?? ""}
        startAccessor={(event) =>
          new Date(event?.start?.dateTime ?? event?.start?.date ?? "")
        }
        endAccessor={(event) =>
          new Date(event?.end?.dateTime ?? event?.end?.date ?? "")
        }
        eventPropGetter={eventPropGetter}
        allDayAccessor={(event) => Boolean(event?.end?.date)}
        onSelectSlot={handleSelectSlot}
        onSelectEvent={handleSelectEvent}
        step={30}
        timeslots={1}
        style={{ height: 800 }}
        views={{ week: true }}
      />
    </div>
  );
};
