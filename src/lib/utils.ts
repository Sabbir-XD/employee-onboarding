import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { differenceInYears, addDays, isBefore, startOfDay } from "date-fns";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const MIN_AGE = 18;

export function calcAge(dob: Date) {
  return differenceInYears(new Date(), dob);
}

export function parseTimeToMinutes(hhmm: string) {
  const m = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(hhmm);
  if (!m) return null;
  return parseInt(m[1]) * 60 + parseInt(m[2]);
}

export function isWeekendForHRFinance(date: Date) {
  // Weekend: Friday (5) & Saturday (6)
  const d = date.getDay();
  return d === 5 || d === 6;
}

export function validateStartDate(dept: string | undefined, date: Date) {
  const today = startOfDay(new Date());
  const inPast = isBefore(date, today);
  const tooFar = isBefore(addDays(today, 91), date); // > 90 days ahead
  if (inPast) return "Start date cannot be in the past";
  if (tooFar) return "Start date cannot be more than 90 days in the future";
  if ((dept === "HR" || dept === "Finance") && isWeekendForHRFinance(date)) {
    return "For HR/Finance, start date cannot be on Friday or Saturday";
  }
  return null;
}

export const phonePattern = /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/; // +1-123-456-7890
