import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    value: 9812300,
  };

  return NextResponse.json(data);
}
