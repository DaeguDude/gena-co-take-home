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
import { CirclePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const wait = () => new Promise((resolve) => setTimeout(resolve, 1000));

export function CreateDashboardButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState<string>("");
  const router = useRouter();

  const reset = () => {
    setOpen(false);
    setName("");
  };

  const handleCreate = async () => {
    try {
      await wait();

      const response = await fetch(`/api/dashboards`, {
        method: "POST",
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
      console.error("Failed to create a dashboard:", err);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline" size="sm">
            <CirclePlus /> create dashboard
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create Dashboard</DialogTitle>
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
            <Button type="submit" onClick={handleCreate}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
