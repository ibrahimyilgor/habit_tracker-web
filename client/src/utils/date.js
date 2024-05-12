import { differenceInDays, format, isAfter, isBefore } from "date-fns";

export const ParseToDate = (date) => {
  if (!date) {
    return null;
  }
  if (isNaN(new Date(date))) {
    return null;
  }
  return format(Date.parse(date), "dd.MM.yyyy");
};

export const ParseToDateAndHour = (date) => {
  if (!date) {
    return null;
  }
  if (isNaN(new Date(date))) {
    return null;
  }
  const f = format(new Date(date), "dd.MM.yyyy-HH:mm");

  return f;
};
