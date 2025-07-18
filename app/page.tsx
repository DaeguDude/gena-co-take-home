import { Dashboard } from "./api/dashboards/type";
import { Chart } from "./api/charts/type";
import { Header } from "./components/header";

async function getCharts(ids?: string[]): Promise<Chart[]> {
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

async function getDashboard(id: string): Promise<Dashboard> {
  const res = await fetch(`http://localhost:3000/api/dashboards/${id}`, {
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

async function getChart(id: string): Promise<Dashboard> {
  const res = await fetch(`http://localhost:3000/api/charts/${id}`, {
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

// < 768 1개
// 768 ~ 1023 2개
// 1024 3개

// Bar chart는 항상 1개

// SIDEBAR BREAKPOINT: 768px
/**
 * TODO:
 * - ✅그래프 영역 반응형으로 만들기✅
 * - ‼️ 더미 데이터 많이 넣어서 화면 꽉 채우기(더미 데이터 중요하지...) ‼️
 * - ‼️ 화면 사이즈 줄어들 때 사이드바 헤더로 옮기는 화면 ‼️
 * - ‼️ Number graph 조금 더 꾸며주기 ‼️
 * - ‼️ Bar & Line label 제대로 확인 ‼️ 
 * - 홈 화면에서 아무것도 선택 안 했을 시 화면
 * - chartdialog dataset 변경시 chart Type 제대로 변경안되는거 고쳐주기
 * - delete dashboard 고치기(// TODO: 대시보드리스트에서 불러와서 알맞은 곳으로 라우팅
      // TODO: 대시보드가 1개 밖에 없다면 삭제할 수 없게 처리)
 * - (?) Error Boundary
 */
export default async function Home() {
  // const charts = await getCharts();

  return (
    <main className="flex flex-1">
      <div></div>
      {/* 헤더 */}
    </main>
    // <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
    //   <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
    //     <div>
    //       <div className="mt-4">
    //         <h1 className="text-5xl">charts</h1>
    //         {charts.map((chart) => (
    //           <XXChart key={chart.id} chart={chart} />
    //         ))}
    //         <CreateChartButton />
    //       </div>

    //       <DashboardList dashboards={dashboards} />
    //     </div>
    //   </main>
    // </div>
  );
}
