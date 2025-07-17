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
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Dashboard } from "../../api/dashboards/type";

export function UpdateDashboardButton({ dashboard }: { dashboard: Dashboard }) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>(dashboard.name);
  const router = useRouter();

  const reset = () => {
    setOpen(false);
    setName("");
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`/api/dashboards/${dashboard.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to create a dashboard.");
      }

      router.refresh();
      reset();
    } catch (err) {
      console.error("Failed to update a dashboard:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            수정
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Update Dashboard</DialogTitle>
            <DialogDescription>
              This dashboard gives you a quick glance at your most important
              analytics, charts, and insights. Easily track trends, performance,
              and key metrics in real-time.
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
            {/* TODO: 로딩 state 넣어주기 */}
            <Button type="submit" onClick={handleUpdate}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
