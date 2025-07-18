import { NextResponse } from "next/server";
import { generateDateLabels, generateRandomValues } from "../lib";

export async function GET() {
  const labels = generateDateLabels("2025-05-01", "2025-07-01");
  const values = generateRandomValues(labels.length, 50000, 100000);
  const data = {
    labels: labels,
    values: values,
  };

  return NextResponse.json(data);
}
