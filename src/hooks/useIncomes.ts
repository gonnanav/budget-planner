import { useBudgetSection } from "./useBudgetSection";
import { ItemDrawerProps } from "@/components/item-drawer";
import { CategoryDrawerProps } from "@/components/category-drawer";

interface UseIncomesProps {
  onOpenItemDrawer: (props: Omit<ItemDrawerProps, "isOpen">) => void;
  onCloseItemDrawer: () => void;
  onOpenCategoryDrawer: (props: Omit<CategoryDrawerProps, "isOpen">) => void;
  onCloseCategoryDrawer: () => void;
}

export function useIncomes({
  onOpenItemDrawer,
  onCloseItemDrawer,
  onOpenCategoryDrawer,
  onCloseCategoryDrawer,
}: UseIncomesProps) {
  const {
    items,
    categories,
    onClickAddItem,
    onClickItem,
    onClickAddCategory,
    onClickCategory,
  } = useBudgetSection({
    itemsTableName: "incomes",
    categoriesTableName: "incomeCategories",
    onOpenItemDrawer,
    onCloseItemDrawer,
    onOpenCategoryDrawer,
    onCloseCategoryDrawer,
  });

  return {
    incomes: items,
    incomeCategories: categories,
    onClickAddIncomeItem: onClickAddItem,
    onClickIncomeItem: onClickItem,
    onClickAddIncomeCategory: onClickAddCategory,
    onClickIncomeCategory: onClickCategory,
  };
}
