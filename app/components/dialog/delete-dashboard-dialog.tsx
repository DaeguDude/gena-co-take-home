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
