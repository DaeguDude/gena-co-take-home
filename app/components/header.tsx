"use client";

import { TypographyH2 } from "@/components/ui/typography";
import { Dashboard } from "../api/dashboards/type";
import { DashboardHeaderDropdown } from "./dashboard/dashboard-header-dropdown";
import { CreateChartButton } from "./chart/create-chart-button";

export function Header({ dashboard }: { dashboard: Dashboard }) {
  return (
    <header className="min-h-[76px] h-[76px] flex items-center border-gray-200 border-1">
      <div className="flex flex-1 px-4 justify-between items-center">
        <TypographyH2>김상학 대시보드</TypographyH2>
        <div className="flex gap-2">
          <div className="flex gap-1 items-center">
            <CreateChartButton dashboardId={dashboard.id} />
          </div>
          <div className="flex items-center">
            <DashboardHeaderDropdown dashboard={dashboard} />
          </div>
        </div>
      </div>
    </header>
  );
}
