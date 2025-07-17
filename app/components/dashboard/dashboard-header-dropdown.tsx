import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { UpdateDashboardButton } from "./update-dashboard-button";
import { Dashboard } from "../../api/dashboards/type";
import { DeleteDashboardButton } from "./delete-dashboard-button";

export function DashboardHeaderDropdown({
  dashboard,
}: {
  dashboard: Dashboard;
}) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm">
          <Ellipsis />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuItem asChild>
          <UpdateDashboardButton dashboard={dashboard} />
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem variant="destructive" asChild>
          <DeleteDashboardButton dashboardId={dashboard.id} />
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
