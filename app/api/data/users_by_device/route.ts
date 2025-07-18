import { NextResponse } from "next/server";

export async function GET() {
  const data = {
    labels: ["Mobile", "Tablet", "Laptop", "Desktop", "TV"],
    values: [420, 530, 160, 110, 90],
  };

  return NextResponse.json(data);
}
