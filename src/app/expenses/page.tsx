"use client";

import { useContext } from "react";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { BudgetSection } from "@/components/budget-section";

export default function Page() {
  const {
    items,
    categories,
    onClickAddExpenseItem,
    onClickExpenseItem,
    onClickAddExpenseCategory,
    onClickExpenseCategory,
  } = useContext(ExpenseContext);

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
