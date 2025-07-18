import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    values: [
      178000, 165500, 192000, 185000, 204000, 219000, 198500, 210000, 223000,
      237000, 245000, 261500,
    ],
  };

  return NextResponse.json(data);
}
