"use client";
import { useQuery } from "@tanstack/react-query";
import {
  BarChartData,
  Chart,
  LineChartData,
  NumberChartData,
} from "../api/charts/type";
import { DeleteChartButton } from "../delete-chart-button";
import { UpdateChartButton } from "./update-chart-button";

async function getData(endpoint: string) {
  const res = await fetch(`http://localhost:3000${endpoint}`, {
    cache: "no-store",
    next: {
      tags: [`data-${endpoint}`],
    },
  });

  if (!res.ok) {
    throw new Error(`데이터를 가져오는 데 실패했어: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}

export function XXChart({ chart }: { chart: Chart }) {
  const { data: chartDataResponse } = useQuery({
    queryKey: [chart.id, chart.dataEndPoint],
    queryFn: async () => {
      const data = await getData(chart.dataEndPoint);
      return { type: chart.type, data } as ChartDataResponse;
    },
  });

  return (
    <div key={chart.id} className="flex gap-8">
      <div>{chart.id}</div>
      <div>{chart.title}</div>
      <div>{chart.type}</div>
      <UpdateChartButton chart={chart} />
      <DeleteChartButton chart={chart} />

      <div className="mt-2">
        <h1 className="text-2xl font-semibold">Chart Data</h1>
        {chartDataResponse && <ChartDataDisplay {...chartDataResponse} />}
      </div>
    </div>
  );
}

type ChartDataResponse =
  | { type: "bar"; data: BarChartData }
  | { type: "line"; data: LineChartData }
  | { type: "number"; data: NumberChartData };

function ChartDataDisplay({ type, data }: ChartDataResponse) {
  if (type === "bar" || type === "line") {
    return (
      <div>
        <div>{data.labels.map((l) => l)}</div>
        <div>{data.values.map((v) => v)}</div>
      </div>
    );
  }

  return <div>{data.value}</div>;
}
