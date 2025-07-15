"use client";

import { useRouter } from "next/navigation";

export function CreateDashboardButton() {
  const router = useRouter();

  const handleCreate = async () => {
    try {
      const name = "상학이대시보드";
      // DELETE 요청을 /api/users 엔드포인트로 보냄
      // 쿼리 파라미터로 userId를 전달
      const response = await fetch(`/api/dashboards`, {
        method: "POST",
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
    } catch (err) {
      console.error("사용자 삭제 오류:", err);
    }
  };

  return <button onClick={handleCreate}>대시보드생성</button>;
}
