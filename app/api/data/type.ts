import { ChartType } from "../charts/type";

export type DatasetMetadata = {
  endpoint: string;
  name: string;
  supportedChartTypes: ChartType[];
};
