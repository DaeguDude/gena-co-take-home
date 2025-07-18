"use client";

import { Dashboard } from "../api/dashboards/type";
import { DashboardHeaderDropdown } from "./dashboard/dashboard-header-dropdown";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { CreateChartDialog } from "./dialog";

export function Header({ dashboard }: { dashboard: Dashboard }) {
  const [createChartDialogOpen, setCreateChartDialogOpen] = useState(false);

  return (
    <>
      <header className="min-h-[48px] h-[48px] flex items-center border-gray-200 border-1">
        <div className="flex flex-1 px-4 justify-between items-center">
          <span className="text-base font-semibold">{dashboard.name}</span>
          <div className="flex gap-2">
            <div className="flex gap-1 items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCreateChartDialogOpen(true)}
              >
                <CirclePlus /> Create chart
              </Button>
            </div>
            <div className="flex items-center">
              <DashboardHeaderDropdown dashboard={dashboard} />
            </div>
          </div>
        </div>
      </header>

      {createChartDialogOpen && (
        <CreateChartDialog
          dashboardId={dashboard.id}
          onOpenChange={setCreateChartDialogOpen}
          open={createChartDialogOpen}
        />
      )}
    </>
  );
}
