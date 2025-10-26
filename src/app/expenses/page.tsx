"use client";

import { useContext } from "react";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { ExpenseCategoryContext } from "@/contexts/ExpenseCategoryContext";
import { BudgetSection } from "@/components/budget-section";
import { enrichItem } from "@/core/budget-items";
import { enrichCategory } from "@/core/categories";
import { ItemDrawerContext } from "@/contexts/ItemDrawerContext";
import { CategoryDrawerContext } from "@/contexts/CategoryDrawerContext";

export default function Page() {
  const { expenses } = useContext(ExpenseContext);
  const { expenseCategories } = useContext(ExpenseCategoryContext);
  const { onEditItem, onOpen } = useContext(ItemDrawerContext);
  const { onOpen: onCategoryOpen, onEditCategory } = useContext(
    CategoryDrawerContext,
  );
  const enrichedExpenses = expenses.map(enrichItem);
  const enrichedExpenseCategories = expenseCategories.map((category) =>
    enrichCategory(category, enrichedExpenses),
  );

  const handleOpen = () => {
    onOpen("expense");
  };

  const handleEditExpense = (id: string) => {
    onEditItem(id, "expense");
  };

  const handleAddCategory = () => {
    onCategoryOpen("expense");
  };

  const handleEditCategory = (categoryId: string) => {
    onEditCategory(categoryId, "expense");
  };

  return (
    <BudgetSection
      items={enrichedExpenses}
      categories={enrichedExpenseCategories}
      title="Expenses"
      onAddItem={handleOpen}
      onEditItem={handleEditExpense}
      onAddCategory={handleAddCategory}
      onEditCategory={handleEditCategory}
    />
  );
}
