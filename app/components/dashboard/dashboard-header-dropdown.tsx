import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { DashboardDialog } from "./update-dashboard-button";
import { Dashboard } from "../../api/dashboards/type";
import { DeleteDashboardDialog } from "./delete-dashboard-dialog";
import { useState } from "react";

export function DashboardHeaderDropdown({
  dashboard,
}: {
  dashboard: Dashboard;
}) {
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm">
            <Ellipsis />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="start">
          <DropdownMenuItem onClick={() => setEditDialogOpen(true)}>
            수정
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => setDeleteDialogOpen(true)}
            variant="destructive"
          >
            삭제
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {editDialogOpen && (
        <DashboardDialog
          dashboard={dashboard}
          open={editDialogOpen}
          onOpenChange={setEditDialogOpen}
        />
      )}

      {/* TODO: refresh does not work */}
      {deleteDialogOpen && (
        <DeleteDashboardDialog
          dashboardId={dashboard.id}
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
        />
      )}
    </>
  );
}
