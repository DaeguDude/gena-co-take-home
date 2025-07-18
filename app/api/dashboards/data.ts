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
    name: "Dashboard-1",
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
    ],
  },
  {
    id: getNewDashboardId(),
    name: "Dashboard-2",
    charts: [],
  },
  {
    id: getNewDashboardId(),
    name: "Dashboard-3",
    charts: [],
  },
];

export function deleteDashboard(id: string) {
  dashboards = dashboards.filter((d) => d.id !== id);
}
