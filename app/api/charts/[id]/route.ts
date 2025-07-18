import { NextRequest, NextResponse } from "next/server";
import { charts, deleteChart } from "../data";
import { revalidateTag } from "next/cache";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "SHOULD HAVE ID" }, { status: 404 });
  }

  try {
    const chart = charts.find((c) => c.id === id);
    if (chart) {
      return NextResponse.json(chart);
    } else {
      return NextResponse.json(
        { message: "Could not find a chart" },
        { status: 404 }
      );
    }
  } catch {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

// /api/charts/[id] - 차트 지우기
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  if (!id) {
    return NextResponse.json({ message: "SHOULD HAVE ID" }, { status: 404 });
  }

  try {
    const initialLength = charts.length;
    deleteChart(id);

    if (charts.length < initialLength) {
      revalidateTag("charts");
      return NextResponse.json(
        { message: "Chart Deleted", deletedId: id },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "Failed to delete chart" },
        { status: 404 }
      );
    }
  } catch {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}
