"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Chart } from "../api/charts/type";
import { ChartForm } from "../create-chart";

export function UpdateChartButton({ chart }: { chart: Chart }) {
  const [edit, setEdit] = useState(false);
  const router = useRouter();

  const reset = () => {
    setEdit(false);
  };

  const handleUpdate = async () => {
    try {
      // DELETE 요청을 /api/users 엔드포인트로 보냄
      // 쿼리 파라미터로 userId를 전달
      const response = await fetch(`/api/dashboards/${chart.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
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
  };

  return edit ? (
    <ChartForm onCancel={() => setEdit(false)} chart={chart} />
  ) : (
    <button onClick={() => setEdit(true)}>차트수정</button>
  );
}
