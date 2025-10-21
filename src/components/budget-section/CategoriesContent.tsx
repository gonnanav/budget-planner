import { BudgetEntry, Category } from "@/core/types";
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
      {(category) => (
        <CategoryListItem
          key={category.id}
          category={category}
          entries={items}
          onClick={() => onEditCategory(category.id)}
        />
      )}
    </SectionContent>
  );
}
