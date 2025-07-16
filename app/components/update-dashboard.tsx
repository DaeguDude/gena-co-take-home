"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dashboard } from "../api/dashboards/type";

export function UpdateDashboardButton({ dashboard }: { dashboard: Dashboard }) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState<string>("");
  const router = useRouter();

  const reset = () => {
    setEdit(false);
    setName("");
  };

  const handleUpdate = async () => {
    try {
      // DELETE 요청을 /api/users 엔드포인트로 보냄
      // 쿼리 파라미터로 userId를 전달
      const response = await fetch(`/api/dashboards/${dashboard.id}`, {
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
    <div className="flex">
      <input
        className="w-[100px] border-2"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      />
      <button onClick={handleUpdate} disabled={!name}>
        수정
      </button>
    </div>
  ) : (
    <button onClick={() => setEdit(true)}>대시보드수정</button>
  );
}
