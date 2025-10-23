import { SectionContent } from "./SectionContent";
import { CategoryListItem } from "./CategoryListItem";

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
