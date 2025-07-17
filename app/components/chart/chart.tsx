"use client";
import { useQuery } from "@tanstack/react-query";

import {
  BarChartData,
  Chart,
  LineChartData,
  NumberChartData,
} from "@/app/api/charts/type";
import { XXBarChart } from "./xx-bar-chart";

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
      {chartDataResponse && (
        <ChartDataDisplay {...chartDataResponse} chart={chart} />
      )}
    </div>
  );
}

type ChartDataResponse =
  | { type: "bar"; data: BarChartData }
  | { type: "line"; data: LineChartData }
  | { type: "number"; data: NumberChartData };

function ChartDataDisplay({
  type,
  data,
  chart,
}: ChartDataResponse & { chart: Chart }) {
  if (type === "bar" || type === "line") {
    return (
      <XXBarChart chart={chart} data={data} />
      // <div>
      //   <div>{data.labels.map((l) => l)}</div>
      //   <div>{data.values.map((v) => v)}</div>
      // </div>
    );
  }

  return <div>{data.value}</div>;
}
