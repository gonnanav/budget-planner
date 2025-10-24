import { SectionContent } from "@/components/shared";
import { CategoryListItem } from "@/components/category-list-item";

interface CategoriesContentProps {
  categories: { id: string; name: string; amount: number }[];
  onClickCategory: (id: string) => void;
}

export function CategoriesContent({
  categories,
  onClickCategory,
}: CategoriesContentProps) {
  return (
    <SectionContent items={categories} emptyStateText="No categories yet">
      {({ id, name, amount }) => (
        <CategoryListItem
          key={id}
          name={name}
          amount={amount}
          onClick={() => onClickCategory(id)}
        />
      )}
    </SectionContent>
  );
}
