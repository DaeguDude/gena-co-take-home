"use client";

import { useRouter } from "next/navigation";
import { Chart, ChartType } from "./api/charts/type";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DatasetMetadata } from "./api/data/type";
import { useMemo, useState } from "react";

export function CreateChartButton() {
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  const handleCreate = async () => {
    try {
      const chartForm: Omit<Chart, "id" | "order"> = {
        dashboardId: "dashboard-1",
        dataEndPoint: "/api/data/signups_by_region",
        title: "상학이가 새로만든 차트",
        type: "number",
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
    } catch (err) {
      console.error("사용자 삭제 오류:", err);
    }
  };

  return edit ? (
    <ChartForm onCancel={() => setEdit(false)} onSave={() => setEdit(false)} />
  ) : (
    <div onClick={() => setEdit(true)}>차트생성</div>
  );
}

export function ChartForm({
  chart,
  onCancel,
  onSave,
}: {
  onCancel?: () => void;
  onSave?: () => void;
  chart?: Chart;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [title, setTitle] = useState(chart?.title ?? "");

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
  const [selectedDataset, setSelectedDataset] = useState<
    DatasetMetadata | undefined
  >(initialDataset);
  const [selectedChartType, setSelectedChartType] = useState<ChartType>();

  const handleSave = async () => {
    const isCreate = !chart;
    try {
      if (isCreate) {
        if (title && selectedDataset?.endpoint && selectedChartType) {
          const chartForm: Omit<Chart, "id" | "order"> = {
            dashboardId: "dashboard-1",
            dataEndPoint: selectedDataset.endpoint!,
            title: title,
            type: selectedChartType,
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
          queryClient.invalidateQueries({
            queryKey: ["charts", "dashboard-1"],
          });
          if (onSave) onSave();
        }
      } else {
        console.log("{title, selectedDataset, selectedChartType}: ", {
          title,
          selectedDataset,
          selectedChartType,
        });
        if (title && selectedDataset?.endpoint && selectedChartType) {
          const chartForm = {
            id: chart.id!,
            dashboardId: chart.dashboardId,
            dataEndPoint: selectedDataset.endpoint!,
            title: title,
            type: selectedChartType,
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
          queryClient.invalidateQueries({
            queryKey: ["charts", "dashboard-1"],
          });
          if (onSave) onSave();
        }
      }
    } catch (err) {
      console.error("사용자 삭제 오류:", err);
    }
  };
  return (
    <div className="mt-4">
      <h1 className="text-2xl">차트 폼</h1>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border-2"
      />

      {datasetMetadata?.map((metadata) => (
        <div
          key={metadata.name}
          className={`flex gap-8
           ${
             selectedDataset?.name === metadata.name
               ? "bg-amber-700"
               : "bg-white"
           }`}
          onClick={() => setSelectedDataset(metadata)}
        >
          <div>이름: {metadata.name}</div>
          <div>엔드포인트: {metadata.endpoint}</div>
          <div>
            선택가능한 차트 타입: {metadata.supportedChartTypes.join(",")}
          </div>
        </div>
      ))}

      <div>
        <h1 className="font-bold">차트타입:</h1>
        <div className="flex gap-4">
          {["bar", "line", "number"].map((chartType) => (
            <div
              key={chartType}
              className={`
           ${selectedChartType === chartType ? "bg-amber-700" : "bg-white"}`}
              onClick={() => setSelectedChartType(chartType as ChartType)}
            >
              {chartType}
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-8">
        <button onClick={handleSave}>생성</button>
        <button onClick={onCancel}>취소</button>
      </div>
    </div>
  );
}
