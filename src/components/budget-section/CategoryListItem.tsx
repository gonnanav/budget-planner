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
  const { id, name } = category;
  const total = calculateCategoryTotal(id, entries);

  return (
    <SectionListItem name={name} onClick={onClick}>
      <span className="text-sm text-gray-900">₪{total.toLocaleString()}</span>
    </SectionListItem>
  );
}
