import { Inbox } from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Dashboard } from "../api/dashboards/type";
import { CreateDashboardButton } from "./create-dashboard-button";
import Link from "next/link";

async function getDashboards(): Promise<Dashboard[]> {
  const res = await fetch("http://localhost:3000/api/dashboards", {
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

export async function AppSidebar() {
  const dashboards = await getDashboards();

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Dashboard</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {dashboards.map((dashboard) => (
                <SidebarMenuItem key={dashboard.id}>
                  <SidebarMenuButton asChild>
                    <Link href={`/${dashboard.id}`}>
                      <Inbox />
                      <span>{dashboard.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
              <SidebarMenuItem key={"create-new"}>
                <SidebarMenuButton asChild>
                  <div className="cursor-pointer">
                    <CreateDashboardButton />
                  </div>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
