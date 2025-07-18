import { Dog } from "lucide-react";

export default async function Home() {
  return (
    <main className="100-vh w-full flex items-center justify-center">
      <div className="flex flex-col gap-4 items-center">
        <Dog width={150} height={150} strokeWidth={1} />
        <span>Go select the dashboard</span>
      </div>
    </main>
  );
}
