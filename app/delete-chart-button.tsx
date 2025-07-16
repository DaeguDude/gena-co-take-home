"use client";

import { useRouter } from "next/navigation";
import { Chart } from "./api/charts/type";

export function DeleteChartButton({ chart }: { chart: Chart }) {
  const router = useRouter();

  const handleDelete = async () => {
    try {
      // DELETE 요청을 /api/users 엔드포인트로 보냄
      // 쿼리 파라미터로 userId를 전달
      const response = await fetch(`/api/charts/${chart.id}`, {
        method: "DELETE",
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

  return <button onClick={handleDelete}>차트 Delete</button>;
}
