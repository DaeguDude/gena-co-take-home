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
  {
    id: getNewChartId(),
    dashboardId: "dashboard-1",
    type: "bar",
    title: "월별 판매량",
    dataEndPoint: "/api/data/orders_over_time",
    order: 1,
  },
  {
    id: getNewChartId(),
    dashboardId: "dashboard-1",
    type: "line",
    title: "국가별 회원수",
    dataEndPoint: "/api/data/signups_by_region",
    order: 2,
  },
  {
    id: getNewChartId(),
    dashboardId: "dashboard-1",
    type: "number",
    title: "Total Revenue",
    dataEndPoint: "/api/data/total_revenue",
    order: 3,
  },
  {
    id: getNewChartId(),
    dashboardId: "dashboard-1",
    type: "number",
    title: "Total Orders",
    dataEndPoint: "/api/data/total_orders",
    order: 4,
  },
  {
    id: getNewChartId(),
    dashboardId: "dashboard-1",
    type: "number",
    title: "Refund Count",
    dataEndPoint: "/api/data/refund_count",
    order: 5,
  },
];

export function deleteChart(id: string) {
  charts = charts.filter((c) => c.id !== id);
}
