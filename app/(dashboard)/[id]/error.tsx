"use client";

import { Button } from "@/components/ui/button";
import { CloudAlert } from "lucide-react";
import Link from "next/link";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="100-vh w-full flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <CloudAlert width={100} height={100} />
        <span className="max-w-[400px] text-center break-words">
          {error.message}
        </span>

        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
