import { NextRequest, NextResponse } from "next/server";
import { charts, getNewChartId, getNewOrder } from "./data";
import { Chart } from "./type";
import { revalidateTag } from "next/cache";
import { dashboards } from "../dashboards/data";

export function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const idsParam = searchParams.get("ids");

    let result: Chart[] = [];
    if (idsParam) {
      const chartIds = idsParam.split(",");
      result = charts.filter((c) => chartIds.includes(c.id));
    } else {
      result = charts;
    }

    return NextResponse.json(result);
  } catch (err) {
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      {
        status: 500,
      }
    );
  }
}

// 내가 잘 모르는것은 POST면 파라미터가 어떻게 되지?
export async function POST(request: NextRequest) {
  try {
    const chartForm: Omit<Chart, "id" | "order"> = await request.json();

    // 필수 필드 유효성 검사 (간단한 예시)
    if (
      !chartForm.dashboardId ||
      !chartForm.type ||
      !chartForm.title ||
      !chartForm.dataEndPoint
    ) {
      return NextResponse.json(
        {
          message:
            "필수 차트 필드 (dashboardId, type, title, dataEndPoint)가 누락되었습니다.",
        },
        { status: 400 }
      );
    }

    const newChart: Chart = {
      ...chartForm,
      id: getNewChartId(),
      order: getNewOrder(),
    };

    charts.push(newChart);

    const dashboardIndex = dashboards.findIndex(
      (d) => d.id === chartForm.dashboardId
    );

    if (dashboardIndex === -1) {
      return NextResponse.json(
        { message: "Dashboard not found" },
        { status: 404 }
      );
    }

    dashboards[dashboardIndex] = {
      ...dashboards[dashboardIndex],
      charts: [...dashboards[dashboardIndex].charts, newChart.id],
    };

    revalidateTag("charts");
    revalidateTag("dashboards");
    return NextResponse.json(charts);
  } catch (err) {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}
