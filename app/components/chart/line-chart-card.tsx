"use client";

import { LineChart as ReChartLine, CartesianGrid, Line, XAxis } from "recharts";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Chart, LineChartData } from "@/app/api/charts/type";
import { useMemo } from "react";
import { ChartDropdown } from "./chart-dropdown";
import { getData } from "@/app/lib";
import { useQuery } from "@tanstack/react-query";
import { isYYYYMMDD } from "@/lib/utils";
import { format } from "date-fns";
import { useIsMobile } from "@/hooks/use-mobile";

export function LineChartCard({ chart }: { chart: Chart }) {
  const { data: chartDataResponse } = useQuery({
    queryKey: [chart.id, chart.dataEndPoint],
    queryFn: async () => {
      const data = await getData(chart.dataEndPoint);
      return { type: chart.type, data } as {
        type: "line";
        data: LineChartData;
      };
    },
  });

  if (!chartDataResponse) return null;

  return <LineChart chart={chart} data={chartDataResponse.data} />;
}

function transformToChartData(lineChartData: LineChartData): {
  label: string;
  value: number;
}[] {
  const { labels, values } = lineChartData;
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

export function LineChart({
  chart,
  data,
}: {
  chart: Chart;
  data: LineChartData;
}) {
  const transformedChartData = useMemo(
    () => transformToChartData(data),
    [data]
  );

  const mobile = useIsMobile();

  return (
    <Card className="col-span-12 xl:col-span-6">
      <CardHeader>
        <div className="flex justify-between">
          <CardTitle className="text-xl">{chart.title}</CardTitle>
          <ChartDropdown chart={chart} />
        </div>
        {/* <CardDescription>January - June 2024</CardDescription> */}
      </CardHeader>
      <CardContent>
        {/* NOTE: min-h-[value] is required: https://ui.shadcn.com/docs/components/chart */}
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <ReChartLine accessibilityLayer data={transformedChartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="label"
              tickLine={false}
              axisLine={false}
              minTickGap={32}
              tickMargin={8}
              tickFormatter={(value) => {
                const isDateFormat = isYYYYMMDD(value);
                if (isDateFormat) {
                  return format(new Date(value), "MMM d");
                } else {
                  return mobile ? value.slice(0, 3) : value;
                }
              }}
            />
            <ChartTooltip content={<ChartTooltipContent />} />
            <Line dataKey="value" type="monotone" strokeWidth={2} dot={false} />
          </ReChartLine>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
