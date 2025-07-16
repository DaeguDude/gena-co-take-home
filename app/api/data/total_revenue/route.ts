import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    value: 98123,
  };

  return NextResponse.json(data);
}
