import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    labels: ["North America", "Europe", "Asia", "South America", "Africa"],
    values: [120, 95, 180, 150, 100],
  };

  return NextResponse.json(data);
}
