"use client";

import { useContext } from "react";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { ExpenseCategoryContext } from "@/contexts/ExpenseCategoryContext";
import { BudgetSection } from "@/components/budget-section";
import { ItemDrawerContext } from "@/contexts/ItemDrawerContext";
import { CategoryDrawerContext } from "@/contexts/CategoryDrawerContext";

export default function Page() {
  const { expenses } = useContext(ExpenseContext);
  const { expenseCategories } = useContext(ExpenseCategoryContext);
  const { onOpen: onOpenItemDrawer, onEditItem } =
    useContext(ItemDrawerContext);
  const { onOpen: onOpenCategoryDrawer, onEditCategory } = useContext(
    CategoryDrawerContext,
  );

  const handleClickAddItem = () => {
    onOpenItemDrawer("expense");
  };

  const handleClickItem = (id: string) => {
    onEditItem(id, "expense");
  };

  const handleClickAddCategory = () => {
    onOpenCategoryDrawer("expense");
  };

  const handleClickCategory = (categoryId: string) => {
    onEditCategory(categoryId, "expense");
  };

  return (
    <BudgetSection
      title="Expenses"
      items={expenses}
      categories={expenseCategories}
      onClickAddItem={handleClickAddItem}
      onClickItem={handleClickItem}
      onClickAddCategory={handleClickAddCategory}
      onClickCategory={handleClickCategory}
    />
  );
}
