import { CategoryRow } from "../CategoryRow/CategoryRow";
import { EmptyList } from "../EmptyList/EmptyList";
import type { Category, CategorySummary } from "core/types";

interface CategoryListProps {
  categories: CategorySummary[];
  onCategoryClick: (category: Category) => void;
}

export function CategoryList({
  categories,
  onCategoryClick,
}: CategoryListProps) {
  if (categories.length === 0) {
    return <EmptyList entity="category" />;
  }

  return (
    <ul>
      {categories.map((summary) => (
        <CategoryRow
          key={summary.category.id}
          name={summary.category.name}
          amount={summary.total}
          onClick={() => onCategoryClick(summary.category)}
        />
      ))}
    </ul>
  );
}
