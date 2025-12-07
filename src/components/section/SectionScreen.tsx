import { Item, ItemInput, Category } from "@/core/types";
import { useSectionView } from "@/components/section/useSectionView";
import { ItemsScreen } from "./ItemsScreen";
import { CategoriesScreen } from "@/components/categories-screen";

interface SectionScreenProps {
  headingText: string;
  data: {
    items: (Item & { normalizedAmount: number })[];
    categories: (Category & { amount: number })[];
  };
  itemActions: {
    add: (input: ItemInput) => Promise<string>;
    update: (id: string, input: ItemInput) => Promise<boolean>;
    delete: (id: string) => Promise<void>;
  };
  categoryActions: {
    add: (name: string) => Promise<string>;
    update: (id: string, name: string) => Promise<boolean>;
    delete: (id: string) => Promise<void>;
  };
}

export function SectionScreen({
  headingText,
  data,
  itemActions,
  categoryActions,
}: SectionScreenProps) {
  const { items, categories } = data;
  const { view, handleViewChange } = useSectionView();

  return view === "items" ? (
    <ItemsScreen
      headingText={headingText}
      items={items}
      categoryOptions={categories}
      addItem={itemActions.add}
      updateItem={itemActions.update}
      deleteItem={itemActions.delete}
      onViewChange={handleViewChange}
    />
  ) : (
    <CategoriesScreen
      headingText={headingText}
      categories={categories}
      addCategory={categoryActions.add}
      updateCategory={categoryActions.update}
      deleteCategory={categoryActions.delete}
      onViewChange={handleViewChange}
    />
  );
}
