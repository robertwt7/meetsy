import { FunctionComponent, useMemo } from "react";
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/53437
import TimeGrid from "react-big-calendar/lib/TimeGrid";
import { Navigate, NavigateAction, TimeGridProps } from "react-big-calendar";

interface CustomWeek extends FunctionComponent<MyWeekProps> {
  range: (date: Date, obj: { localizer: AnyObject }) => Date[];
  navigate: (
    date: Date,
    action: NavigateAction,
    obj: { localizer: AnyObject }
  ) => Date;
  title: (date: Date) => string;
}

export const ThreeDaysWeek: CustomWeek = ({
  date,
  localizer,
  max = localizer.endOf(new Date(), "day"),
  min = localizer.startOf(new Date(), "day"),
  scrollToTime = localizer.startOf(new Date(), "day"),
  ...props
}) => {
  const currRange = useMemo(
    () => ThreeDaysWeek.range(date, { localizer }),
    [date, localizer]
  );

  return (
    <TimeGrid
      localizer={localizer}
      max={max}
      min={min}
      range={currRange}
      scrollToTime={scrollToTime}
      {...props}
    />
  );
};

interface AnyObject {
  [key: string]: any;
}

// TODO: DateLocalizer type is not correct, fix this in the future
// https://github.com/DefinitelyTyped/DefinitelyTyped/issues/53437
type MyWeekProps = {
  date: Date;
  localizer: AnyObject;
  max: Date;
  min: Date;
  scrollToTime: Date;
} & TimeGridProps;

ThreeDaysWeek.range = (
  date: Date,
  { localizer }: { localizer: AnyObject }
): Date[] => {
  const start = date;
  const end = localizer.add(start, 2, "day");

  let current = start;
  const range = [];

  while (localizer.lte(current, end, "day")) {
    range.push(current);
    current = localizer.add(current, 1, "day");
  }

  return range;
};

ThreeDaysWeek.navigate = (
  date: Date,
  action: NavigateAction,
  { localizer }: { localizer: AnyObject }
): Date => {
  switch (action) {
    case Navigate.PREVIOUS:
      return localizer.add(date, -3, "day");

    case Navigate.NEXT:
      return localizer.add(date, 3, "day");

    default:
      return date;
  }
};

ThreeDaysWeek.title = (date: Date) => {
  return date.toLocaleDateString();
};
