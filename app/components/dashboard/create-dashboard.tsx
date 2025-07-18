"use client";

import { baseUrl } from "@/lib/constant";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateDashboardButton() {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState<string>("");
  const router = useRouter();

  const reset = () => {
    setEdit(false);
    setName("");
  };

  const handleCreate = async () => {
    try {
      const response = await fetch(`${baseUrl}/api/dashboards`, {
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
      <button onClick={handleCreate} disabled={!name}>
        생성
      </button>
    </div>
  ) : (
    <button onClick={() => setEdit(true)}>대시보드생성</button>
  );
}
