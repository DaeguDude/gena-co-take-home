"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dashboard } from "../../api/dashboards/type";
import { DialogProps } from "@radix-ui/react-dialog";
import { baseUrl } from "@/lib/constant";

export function UpdateDashboardDialog({
  dashboard,
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: DialogProps["onOpenChange"];
  dashboard: Dashboard;
}) {
  const [name, setName] = useState<string>(dashboard.name);
  const router = useRouter();

  const handleUpdate = async () => {
    try {
      const response = await fetch(
        `${baseUrl}/api/dashboards/${dashboard.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create a dashboard.");
      }

      router.refresh();
      if (onOpenChange) onOpenChange(false);
    } catch (err) {
      console.error("Failed to update a dashboard:", err);
    }
  };

  return (
    <>
      {open && (
        <Dialog open={open} onOpenChange={onOpenChange}>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Update Dashboard</DialogTitle>
              <DialogDescription>
                Update your dashboard’s name and click Save to apply the
                changes.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4">
              <div className="grid gap-3">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  placeholder="dashboard name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
              </div>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button type="submit" onClick={handleUpdate}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}
