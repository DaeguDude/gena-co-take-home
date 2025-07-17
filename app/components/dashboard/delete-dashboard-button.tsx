import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteDashboardButton({
  dashboardId,
}: {
  dashboardId: string;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      // DELETE 요청을 /api/users 엔드포인트로 보냄
      // 쿼리 파라미터로 userId를 전달
      const response = await fetch(`/api/dashboards/${dashboardId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delte a dashboard.");
      }

      // 새로운 라우터로.... 옮겨줘야하지
      router.refresh();
      // TODO: 대시보드리스트에서 불러와서 알맞은 곳으로 라우팅
      // TODO: 대시보드가 1개 밖에 없다면 삭제할 수 없게 처리
      router.replace("dashboard-1");
      setOpen(false);
    } catch (err) {
      console.error("Failed to delte a dashboard:", err);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
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
