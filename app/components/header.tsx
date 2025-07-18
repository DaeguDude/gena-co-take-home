"use client";

import { Dashboard } from "../api/dashboards/type";
import { DashboardHeaderDropdown } from "./dashboard/dashboard-header-dropdown";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CirclePlus, Menu, X } from "lucide-react";
import { CreateChartDialog } from "./dialog";
import { SideSheet } from "./side-sheet";

export function Header({ dashboard }: { dashboard: Dashboard }) {
  const [createChartDialogOpen, setCreateChartDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-52 bg-white min-h-[48px] h-[48px] flex items-center border-gray-200 border-1">
        <div className="flex flex-1 px-4 justify-between items-center">
          <div className="flex gap-2 items-center">
            <div className="flex items-center md:hidden">
              <Button
                variant="outline"
                size="sm"
                className={`${sheetOpen ? "bg-gray-100" : "bg-white"}`}
                onClick={() => setSheetOpen(true)}
              >
                {sheetOpen ? <X /> : <Menu />}
              </Button>
            </div>
            <div>
              <span className="text-base font-semibold">{dashboard.name}</span>
            </div>
          </div>
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

      {sheetOpen && <SideSheet open={sheetOpen} onOpenChange={setSheetOpen} />}

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
