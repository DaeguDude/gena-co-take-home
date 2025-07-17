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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectItem,
} from "@/components/ui/select";
import { CirclePlus } from "lucide-react";
import { Chart, ChartType } from "../api/charts/type";
import { useQueryClient, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import { DatasetMetadata } from "../api/data/type";
import { DatasetSelect } from "./dataset-select";
import { ChartTypeSelect } from "./chart-type-select";

export function CreateChartButton({ dashboardId }: { dashboardId: string }) {
  const queryClient = useQueryClient();
  // const [title, setTitle] = useState(chart?.title ?? "");

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

  console.log("datasetMetadata: ", datasetMetadata);

  const [selectedDataset, setSelectedDataset] = useState<
    DatasetMetadata | undefined
  >();
  const [selectedChartType, setSelectedChartType] = useState<ChartType>();

  return (
    <Dialog>
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
          <div className="grid gap-4">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Datasets</Label>
              <DatasetSelect onSelect={(data) => console.log(data)} />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="name-1">Type</Label>
              <ChartTypeSelect supportedChartTypes={["bar", "line"]} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
