import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChartTypeSelect } from "./chart-type-select";
import { DatasetMetadata } from "@/app/api/data/type";
import { ChartType } from "@/app/api/charts/type";
import { DatasetSelect } from "../dataset-select";

export type TChartForm = {
  title: string;
  dataset: DatasetMetadata | undefined;
  chartType: ChartType | undefined;
};

export function ChartForm({
  form,
  onChange,
}: {
  form: TChartForm;
  onChange?: (data: TChartForm) => void;
}) {
  const handleChangeTitle = (title: string) => {
    if (onChange) {
      onChange({
        ...form,
        title,
      });
    }
  };
  const handleChangeDataset = (dataset: DatasetMetadata) => {
    let chartType = form.chartType;
    if (chartType && !dataset.supportedChartTypes.includes(chartType)) {
      chartType = undefined;
    }

    if (onChange)
      onChange({
        ...form,
        dataset,
        chartType,
      });
  };
  const handleChangeChartType = (chartType: ChartType) => {
    if (onChange)
      onChange({
        ...form,
        chartType,
      });
  };

  return (
    <div className="grid gap-4">
      <div className="flex flex-col gap-3">
        <Label>Title</Label>
        <Input
          value={form.title}
          placeholder="Title"
          onChange={(e) => handleChangeTitle(e.target.value)}
        />
      </div>
      <div className="flex flex-col gap-3">
        <Label>Datasets</Label>
        <DatasetSelect value={form.dataset} onSelect={handleChangeDataset} />
      </div>
      <div className="flex flex-col gap-3">
        <Label>Type</Label>
        <ChartTypeSelect
          value={form.chartType}
          supportedChartTypes={form.dataset?.supportedChartTypes}
          onSelect={handleChangeChartType}
        />
      </div>
    </div>
  );
}
