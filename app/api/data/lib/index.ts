import { format } from "date-fns";

function formatDate(date: Date): string {
  return format(date, "yyyy-MM-dd");
}

export function generateDateLabels(
  startDate: string,
  endDate: string
): string[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const labels: string[] = [];

  while (start <= end) {
    labels.push(formatDate(new Date(start)));
    start.setDate(start.getDate() + 1);
  }

  return labels;
}

export function generateRandomValues(
  length: number,
  min = 10,
  max = 50
): number[] {
  const values: number[] = [];

  for (let i = 0; i < length; i++) {
    const val = Math.floor(Math.random() * (max - min + 1)) + min;
    values.push(val);
  }

  return values;
}
