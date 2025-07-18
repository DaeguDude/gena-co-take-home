import { Chart } from "@/app/api/charts/type";
import { Dashboard } from "@/app/api/dashboards/type";
import { BarChartCard } from "@/app/components/chart/bar-chart-card";
import { LineChartCard } from "@/app/components/chart/line-chart-card";
import { NumberChartCard } from "@/app/components/chart/number-chart-card";
import { Header } from "@/app/components/header";
import { SideSheet } from "@/app/components/side-sheet";

async function getCharts(ids?: string[]): Promise<Chart[]> {
  let xxApiPath = "charts";

  if (ids && ids.length === 0) {
    return [];
  }

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
  return data.sort((a, b) => a.order - b.order);
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
  const nonNumberCharts = charts.filter((c) => c.type !== "number");

  return (
    <main className="flex flex-col flex-1">
      <Header dashboard={dashboard} />

      <div className="p-4 flex flex-col gap-4">
        <div className="grid grid-cols-12 gap-4">
          {numberCharts.map((c) => (
            <NumberChartCard key={c.id} chart={c} />
          ))}
          {nonNumberCharts.map((chart) => {
            if (chart.type === "bar") {
              return <BarChartCard key={chart.id} chart={chart} />;
            } else if (chart.type === "line") {
              return <LineChartCard key={chart.id} chart={chart} />;
            }
          })}
        </div>
      </div>
    </main>
  );
}
