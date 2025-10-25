"use client";

import { useContext, useState } from "react";
import { addToast } from "@heroui/toast";
import { IncomeContext } from "@/contexts/IncomeContext";
import { IncomeCategoryContext } from "@/contexts/IncomeCategoryContext";
import { BudgetSection } from "@/components/budget-section";
import { ItemDrawer } from "@/components/item-drawer";
import { CategoryDrawer } from "@/components/category-drawer";
import { useBudgetItemDrawer } from "@/hooks/useBudgetItemDrawer";
import { BudgetItemInput, Category } from "@/core/types";
import { enrichItem } from "@/core/budget-items";
import { enrichCategory } from "@/core/categories";

export default function Page() {
  const { incomes, addIncome, updateIncome, deleteIncome, isIncomeAtLimit } =
    useContext(IncomeContext);
  const {
    incomeCategories,
    addIncomeCategory,
    updateIncomeCategory,
    deleteIncomeCategory,
    isIncomeCategoryAtLimit,
  } = useContext(IncomeCategoryContext);

  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);

  const { isOpen, editedItem, onEditItem, onOpen, onClose, onSave, onDelete } =
    useBudgetItemDrawer({
      items: incomes,
      onAdd: addIncome,
      onUpdate: updateIncome,
      onDelete: deleteIncome,
    });

  const handleAddIncome = () => {
    if (isIncomeAtLimit) {
      addToast({
        title: "Limit reached",
        description: "You've reached the maximum number of income items.",
        color: "warning",
      });
      return;
    }
    onOpen();
  };

  const handleEditIncome = (id: string) => {
    onEditItem(id);
  };

  const handleAddCategory = () => {
    if (isIncomeCategoryAtLimit) {
      addToast({
        title: "Limit reached",
        description: "You've reached the maximum number of income categories.",
        color: "warning",
      });
      return;
    }
    setEditedCategory(null);
    setIsCategoryDrawerOpen(true);
  };

  const handleEditCategory = (categoryId: string) => {
    const category = incomeCategories.find((c) => c.id === categoryId);
    setEditedCategory(category || null);
    setIsCategoryDrawerOpen(true);
  };

  const handleItemCancel = () => {
    onClose();
  };

  const handleItemSave = (input: BudgetItemInput) => {
    onSave(input);
    onClose();
  };

  const handleItemDelete = () => {
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
        items={incomes.map(enrichItem)}
        categories={incomeCategories.map((category) =>
          enrichCategory(category, incomes),
        )}
        title="Income"
        onAddItem={handleAddIncome}
        onEditItem={handleEditIncome}
        onAddCategory={handleAddCategory}
        onEditCategory={handleEditCategory}
      />

      <ItemDrawer
        isOpen={isOpen}
        item={editedItem}
        categories={incomeCategories}
        onSave={handleItemSave}
        onClose={handleItemCancel}
        onCancel={handleItemCancel}
        onDelete={handleItemDelete}
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
