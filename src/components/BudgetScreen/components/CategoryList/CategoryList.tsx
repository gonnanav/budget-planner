import { CategoryRow } from "../CategoryRow/CategoryRow";
import { EmptyList } from "../EmptyList/EmptyList";
import type { Category, CategoryGroup } from "domain/types";

type CategoryListProps = {
  groups: CategoryGroup[];
  onCategoryClick: (category: Category) => void;
};

export function CategoryList({
  groups,
  onCategoryClick,
}: CategoryListProps) {
  const categorized = groups.filter((g) => g.kind === "categorized");

  if (categorized.length === 0) {
    return <EmptyList entity="category" />;
  }

  return (
    <ul>
      {categorized.map((group) => (
        <CategoryRow
          key={group.category.id}
          name={group.category.name}
          amount={group.total}
          onClick={() => onCategoryClick(group.category)}
        />
      ))}
    </ul>
  );
}
