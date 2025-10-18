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
  const areCategoriesEmpty = categories.length === 0;

  return (
    <SectionContent
      isEmpty={areCategoriesEmpty}
      emptyMessage="No categories yet"
    >
      {categories.map((category) => (
        <CategoryListItem
          key={category.id}
          category={category}
          entries={items}
          onClick={() => onEditCategory(category.id)}
        />
      ))}
    </SectionContent>
  );
}
