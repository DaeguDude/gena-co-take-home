export type ChartType = "bar" | "line" | "number";

export type Chart = {
  id: string;
  dashboardId: string;
  type: ChartType;
  title: string;
  dataEndPoint: string;
  order: number;
};

export type BarChartData = {
  labels: string[];
  values: number[];
};

export type LineChartData = {
  labels: string[];
  values: number[];
};

export type NumberChartData = {
  value: number;
};
