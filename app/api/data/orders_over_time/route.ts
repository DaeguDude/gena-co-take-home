import { NextResponse } from "next/server";

// 날짜 포맷을 YYYY-MM-DD로 만드는 유틸
function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function generateDateLabels(startDate: string, endDate: string): string[] {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const labels: string[] = [];

  while (start <= end) {
    labels.push(formatDate(new Date(start)));
    start.setDate(start.getDate() + 1);
  }

  return labels;
}

function generateRandomValues(length: number, min = 10, max = 50): number[] {
  const values: number[] = [];

  for (let i = 0; i < length; i++) {
    const val = Math.floor(Math.random() * (max - min + 1)) + min;
    values.push(val);
  }

  return values;
}

export async function GET() {
  const labels = generateDateLabels("2025-05-01", "2025-07-01");
  const values = generateRandomValues(labels.length, 10, 200);
  const data = {
    labels: labels,
    values: values,
  };

  return NextResponse.json(data);
}
