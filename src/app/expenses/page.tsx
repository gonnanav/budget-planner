"use client";

import { useContext, useState } from "react";
import { addToast } from "@heroui/toast";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { ExpenseCategoryContext } from "@/contexts/ExpenseCategoryContext";
import { BudgetSection } from "@/components/budget-section";
import { CategoryDrawer } from "@/components/category-drawer";
import { Category } from "@/core/types";
import { enrichItem } from "@/core/budget-items";
import { enrichCategory } from "@/core/categories";
import { ItemDrawerContext } from "@/contexts/ItemDrawerContext";

export default function Page() {
  const { expenses, isExpenseAtLimit } = useContext(ExpenseContext);
  const {
    expenseCategories,
    addExpenseCategory,
    updateExpenseCategory,
    deleteExpenseCategory,
    isExpenseCategoryAtLimit,
  } = useContext(ExpenseCategoryContext);

  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);

  const { onEditItem, onOpen } = useContext(ItemDrawerContext);

  const handleAddExpense = () => {
    if (isExpenseAtLimit) {
      addToast({
        title: "Limit reached",
        description: "You've reached the maximum number of expense items.",
        color: "warning",
      });
      return;
    }
    onOpen("expense");
  };

  const handleEditExpense = (id: string) => {
    onEditItem(id, "expense");
  };

  const handleAddCategory = () => {
    if (isExpenseCategoryAtLimit) {
      addToast({
        title: "Limit reached",
        description: "You've reached the maximum number of expense categories.",
        color: "warning",
      });
      return;
    }
    setEditedCategory(null);
    setIsCategoryDrawerOpen(true);
  };

  const handleEditCategory = (categoryId: string) => {
    const category = expenseCategories.find((c) => c.id === categoryId);
    setEditedCategory(category || null);
    setIsCategoryDrawerOpen(true);
  };

  const handleCategoryCancel = () => {
    setIsCategoryDrawerOpen(false);
    setEditedCategory(null);
  };

  const handleCategorySave = (name: string) => {
    if (editedCategory) {
      updateExpenseCategory(editedCategory.id, name);
    } else {
      addExpenseCategory(name);
    }
    setIsCategoryDrawerOpen(false);
    setEditedCategory(null);
  };

  const handleCategoryDelete = () => {
    if (editedCategory) {
      deleteExpenseCategory(editedCategory.id);
    }
    setIsCategoryDrawerOpen(false);
    setEditedCategory(null);
  };

  return (
    <>
      <BudgetSection
        items={expenses.map(enrichItem)}
        categories={expenseCategories.map((category) =>
          enrichCategory(category, expenses),
        )}
        title="Expenses"
        onAddItem={handleAddExpense}
        onEditItem={handleEditExpense}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}
      />
      <CategoryDrawer
        isOpen={isCategoryDrawerOpen}
        category={editedCategory}
        onSave={handleCategorySave}
        onClose={handleCategoryCancel}
        onCancel={handleCategoryCancel}
        onDelete={handleCategoryDelete}
      />
    </>
  );
}
