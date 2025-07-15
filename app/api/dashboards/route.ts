import { NextRequest, NextResponse } from "next/server";
import { dashboards, getNewDashboardId } from "./data";
import { Dashboard } from "./type";
import { revalidateTag } from "next/cache";

export async function GET(request: NextRequest) {
  return NextResponse.json(dashboards);
}

export async function POST(request: NextRequest) {
  const { name }: { name: string } = await request.json();

  // TODO: 데이터 유효성 검사

  const newDashboard: Dashboard = {
    id: getNewDashboardId(),
    name: name,
    charts: [],
  };

  dashboards.push(newDashboard);

  revalidateTag("dashboards");

  return NextResponse.json(newDashboard, { status: 201 });
}
