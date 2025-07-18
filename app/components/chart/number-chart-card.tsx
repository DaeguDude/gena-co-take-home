"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Chart, NumberChartData } from "@/app/api/charts/type";
import { ChartDropdown } from "./chart-dropdown";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/app/lib";

export function NumberCharts({ charts }: { charts: Chart[] }) {
  return (
    <div className="grid grid-cols-12 gap-4">
      {charts.map((c) => (
        <NumberChartCard key={c.id} chart={c} />
      ))}
    </div>
  );
}

export function NumberChartCard({ chart }: { chart: Chart }) {
  const { data: chartDataResponse } = useQuery({
    queryKey: [chart.id, chart.dataEndPoint],
    queryFn: async () => {
      const data = await getData(chart.dataEndPoint);
      return { type: chart.type, data } as {
        type: "number";
        data: NumberChartData;
      };
    },
  });

  if (!chartDataResponse) return null;

  return (
    <Card className="col-span-12 md:col-span-6 lg:col-span-4">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{chart.title}</CardTitle>
          <ChartDropdown chart={chart} />
        </div>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <span className="font-bold">{chartDataResponse.data.value}</span>
      </CardContent>
    </Card>
  );
}
