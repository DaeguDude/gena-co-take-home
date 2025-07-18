import { Chart } from "../api/charts/type";

export async function getCharts(ids?: string[]): Promise<Chart[]> {
  let xxApiPath = "charts";
  if (ids && ids.length > 0) {
    xxApiPath += `?ids=${ids.join(",")}`;
  }

  const res = await fetch(`http://localhost:3000/api/${xxApiPath}`, {
    cache: "no-store",
    next: {
      tags: ["charts"],
    },
  });

  if (!res.ok) {
    throw new Error(`차트 데이터를 가져오는 데 실패했어: ${res.statusText}`);
  }

  // 응답을 JSON으로 파싱하고 정의된 타입으로 캐스팅
  const data: Chart[] = await res.json();
  return data;
}

export async function getData(endpoint: string) {
  const res = await fetch(`http://localhost:3000${endpoint}`, {
    cache: "no-store",
    next: {
      tags: [`data/${endpoint}`],
    },
  });

  if (!res.ok) {
    throw new Error(`데이터를 가져오는 데 실패했어: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}
