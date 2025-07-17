"use client";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Dashboard } from "../api/dashboards/type";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { CreateDashboardDialog } from "./dialog/create-dashboard-dialog";
import { CirclePlus } from "lucide-react";

export function SidebarMenus({ dashboards }: { dashboards: Dashboard[] }) {
  const pathname = usePathname();
  const activeDashboardId = pathname.split("/").pop();
  const [open, setOpen] = useState(false);

  return (
    <>
      <SidebarMenu>
        {dashboards.map((dashboard) => (
          <SidebarMenuItem key={dashboard.id}>
            <SidebarMenuButton
              asChild
              isActive={dashboard.id === activeDashboardId}
            >
              <Link href={`/${dashboard.id}`}>
                <span>{dashboard.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        <SidebarMenuItem key={"create-new"}>
          <SidebarMenuButton
            className="cursor-pointer"
            onClick={() => setOpen(true)}
          >
            <CirclePlus />
            <span>create dashboard</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>

      {open && <CreateDashboardDialog onOpenChange={setOpen} open={open} />}
    </>
  );
}
