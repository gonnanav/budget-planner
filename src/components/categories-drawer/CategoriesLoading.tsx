import { Skeleton } from "@heroui/skeleton";

export const CategoriesLoading = () => {
  return (
    <div className="flex flex-col gap-2">
      {Array.from({ length: 3 }).map((_, index) => (
        <div
          key={index}
          className="p-4 bg-gray-50 rounded-lg border border-gray-300"
        >
          <Skeleton className="h-5 w-32 rounded" />
        </div>
      ))}
    </div>
  );
};
