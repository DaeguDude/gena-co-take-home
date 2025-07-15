import { NextRequest, NextResponse } from "next/server";
import { dashboards } from "../data";
import { revalidateTag } from "next/cache";

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

// 이름 업데이트
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;
  const { name }: { name: string } = await request.json();

  // TODO: validation

  console.log("id: ", id);
  const dashboardIndex = dashboards.findIndex((d) => {
    console.log("d: ", d);
    return d.id === id;
  });

  if (dashboardIndex === -1) {
    return NextResponse.json(
      { message: "Dashboard not found" },
      { status: 404 }
    );
  }

  dashboards[dashboardIndex] = {
    ...dashboards[dashboardIndex],
    name,
  };

  revalidateTag("/dashboards");
  return NextResponse.json(dashboards[dashboardIndex]);
}
