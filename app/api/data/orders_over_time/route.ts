import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    labels: ["2025-07-01", "2025-07-02", "2025-07-03"],
    values: [32, 45, 41],
  };

  return NextResponse.json(data);
}
