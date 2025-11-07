import { useBudgetSection } from "./useBudgetSection";
import { ItemDrawerProps } from "@/components/item-drawer";
import { CategoryDrawerProps } from "@/components/category-drawer";

interface UseExpensesProps {
  onOpenItemDrawer: (props: Omit<ItemDrawerProps, "isOpen">) => void;
  onCloseItemDrawer: () => void;
  onOpenCategoryDrawer: (props: Omit<CategoryDrawerProps, "isOpen">) => void;
  onCloseCategoryDrawer: () => void;
}

export function useExpenses({
  onOpenItemDrawer,
  onCloseItemDrawer,
  onOpenCategoryDrawer,
  onCloseCategoryDrawer,
}: UseExpensesProps) {
  const {
    items,
    categories,
    onClickAddItem,
    onClickItem,
    onClickAddCategory,
    onClickCategory,
  } = useBudgetSection({
    itemsTableName: "expenses",
    categoriesTableName: "expenseCategories",
    onOpenItemDrawer,
    onCloseItemDrawer,
    onOpenCategoryDrawer,
    onCloseCategoryDrawer,
  });

  return {
    expenses: items,
    expenseCategories: categories,
    onClickAddExpenseItem: onClickAddItem,
    onClickExpenseItem: onClickItem,
    onClickAddExpenseCategory: onClickAddCategory,
    onClickExpenseCategory: onClickCategory,
  };
}
