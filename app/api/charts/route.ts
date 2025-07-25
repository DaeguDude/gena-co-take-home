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
  } catch {
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

    revalidateTag(`${chartForm.dashboardId}`);
    revalidateTag("charts");
    return NextResponse.json(charts);
  } catch {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}

// 데이터셋도 변경할 수 있고... 새롭게 다 변경할 수 있어야 해
export async function PUT(request: NextRequest) {
  try {
    const chartForm: Partial<Chart> & { id: string } = await request.json();

    // 필수 필드 유효성 검사 (간단한 예시)
    if (!chartForm.id) {
      return NextResponse.json(
        {
          message: "필수 차트 필드 (id)가 누락되었습니다.",
        },
        { status: 400 }
      );
    }

    const chartIndex = charts.findIndex((c) => c.id === chartForm.id);

    if (chartIndex === -1) {
      return NextResponse.json({ message: "Chart not found" }, { status: 404 });
    }

    const foundChart = charts[chartIndex];
    const updateChart = {
      ...foundChart,
      dashboardId: chartForm.dashboardId ?? foundChart.dashboardId,
      title: chartForm.title ?? foundChart.title,
      dataEndPoint: chartForm.dataEndPoint ?? foundChart.dataEndPoint,
      order: chartForm.order ?? foundChart.order,
      type: chartForm.type ?? foundChart.type,
    };

    charts[chartIndex] = updateChart;

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
      charts: [...dashboards[dashboardIndex].charts, updateChart.id],
    };

    revalidateTag("charts");
    revalidateTag("dashboards");
    return NextResponse.json(charts);
  } catch {
    return NextResponse.json(
      { message: "INTERNAL SERVER ERROR" },
      { status: 500 }
    );
  }
}
