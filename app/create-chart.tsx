"use client";

import { useRouter } from "next/navigation";
import { Chart } from "./api/charts/type";

export function CreateChartButton() {
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

  return <button onClick={handleCreate}>차트생성</button>;
}
