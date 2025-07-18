import { clsx, type ClassValue } from "clsx";
import { format, isValid, parse } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function isYYYYMMDD(value: string) {
  const parsed = parse(value, "yyyy-MM-dd", new Date());

  return isValid(parsed) && format(parsed, "yyyy-MM-dd") === value;
}
