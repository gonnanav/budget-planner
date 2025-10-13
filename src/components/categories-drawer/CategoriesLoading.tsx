import { Skeleton } from "@heroui/skeleton";
import { CategoryRow } from "./CategoryRow";

export const CategoriesLoading = () => {
  return Array.from({ length: 3 }).map((_, index) => (
    <Skeleton key={index} className="rounded">
      <CategoryRow
        category={{ id: "1", name: "Loading..." }}
        onClick={() => {}}
      />
    </Skeleton>
  ));
};
