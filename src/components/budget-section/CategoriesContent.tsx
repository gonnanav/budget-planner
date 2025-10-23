import { BudgetEntry, Category } from "@/core/types";
import { calculateCategoryTotal } from "@/core/budget-balance";
import { CategoryListItem } from "./CategoryListItem";
import { SectionContent } from "./SectionContent";

interface CategoriesContentProps {
  categories: Category[];
  items: BudgetEntry[];
  onEditCategory: (id: string) => void;
}

export function CategoriesContent({
  categories,
  items,
  onEditCategory,
}: CategoriesContentProps) {
  return (
    <SectionContent items={categories} emptyMessage="No categories yet">
      {({ id, name }) => (
        <CategoryListItem
          key={id}
          name={name}
          amount={calculateCategoryTotal(id, items)}
          onClick={() => onEditCategory(id)}
        />
      )}
    </SectionContent>
  );
}
