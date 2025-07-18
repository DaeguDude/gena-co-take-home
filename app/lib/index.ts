import { baseUrl } from "@/lib/constant";
import { Chart } from "../api/charts/type";
import { Dashboard } from "../api/dashboards/type";

export async function getCharts(ids?: string[]): Promise<Chart[]> {
  let xxApiPath = "charts";

  if (ids && ids.length === 0) {
    return [];
  }

  if (ids && ids.length > 0) {
    xxApiPath += `?ids=${ids.join(",")}`;
  }

  const res = await fetch(`${baseUrl}/api/${xxApiPath}`, {
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
  return data.sort((a, b) => a.order - b.order);
}

export async function getData(endpoint: string) {
  const res = await fetch(`${baseUrl}${endpoint}`, {
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

export async function getDashboards(): Promise<Dashboard[]> {
  const res = await fetch(`${baseUrl}/api/dashboards`, {
    cache: "no-store",
    next: {
      tags: ["dashboards"],
    },
  });

  if (!res.ok) {
    throw new Error(
      `대시보드 데이터를 가져오는 데 실패했어: ${res.statusText}`
    );
  }

  // 응답을 JSON으로 파싱하고 정의된 타입으로 캐스팅
  const data: Dashboard[] = await res.json();
  return data;
}

export async function getDashboard(id: string): Promise<Dashboard> {
  const res = await fetch(`${baseUrl}/api/dashboards/${id}`, {
    cache: "no-store",
    next: {
      tags: [`dashboard-${id}`],
    },
  });

  if (res.status === 404) {
    throw new Error(`대시보드 (ID: ${id})를 찾을 수 없어.`);
  }

  if (!res.ok) {
    throw new Error(`대시보드 (ID: ${id}) 데이터를 가져오는데 실패.`);
  }

  const data: Dashboard = await res.json();
  return data;
}

export async function getChart(id: string): Promise<Dashboard> {
  const res = await fetch(`${baseUrl}/api/charts/${id}`, {
    cache: "no-store",
    next: {
      tags: [`chart-${id}`],
    },
  });

  if (res.status === 404) {
    throw new Error(`대시보드 (ID: ${id})를 찾을 수 없어.`);
  }

  if (!res.ok) {
    throw new Error(`대시보드 (ID: ${id}) 데이터를 가져오는데 실패.`);
  }

  const data: Dashboard = await res.json();
  return data;
}
