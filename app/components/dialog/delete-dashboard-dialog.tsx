import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { DialogProps } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

export function DeleteDashboardDialog({
  dashboardId,
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: DialogProps["onOpenChange"];
  dashboardId: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/dashboards/${dashboardId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delte a dashboard.");
      }

      router.refresh();
      // TODO: 대시보드리스트에서 불러와서 알맞은 곳으로 라우팅
      // TODO: 대시보드가 1개 밖에 없다면 삭제할 수 없게 처리
      router.replace("dashboard-1");
      if (onOpenChange) onOpenChange(false);
    } catch (err) {
      console.error("Failed to delte a dashboard:", err);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            dashboard and charts which belong to it.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button variant="outline">Cancel</Button>
          </AlertDialogCancel>
          <Button variant="destructive" onClick={handleDelete}>
            Delete
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
