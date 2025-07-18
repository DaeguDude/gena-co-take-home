import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    value: 13452,
  };

  return NextResponse.json(data);
}
