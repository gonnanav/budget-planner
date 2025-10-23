"use client";

import { useContext, useState } from "react";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { ExpenseCategoryContext } from "@/contexts/ExpenseCategoryContext";
import { BudgetSection } from "@/components/budget-section";
import { EntryDrawer } from "@/components/entry-drawer";
import { CategoryDrawer } from "@/components/category-drawer";
import { useBudgetEntryDrawer } from "@/hooks/useBudgetEntryDrawer";
import { BudgetEntryInput, Category } from "@/core/types";
import { calculateCategoryTotal, normalizeAmount } from "@/core/budget-balance";

export function ExpensesPage() {
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useContext(ExpenseContext);
  const {
    expenseCategories,
    addExpenseCategory,
    updateExpenseCategory,
    deleteExpenseCategory,
  } = useContext(ExpenseCategoryContext);

  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);

  const {
    isOpen,
    editedEntry,
    onEditEntry,
    onOpen,
    onClose,
    onSave,
    onDelete,
  } = useBudgetEntryDrawer({
    entries: expenses,
    onAddEntry: addExpense,
    onUpdateEntry: updateExpense,
    onDeleteEntry: deleteExpense,
  });

  const handleAddExpense = () => {
    onOpen();
  };

  const handleEditExpense = (id: string) => {
    onEditEntry(id);
  };

  const handleAddCategory = () => {
    setEditedCategory(null);
    setIsCategoryDrawerOpen(true);
  };

  const handleEditCategory = (categoryId: string) => {
    const category = expenseCategories.find((c) => c.id === categoryId);
    setEditedCategory(category || null);
    setIsCategoryDrawerOpen(true);
  };

  const handleEntryCancel = () => {
    onClose();
  };

  const handleEntrySave = (input: BudgetEntryInput) => {
    onSave(input);
    onClose();
  };

  const handleEntryDelete = () => {
    onDelete();
    onClose();
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
        items={expenses.map((expense) => ({
          ...expense,
          normalizedAmount: normalizeAmount(expense),
        }))}
        categories={expenseCategories.map((category) => ({
          ...category,
          amount: calculateCategoryTotal(category.id, expenses),
        }))}
        title="Expenses"
        onAddItem={handleAddExpense}
        onEditItem={handleEditExpense}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}
      />

      <EntryDrawer
        isOpen={isOpen}
        entry={editedEntry}
        categories={expenseCategories}
        onSave={handleEntrySave}
        onClose={handleEntryCancel}
        onCancel={handleEntryCancel}
        onDelete={handleEntryDelete}
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
