import { Dashboard } from "@/app/api/dashboards/type";
import { BarChartCard } from "@/app/components/chart/bar-chart-card";
import { LineChartCard } from "@/app/components/chart/line-chart-card";
import { NumberChartCard } from "@/app/components/chart/number-chart-card";
import { Empty } from "@/app/components/dashboard/empty";
import { Header } from "@/app/components/header";
import { getCharts } from "@/app/lib";
import { baseUrl } from "@/lib/constant";

async function getDashboard(id: string): Promise<Dashboard> {
  const res = await fetch(`${baseUrl}/api/dashboards/${id}`, {
    cache: "no-store",
    next: {
      tags: [`dashboard-${id}`],
    },
  });

  if (res.status === 404) {
    throw new Error(`Can't find (ID: ${id})`);
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch (ID: ${id})`);
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

  const emptyDashboard = charts.length === 0;

  return (
    <main className="flex flex-col flex-1">
      <Header dashboard={dashboard} />

      {emptyDashboard ? (
        <Empty dashboardId={dashboardId} />
      ) : (
        <div className="p-4 flex flex-col gap-4">
          <div className="grid grid-cols-12 gap-4">
            {numberCharts.map((c) => (
              <NumberChartCard key={c.id} chart={c} />
            ))}
          </div>

          <div className="grid grid-cols-12 gap-4">
            {nonNumberCharts.map((chart) => {
              if (chart.type === "bar") {
                return <BarChartCard key={chart.id} chart={chart} />;
              } else if (chart.type === "line") {
                return <LineChartCard key={chart.id} chart={chart} />;
              }
            })}
          </div>
        </div>
      )}
    </main>
  );
}
