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
      endpoint: "/api/data/revenues_over_time",
      name: "revenues_over_time",
      supportedChartTypes: ["bar", "line"],
    },
    {
      endpoint: "/api/data/visits_over_time",
      name: "visits_over_time",
      supportedChartTypes: ["bar", "line"],
    },
    {
      endpoint: "/api/data/signups_by_region",
      name: "signups_by_region",
      supportedChartTypes: ["bar", "line"],
    },
    {
      endpoint: "/api/data/users_by_device",
      name: "users_by_device",
      supportedChartTypes: ["bar", "line"],
    },
    {
      endpoint: "/api/data/orders_by_category",
      name: "orders_by_category",
      supportedChartTypes: ["bar", "line"],
    },
    {
      endpoint: "/api/data/revenue_by_month",
      name: "revenue_by_month",
      supportedChartTypes: ["bar", "line"],
    },
    {
      endpoint: "/api/data/total_revenue",
      name: "total_revenue",
      supportedChartTypes: ["number"],
    },
    {
      endpoint: "/api/data/total_orders",
      name: "total_orders",
      supportedChartTypes: ["number"],
    },
    {
      endpoint: "/api/data/refund_count",
      name: "refund_count",
      supportedChartTypes: ["number"],
    },
  ];

  return NextResponse.json(dataset);
}
