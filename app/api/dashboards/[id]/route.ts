import { NextRequest, NextResponse } from "next/server";
import { dashboards } from "../data";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const dashboard = dashboards.find((d) => d.id === id);

  if (!dashboard) {
    return NextResponse.json(
      { message: "Dashboard not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(dashboard);
}
