import { Chart } from "./type";

const CHART_ID_PREFIX = "chart";
let CHART_ID_SEQUENCE = 0;

export function getNewChartId() {
  CHART_ID_SEQUENCE += 1;
  return `${CHART_ID_PREFIX}-${CHART_ID_SEQUENCE}`;
}

export function getNewOrder() {
  const lastOrder = charts[charts.length - 1].order;
  return lastOrder + 1;
}

export let charts: Chart[] = [
  // -----LINE-----
  {
    id: getNewChartId(),
    dashboardId: "dashboard-1",
    type: "line",
    title: "Orders Over Time",
    dataEndPoint: "/api/data/orders_over_time",
    order: 1,
  },
  {
    id: getNewChartId(),
    dashboardId: "dashboard-1",
    type: "line",
    title: "Revenues Over Time",
    dataEndPoint: "/api/data/revenues_over_time",
    order: 2,
  },
  {
    id: getNewChartId(),
    dashboardId: "dashboard-1",
    type: "line",
    title: "Vists Over Time",
    dataEndPoint: "/api/data/visits_over_time",
    order: 3,
  },
  // -----BAR-----
  {
    id: getNewChartId(),
    dashboardId: "dashboard-1",
    type: "bar",
    title: "Orders By Category",
    dataEndPoint: "/api/data/orders_by_category",
    order: 4,
  },
  {
    id: getNewChartId(),
    dashboardId: "dashboard-1",
    type: "bar",
    title: "Revenues By Month",
    dataEndPoint: "/api/data/revenue_by_month",
    order: 5,
  },
  {
    id: getNewChartId(),
    dashboardId: "dashboard-1",
    type: "bar",
    title: "Signups By Region",
    dataEndPoint: "/api/data/signups_by_region",
    order: 6,
  },
  {
    id: getNewChartId(),
    dashboardId: "dashboard-1",
    type: "bar",
    title: "Users By Device",
    dataEndPoint: "/api/data/users_by_device",
    order: 7,
  },
  // -----NUMBER-----
  {
    id: getNewChartId(),
    dashboardId: "dashboard-1",
    type: "number",
    title: "Total Revenue",
    dataEndPoint: "/api/data/total_revenue",
    order: 8,
  },
  {
    id: getNewChartId(),
    dashboardId: "dashboard-1",
    type: "number",
    title: "Total Orders",
    dataEndPoint: "/api/data/total_orders",
    order: 9,
  },
  {
    id: getNewChartId(),
    dashboardId: "dashboard-1",
    type: "number",
    title: "Refund Count",
    dataEndPoint: "/api/data/refund_count",
    order: 10,
  },
];

export function deleteChart(id: string) {
  charts = charts.filter((c) => c.id !== id);
}
