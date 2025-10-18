import { Category, BudgetEntry } from "@/core/types";
import { calculateCategoryTotal } from "@/core/budget-balance";
import { SectionListItem } from "./SectionListItem";

interface CategoryListItemProps {
  category: Category;
  entries: BudgetEntry[];
  onClick: () => void;
}

export function CategoryListItem({
  category,
  entries,
  onClick,
}: CategoryListItemProps) {
  const total = calculateCategoryTotal(category.id, entries);

  return (
    <SectionListItem ariaLabel={category.name} onClick={onClick}>
      <span className="text-muted-foreground text-sm truncate">
        {category.name}
      </span>
      {total > 0 && (
        <span className="text-sm text-gray-900">₪{total.toLocaleString()}</span>
      )}
    </SectionListItem>
  );
}
