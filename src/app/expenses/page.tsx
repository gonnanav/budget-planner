"use client";

import { useContext } from "react";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { ExpenseCategoryContext } from "@/contexts/ExpenseCategoryContext";
import { BudgetSection } from "@/components/budget-section";
import { AppActionsContext } from "@/contexts/AppActionsContext";

export default function Page() {
  const { expenses } = useContext(ExpenseContext);
  const { expenseCategories } = useContext(ExpenseCategoryContext);
  const {
    onClickAddExpenseItem,
    onClickExpenseItem,
    onClickAddExpenseCategory,
    onClickExpenseCategory,
  } = useContext(AppActionsContext);

  return (
    <BudgetSection
      title="Expenses"
      items={expenses}
      categories={expenseCategories}
      onClickAddItem={onClickAddExpenseItem}
      onClickItem={onClickExpenseItem}
      onClickAddCategory={onClickAddExpenseCategory}
      onClickCategory={onClickExpenseCategory}
    />
  );
}
