import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    labels: ["North America", "Europe", "Asia"],
    values: [120, 95, 180],
  };

  return NextResponse.json(data);
}
