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
import { baseUrl } from "@/lib/constant";
import { DialogProps } from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";

export function DeleteChartDialog({
  chartId,
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: DialogProps["onOpenChange"];
  chartId: string;
}) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/charts/${chartId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "사용자 삭제에 실패했어.");
      }

      router.refresh();
      if (onOpenChange) onOpenChange(false);
    } catch (err) {
      console.error("사용자 삭제 오류:", err);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            chart.
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
