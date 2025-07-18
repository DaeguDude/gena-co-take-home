import { Dashboard } from "./type";

const DASHBOARD_ID_PREFIX = "dashboard";
let DASHBOARD_ID_SEQUENCE = 0;

export function getNewDashboardId() {
  DASHBOARD_ID_SEQUENCE += 1;
  return `${DASHBOARD_ID_PREFIX}-${DASHBOARD_ID_SEQUENCE}`;
}

export let dashboards: Dashboard[] = [
  {
    id: getNewDashboardId(),
    name: "일일 매출 현황판",
    charts: [
      "chart-1",
      "chart-2",
      "chart-3",
      "chart-4",
      "chart-5",
      "chart-6",
      "chart-7",
      "chart-8",
      "chart-9",
      "chart-10",
    ], // sales_chart_01, sales_chart_02, product_chart_01
  },
  {
    id: getNewDashboardId(),
    name: "마케팅 캠페인 대시보드",
    charts: ["c-m01", "c-m02"], // marketing_chart_01, marketing_chart_02
  },
  {
    id: getNewDashboardId(),
    name: "운영 효율성 모니터링",
    charts: ["c-o01"], // operation_chart_01
  },
];

export function deleteDashboard(id: string) {
  dashboards = dashboards.filter((d) => d.id !== id);
}
