"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Chart, NumberChartData } from "@/app/api/charts/type";
import { ChartDropdown } from "./chart-dropdown";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/app/lib";
import { Banknote, Flag, RotateCcwSquare, ShoppingCart } from "lucide-react";

function getIcon(endPoint: string) {
  switch (endPoint) {
    case "/api/data/total_revenue":
      return Banknote;
    case "/api/data/total_orders":
      return ShoppingCart;
    case "/api/data/refund_count":
      return RotateCcwSquare;
    default:
      return Flag;
  }
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

  const Icon = getIcon(chart.dataEndPoint);

  return (
    <Card className="col-span-12 md:col-span-6 lg:col-span-4">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div className="h-[48px] w-[48px] rounded-xl bg-gray-100 flex items-center justify-center">
            <Icon strokeWidth={1.5} />
          </div>
          <ChartDropdown chart={chart} />
        </div>
      </CardHeader>
      <CardContent className="flex flex-col gap-1">
        <span className="text-sm text-muted-foreground font-semibold">
          {chart.title}
        </span>
        <span className="text-xl font-bold">
          {chartDataResponse.data.value.toLocaleString()}
        </span>
      </CardContent>
    </Card>
  );
}
