import { NextRequest, NextResponse } from "next/server";
import { dashboards, deleteDashboard } from "../data";
import { revalidateTag } from "next/cache";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
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

  const dashboardIndex = dashboards.findIndex((d) => d.id === id);

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

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = await params;

  // TODO: ID가 제공되었는지 확인
  if (!id) {
    return NextResponse.json({ message: "ID가 필요합니다." }, { status: 400 });
  }

  const initialLength = dashboards.length;
  deleteDashboard(id);

  if (dashboards.length < initialLength) {
    revalidateTag("/dashboards");
    return NextResponse.json(
      { message: "Deleted", deletedId: id },
      { status: 200 }
    );
  } else {
    NextResponse.json(
      { message: `항목 id ${id}를 찾을 수 없습니다.` },
      { status: 404 }
    );
  }
}
