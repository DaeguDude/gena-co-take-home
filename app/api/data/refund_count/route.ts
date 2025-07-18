import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    value: 278,
  };

  return NextResponse.json(data);
}
