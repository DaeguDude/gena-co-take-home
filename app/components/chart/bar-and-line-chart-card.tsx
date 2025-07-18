"use client";

import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { BarChartData, Chart, LineChartData } from "@/app/api/charts/type";
import { useMemo } from "react";
import { ChartDropdown } from "./chart-dropdown";
import { getData } from "@/app/lib";
import { useQuery } from "@tanstack/react-query";

export function BarAndLineChartCard({ chart }: { chart: Chart }) {
  const { data: chartDataResponse } = useQuery({
    queryKey: [chart.id, chart.dataEndPoint],
    queryFn: async () => {
      const data = await getData(chart.dataEndPoint);
      return { type: chart.type, data } as {
        type: "bar" | "line";
        data: BarChartData | LineChartData;
      };
    },
  });

  if (!chartDataResponse) return null;

  return <BarAndLineChart chart={chart} data={chartDataResponse.data} />;
}

export const description = "A bar chart";

function transformToChartData(barChartData: BarChartData): {
  label: string;
  value: number;
}[] {
  const { labels, values } = barChartData;
  // NOTE: vunerable since their length wouldn't match
  // We will use the shorter one and display only cut ones
  const minLength = Math.min(labels.length, values.length);

  return Array.from({ length: minLength }, (_, i) => ({
    label: labels[i],
    value: values[i],
  }));
}

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig;

export function BarAndLineChart({
  chart,
  data,
}: {
  chart: Chart;
  data: BarChartData;
}) {
  const transformedChartData = useMemo(
    () => transformToChartData(data),
    [data]
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle>{chart.title}</CardTitle>
          <ChartDropdown chart={chart} />
        </div>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={transformedChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="var(--color-desktop)" radius={8} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
