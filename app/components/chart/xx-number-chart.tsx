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
import { BarChartData, Chart, NumberChartData } from "@/app/api/charts/type";
import { useMemo } from "react";
import { ChartDropdown } from "./chart-dropdown";

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

// TODO: minimum width를 지정해줘야함
export function XXNumberChart({
  chart,
  data,
}: {
  chart: Chart;
  data: NumberChartData;
}) {
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
        {/* <ChartContainer config={chartConfig}>
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
        </ChartContainer> */}
      </CardContent>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="flex gap-2 leading-none font-medium">
          Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="text-muted-foreground leading-none">
          Showing total visitors for the last 6 months
        </div>
      </CardFooter>
    </Card>
  );
}
