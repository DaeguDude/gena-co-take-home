"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { DialogProps } from "@radix-ui/react-dialog";
import { dashboards } from "../api/dashboards/data";
import Link from "next/link";

export function SideSheet({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange?: DialogProps["onOpenChange"];
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="top-12" side="left" aria-describedby={undefined}>
        <SheetHeader>
          <SheetTitle>Gena Co</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-2 px-4">
          {dashboards.map((dashboard) => (
            <div key={dashboard.id} className="flex flex-1">
              <Link
                className="flex-1 hover:bg-gray-100 p-2 rounded-lg text-start"
                href={`/${dashboard.id}`}
                onClick={() => {
                  if (onOpenChange) onOpenChange(false);
                }}
              >
                {dashboard.name}
              </Link>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}
