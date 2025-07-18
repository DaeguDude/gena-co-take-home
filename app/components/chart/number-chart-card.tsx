"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
        <div className="flex justify-between items-center">
          <span className="text-muted-foreground font-semibold">
            {chart.title}
          </span>
          <ChartDropdown chart={chart} />
        </div>
      </CardHeader>
      <CardContent className="flex items-center justify-center">
        <span className="font-bold">{chartDataResponse.data.value}</span>
      </CardContent>
    </Card>
  );
}
