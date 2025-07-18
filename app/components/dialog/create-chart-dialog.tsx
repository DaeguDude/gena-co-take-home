import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ChartForm, TChartForm } from "../chart/chart-form";
import { Chart, ChartType } from "@/app/api/charts/type";
import { DialogProps } from "@radix-ui/react-dialog";

const formSchema = z.object({
  title: z.string(),
  dashboardId: z.string(),
  type: z.string(),
  dataEndPoint: z.string(),
});

// dataset 변경시 Type 제대로 변경안되는거 고쳐주기
export function CreateChartDialog({
  dashboardId,
  open,
  onOpenChange,
}: {
  dashboardId: string;
  open: boolean;
  onOpenChange: DialogProps["onOpenChange"];
}) {
  const router = useRouter();

  const [form, setForm] = useState<TChartForm>({
    title: "",
    chartType: undefined,
    dataset: undefined,
  });

  const handleSave = async () => {
    const validated = formSchema.safeParse({
      title: form.title,
      dashboardId,
      type: form.chartType,
      dataEndPoint: form.dataset?.endpoint,
    });

    if (!validated.success) {
      return console.log("Failed to validate");
    } else {
      try {
        const chartForm: Omit<Chart, "id" | "order"> = {
          dashboardId: validated.data.dashboardId,
          dataEndPoint: validated.data.dataEndPoint,
          title: validated.data.title,
          type: validated.data.type as ChartType,
        };

        const response = await fetch(`/api/charts`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(chartForm),
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
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create Chart</DialogTitle>
          <DialogDescription>
            Create a new chart by setting the title, selecting a dataset, and
            choosing a chart type.
          </DialogDescription>
        </DialogHeader>
        <ChartForm form={form} onChange={setForm} />
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
