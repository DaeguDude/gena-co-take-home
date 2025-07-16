import { Dashboard } from "./api/dashboards/type";
import { CreateDashboardButton } from "./create-dashboard";
import { UpdateDashboardButton } from "./update-dashboard";
import { DeleteDashboardButton } from "./delete-dashboard";
import { Chart } from "./api/charts/type";
import { DeleteChartButton } from "./delete-chart-button";
import { CreateChartButton } from "./create-chart";

async function getCharts(): Promise<Chart[]> {
  const res = await fetch("http://localhost:3000/api/charts", {
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

async function getDashboards(): Promise<Dashboard[]> {
  const res = await fetch("http://localhost:3000/api/dashboards", {
    cache: "no-store",
    next: {
      tags: ["dashboards"],
    },
  });

  if (!res.ok) {
    throw new Error(
      `대시보드 데이터를 가져오는 데 실패했어: ${res.statusText}`
    );
  }

  // 응답을 JSON으로 파싱하고 정의된 타입으로 캐스팅
  const data: Dashboard[] = await res.json();
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

async function getChart(id: string): Promise<Dashboard> {
  const res = await fetch(`http://localhost:3000/api/charts/${id}`, {
    cache: "no-store",
    next: {
      tags: [`chart-${id}`],
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

export default async function Home() {
  const dashboards = await getDashboards();
  const charts = await getCharts();
  const chart = await getChart("chart-1");

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <div>
          <div className="mt-4">
            <h1 className="text-5xl">charts</h1>
            {charts.map((chart) => (
              <div key={chart.id} className="flex gap-8">
                <div>{chart.id}</div>
                <div>{chart.title}</div>
                <div>{chart.type}</div>
                <DeleteChartButton chart={chart} />
              </div>
            ))}
            <CreateChartButton />
          </div>

          <div className="mt-4">
            <h1 className="text-5xl">dashboards</h1>
            {dashboards.map((dashboard) => (
              <div key={dashboard.id} className="flex gap-8">
                <div>{dashboard.id}</div>
                <div>{dashboard.name}</div>
                <UpdateDashboardButton dashboard={dashboard} />
                <DeleteDashboardButton dashboard={dashboard} />
              </div>
            ))}
            <CreateDashboardButton />
          </div>
        </div>
      </main>
    </div>
  );
}
