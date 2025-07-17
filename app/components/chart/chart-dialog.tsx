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
import { useMemo, useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ChartForm, TChartForm } from "./chart-form";
import { useQuery } from "@tanstack/react-query";
import { Chart, ChartType } from "@/app/api/charts/type";
import { DatasetMetadata } from "@/app/api/data/type";
import { DialogProps } from "@radix-ui/react-dialog";

const formSchema = z.object({
  id: z.string(),
  dashboardId: z.string(),
  dataEndPoint: z.string(),
  title: z.string(),
  type: z.string(),
});

// TODO: dataset 변경시 Type 제대로 변경안되는거 고쳐주기
export function ChartDialog({
  chart,
  open,
  onOpenChange,
}: {
  chart: Chart;
  open: boolean;
  onOpenChange: DialogProps["onOpenChange"];
}) {
  const router = useRouter();

  const { data: datasetMetadata } = useQuery({
    queryKey: ["dataset"],
    queryFn: async () => {
      const res = await fetch("http://localhost:3000/api/data", {
        cache: "no-cache",
      });

      if (!res.ok) {
        throw new Error(`사용가능한 데이터셋을 찾아오는데 실패`);
      }

      const data: DatasetMetadata[] = await res.json();
      return data;
    },
  });

  const initialDataset = useMemo(() => {
    const found = datasetMetadata?.find(
      (metadata) => metadata.endpoint === chart?.dataEndPoint
    );
    return found;
  }, [chart?.dataEndPoint, datasetMetadata]);

  const [form, setForm] = useState<TChartForm>({
    title: chart.title,
    chartType: chart.type,
    dataset: initialDataset,
  });

  const handleSave = async () => {
    const validated = formSchema.safeParse({
      id: chart.id,
      title: form.title,
      dashboardId: chart.dashboardId,
      type: form.chartType,
      dataEndPoint: form.dataset?.endpoint,
    });

    if (!validated.success) {
      return console.log("Failed to validate");
    } else {
      try {
        const chartForm = {
          id: chart.id,
          dashboardId: validated.data.dashboardId,
          dataEndPoint: validated.data.dataEndPoint,
          title: validated.data.title,
          type: validated.data.type as ChartType,
        };

        const response = await fetch(`/api/charts`, {
          method: "PUT",
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
          <DialogTitle>Update Chart</DialogTitle>
          <DialogDescription>
            This dashboard gives you a quick glance at your most important
            analytics, charts, and insights. Easily track trends, performance,
            and key metrics in real-time.
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
