"use client";

import { useContext } from "react";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { BudgetSection } from "@/components/budget-section";
import { AppActionsContext } from "@/contexts/AppActionsContext";

export default function Page() {
  const { items, categories } = useContext(ExpenseContext);
  const {
    onClickAddExpenseItem,
    onClickExpenseItem,
    onClickAddExpenseCategory,
    onClickExpenseCategory,
  } = useContext(AppActionsContext);

  return (
    <BudgetSection
      title="Expenses"
      items={items}
      categories={categories}
      onClickAddItem={onClickAddExpenseItem}
      onClickItem={onClickExpenseItem}
      onClickAddCategory={onClickAddExpenseCategory}
      onClickCategory={onClickExpenseCategory}
    />
  );
}
