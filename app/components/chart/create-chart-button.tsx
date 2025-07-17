import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import { useState } from "react";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { ChartForm, TChartForm } from "./chart-form";
import { Chart, ChartType } from "@/app/api/charts/type";

const formSchema = z.object({
  title: z.string(),
  dashboardId: z.string(),
  type: z.string(),
  dataEndPoint: z.string(),
});

export function CreateChartButton({ dashboardId }: { dashboardId: string }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState<TChartForm>({
    title: "",
    chartType: undefined,
    dataset: undefined,
  });

  const reset = () => {
    setForm({
      title: "",
      chartType: undefined,
      dataset: undefined,
    });
    setOpen(false);
  };

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
        reset();
      } catch (err) {
        console.error("사용자 삭제 오류:", err);
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <CirclePlus /> create chart
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Chart</DialogTitle>
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
      </form>
    </Dialog>
  );
}
