import { useIndexedDbItems, useIndexedDbCategories } from "@/indexed-db";
import { itemActions } from "@/lib/item-actions";
import { categoryActions } from "@/lib/category-actions";
import { ItemDrawerProps } from "@/components/item-drawer";
import { CategoryDrawerProps } from "@/components/category-drawer";

type ItemTableName = "incomes" | "expenses";
type CategoryTableName = "incomeCategories" | "expenseCategories";

interface UseBudgetSectionProps {
  itemsTableName: ItemTableName;
  categoriesTableName: CategoryTableName;
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
  const { items, addItem, updateItem, deleteItem } =
    useIndexedDbItems(itemsTableName);
  const { categories, addCategory, updateCategory, deleteCategory, isAtLimit } =
    useIndexedDbCategories(categoriesTableName, items);

  const { onClickAddItem, onClickItem } = itemActions({
    items,
    categories,
    onAddItem: addItem,
    onUpdateItem: updateItem,
    onDeleteItem: deleteItem,
    onOpenItemDrawer,
    onCloseItemDrawer,
  });

  const { onClickAddCategory, onClickCategory } = categoryActions({
    categories,
    isAtLimit,
    onAddCategory: addCategory,
    onUpdateCategory: updateCategory,
    onDeleteCategory: deleteCategory,
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
