export type Chart = {
  id: string;
  dashboardId: string;
  type: "bar" | "line" | "number";
  title: string;
  dataEndPoint: string;
  order: number;
};
