import { NextResponse } from "next/server";
import { DatasetMetadata } from "./type";

export function GET() {
  const dataset: DatasetMetadata[] = [
    {
      endpoint: "/api/data/orders_over_time",
      name: "orders_over_time",
      supportedChartTypes: ["bar", "line"],
    },
    {
      endpoint: "/api/data/signups_by_region",
      name: "signups_by_region",
      supportedChartTypes: ["bar", "line"],
    },
    {
      endpoint: "/api/data/total_revenue",
      name: "total_revenue",
      supportedChartTypes: ["number"],
    },
  ];

  return NextResponse.json(dataset);
}
