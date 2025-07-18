import { Chart } from "@/app/api/charts/type";
import { Dashboard } from "@/app/api/dashboards/type";
import { BarAndLineChartCard } from "@/app/components/chart/bar-and-line-chart-card";
import {
  NumberChartCard,
  NumberCharts,
} from "@/app/components/chart/number-chart-card";
import { Header } from "@/app/components/header";
import { Card } from "@/components/ui/card";
import { useMemo } from "react";

async function getCharts(ids?: string[]): Promise<Chart[]> {
  let xxApiPath = "charts";
  if (ids && ids.length > 0) {
    xxApiPath += `?ids=${ids.join(",")}`;
  }

  const res = await fetch(`http://localhost:3000/api/${xxApiPath}`, {
    cache: "no-store",
    next: {
      tags: ["charts"],
    },
  });

  if (!res.ok) {
    throw new Error(`차트 데이터를 가져오는 데 실패했어: ${res.statusText}`);
  }

  // 응답을 JSON으로 파싱하고 정의된 타입으로 캐스팅
  const data: Chart[] = await res.json();
  return data;
}

async function getDashboard(id: string): Promise<Dashboard> {
  const res = await fetch(`http://localhost:3000/api/dashboards/${id}`, {
    cache: "no-store",
    next: {
      tags: [`dashboard-${id}`],
    },
  });

  if (res.status === 404) {
    throw new Error(`대시보드 (ID: ${id})를 찾을 수 없어.`);
  }

  if (!res.ok) {
    throw new Error(`대시보드 (ID: ${id}) 데이터를 가져오는데 실패.`);
  }

  const data: Dashboard = await res.json();
  return data;
}

export default async function DashboardIdPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const dashboardId = (await params).id;
  const dashboard = await getDashboard(dashboardId);
  const charts = await getCharts(dashboard.charts);

  const numberCharts = charts.filter((c) => c.type === "number");
  const barAndLineCharts = charts.filter((c) => c.type !== "number");

  const dummyNumberCharts = Array.from({ length: 3 }).map((_, index) => ({
    ...numberCharts[0],
    id: `dashboard-${index + 1}`,
  }));

  return (
    <main className="flex flex-col flex-1">
      <Header dashboard={dashboard} />
      <div className="p-4">
        <NumberCharts charts={dummyNumberCharts} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
          {barAndLineCharts.map((chart) => (
            <BarAndLineChartCard key={chart.id} chart={chart} />
          ))}
        </div>
      </div>
    </main>
  );
}
