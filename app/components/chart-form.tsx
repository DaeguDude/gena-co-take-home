import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChartType } from "../api/charts/type";
import { DatasetMetadata } from "../api/data/type";
import { DatasetSelect } from "./dataset-select";
import { ChartTypeSelect } from "./chart-type-select";

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
    console.log("dataset.supportedChartTypes: ", dataset.supportedChartTypes);
    // 바뀔때 현재 선택된 타입이 unsupported type이면.. 후려치자.
    let chartType = form.chartType;
    console.log("chartType: ", chartType);
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

  console.log("form:", form);

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
