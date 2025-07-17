"use client";

import { Button } from "@/components/ui/button";
import { TypographyH2 } from "@/components/ui/typography";
import { Ellipsis } from "lucide-react";
import { CreateChartButton } from "./create-chart-button";
import { Dashboard } from "../api/dashboards/type";

export function Header({ dashboard }: { dashboard: Dashboard }) {
  console.log("dashboard: ", dashboard);

  return (
    <header className="min-h-[76px] h-[76px] flex items-center border-gray-200 border-1">
      <div className="flex flex-1 px-4 justify-between items-center">
        <TypographyH2>김상학 대시보드</TypographyH2>
        <div className="flex gap-2">
          <div className="flex gap-1 items-center">
            <CreateChartButton dashboardId={dashboard.id} />
          </div>
          <div className="flex items-center">
            <Button variant="outline" size="sm">
              <Ellipsis
                onClick={() =>
                  console.log("이름 편집, 삭제 할 수 있는 popper뜨게 작업")
                }
              />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
