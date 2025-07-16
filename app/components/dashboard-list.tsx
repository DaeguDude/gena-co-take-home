"use client";

import { useState } from "react";
import { Dashboard, Dashboard as TDashboard } from "../api/dashboards/type";
import { CreateDashboardButton } from "./create-dashboard";
import { DeleteDashboardButton } from "./delete-dashboard";
import { UpdateDashboardButton } from "./update-dashboard";
import { useQuery } from "@tanstack/react-query";
import { Chart } from "../api/charts/type";
import { DeleteChartButton } from "../delete-chart-button";
import { XXChart } from "./chart";

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

async function getData(endpoint: string) {
  const res = await fetch(`http://localhost:3000/api/data/${endpoint}`, {
    cache: "no-store",
    next: {
      tags: [`data/${endpoint}`],
    },
  });

  if (!res.ok) {
    throw new Error(`데이터를 가져오는 데 실패했어: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}

export function DashboardList({ dashboards }: { dashboards: TDashboard[] }) {
  const [selected, setSelected] = useState<Dashboard>();

  const { data } = useQuery({
    queryKey: ["charts", selected?.id],
    queryFn: async () => {
      if (!selected?.id) {
        return [];
      }

      const chartIds = selected.charts;
      console.log("chartIds: ", chartIds);
      const charts = await getCharts(chartIds);
      return charts;
    },
    enabled: selected && selected.charts && selected.charts.length > 0,
  });

  const charts = data ?? [];

  const handleClickDashboard = (dashboard: Dashboard) => {
    setSelected(dashboard);
  };

  return (
    <div className="mt-4">
      <h1 className="text-5xl">dashboards</h1>
      {dashboards.map((dashboard) => (
        <div
          key={dashboard.id}
          className="flex gap-8 cursor-pointer"
          onClick={() => handleClickDashboard(dashboard)}
        >
          <div>{dashboard.id}</div>
          <div>{dashboard.name}</div>
          <UpdateDashboardButton dashboard={dashboard} />
          <DeleteDashboardButton dashboard={dashboard} />
        </div>
      ))}
      <CreateDashboardButton />

      <div className="mt-4">
        <h1 className="font-bold">SELECTED DASHBOARD: {selected?.name}</h1>
        {charts.map((chart) => (
          <div key={chart.id} className="flex gap-8">
            <XXChart key={chart.id} chart={chart} />
          </div>
        ))}
      </div>
    </div>
  );
}
