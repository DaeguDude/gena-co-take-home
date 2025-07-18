import { Snail } from "lucide-react";
import { CreateChartButton } from "../chart/create-chart-button";

export function Empty({ dashboardId }: { dashboardId: string }) {
  return (
    <div className="flex-1 w-full flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <Snail width={150} height={150} strokeWidth={1} />
        <span className="text-2xl text-center break-words">E M P T Y</span>
        <CreateChartButton dashboardId={dashboardId} />
      </div>
    </div>
  );
}
