import { Skeleton } from "@heroui/skeleton";

export function LoadingPage() {
  return (
    <div className="flex flex-col gap-5">
      <Skeleton className="h-8 w-24 rounded" />
      <div className="flex flex-col w-full gap-2">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-6 w-full rounded" />
        ))}
      </div>
    </div>
  );
}
