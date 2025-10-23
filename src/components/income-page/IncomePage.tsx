"use client";

import { useContext, useState } from "react";
import { IncomeContext } from "@/contexts/IncomeContext";
import { IncomeCategoryContext } from "@/contexts/IncomeCategoryContext";
import { BudgetSection } from "@/components/budget-section";
import { EntryDrawer } from "@/components/entry-drawer";
import { CategoryDrawer } from "@/components/category-drawer";
import { useBudgetEntryDrawer } from "@/hooks/useBudgetEntryDrawer";
import { BudgetEntryInput, Category } from "@/core/types";
import { calculateCategoryTotal, normalizeAmount } from "@/core/budget-balance";

export function IncomePage() {
  const { incomes, addIncome, updateIncome, deleteIncome } =
    useContext(IncomeContext);
  const {
    incomeCategories,
    addIncomeCategory,
    updateIncomeCategory,
    deleteIncomeCategory,
  } = useContext(IncomeCategoryContext);

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
    entries: incomes.map((income) => ({
      ...income,
      normalizedAmount: normalizeAmount(income),
    })),
    onAddEntry: addIncome,
    onUpdateEntry: updateIncome,
    onDeleteEntry: deleteIncome,
  });

  const handleAddIncome = () => {
    onOpen();
  };

  const handleEditIncome = (id: string) => {
    onEditEntry(id);
  };

  const handleAddCategory = () => {
    setEditedCategory(null);
    setIsCategoryDrawerOpen(true);
  };

  const handleEditCategory = (categoryId: string) => {
    const category = incomeCategories.find((c) => c.id === categoryId);
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
      updateIncomeCategory(editedCategory.id, name);
    } else {
      addIncomeCategory(name);
    }
    setIsCategoryDrawerOpen(false);
    setEditedCategory(null);
  };

  const handleCategoryDelete = () => {
    if (editedCategory) {
      deleteIncomeCategory(editedCategory.id);
    }
    setIsCategoryDrawerOpen(false);
    setEditedCategory(null);
  };

  return (
    <>
      <BudgetSection
        items={incomes.map((income) => ({
          ...income,
          normalizedAmount: normalizeAmount(income),
        }))}
        categories={incomeCategories.map((category) => ({
          ...category,
          amount: calculateCategoryTotal(category.id, incomes),
        }))}
        title="Income"
        onAddItem={handleAddIncome}
        onEditItem={handleEditIncome}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}
      />

      <EntryDrawer
        isOpen={isOpen}
        entry={editedEntry}
        categories={incomeCategories}
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
