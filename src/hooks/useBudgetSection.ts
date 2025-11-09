import {
  useTableItems,
  useTableCategories,
  addItem,
  updateItem,
  deleteItem,
  addCategory,
  updateCategory,
  deleteCategory,
} from "@/db";
import { itemActions } from "@/lib/item-actions";
import { categoryActions } from "@/lib/category-actions";
import { ItemDrawerProps } from "@/components/item-drawer";
import { CategoryDrawerProps } from "@/components/category-drawer";
import { ItemsTableName, CategoriesTableName } from "@/db/types";

interface UseBudgetSectionProps {
  itemsTableName: ItemsTableName;
  categoriesTableName: CategoriesTableName;
  onOpenItemDrawer: (props: Omit<ItemDrawerProps, "isOpen">) => void;
  onCloseItemDrawer: () => void;
  onOpenCategoryDrawer: (props: Omit<CategoryDrawerProps, "isOpen">) => void;
  onCloseCategoryDrawer: () => void;
}

export function useBudgetSection({
  itemsTableName,
  categoriesTableName,
  onOpenItemDrawer,
  onCloseItemDrawer,
  onOpenCategoryDrawer,
  onCloseCategoryDrawer,
}: UseBudgetSectionProps) {
  const { items } = useTableItems(itemsTableName);
  const { categories, isAtLimit } = useTableCategories(
    categoriesTableName,
    items,
  );

  const { onClickAddItem, onClickItem } = itemActions({
    items,
    categories,
    onAddItem: (input) => addItem(itemsTableName, input),
    onUpdateItem: (id, input) => updateItem(itemsTableName, id, input),
    onDeleteItem: (id) => deleteItem(itemsTableName, id),
    onOpenItemDrawer,
    onCloseItemDrawer,
  });

  const { onClickAddCategory, onClickCategory } = categoryActions({
    categories,
    isAtLimit,
    onAddCategory: (name) => addCategory(categoriesTableName, name),
    onUpdateCategory: (id, name) =>
      updateCategory(categoriesTableName, id, name),
    onDeleteCategory: (id) => deleteCategory(categoriesTableName, id),
    onOpenCategoryDrawer,
    onCloseCategoryDrawer,
  });

  return {
    items,
    categories,
    onClickAddItem,
    onClickItem,
    onClickAddCategory,
    onClickCategory,
  };
}
