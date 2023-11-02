import { differenceInDays, format, isAfter, isBefore } from "date-fns";

export const ParseToDate = (date) => {
  if (!date) {
    console.warn("empty data");
    return null;
  }
  if (isNaN(new Date(date))) {
    console.warn(" datenan");
    return null;
  }
  return format(Date.parse(date), "dd.MM.yyyy");
};

export const ParseToDateAndHour = (date) => {
  if (!date) {
    // console.warn("empty data");
    return null;
  }
  if (isNaN(new Date(date))) {
    // console.warn(" datenan");
    return null;
  }
  const f = format(new Date(date), "dd.MM.yyyy-HH:mm");

  return f;
};
