import { Button } from "@/components/ui/button";
import { Bird } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="100-vh w-full flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <Bird width={150} height={150} strokeWidth={1} />
        <span>Page Not Found</span>

        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  );
}
