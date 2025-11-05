"use client";

import { useState, useContext } from "react";
import { addToast } from "@heroui/toast";
import { AppLayout } from "@/components/app-layout";
import { ItemDrawer } from "@/components/item-drawer";
import { ItemDrawerContext } from "@/contexts/ItemDrawerContext";
import { CategoryDrawerContext } from "@/contexts/CategoryDrawerContext";
import { CategoryDrawer } from "@/components/category-drawer";
import { IncomeContext } from "@/contexts/IncomeContext";
import { IncomeCategoryContext } from "@/contexts/IncomeCategoryContext";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { ExpenseCategoryContext } from "@/contexts/ExpenseCategoryContext";
import { useBudgetItemDrawer } from "@/hooks/useBudgetItemDrawer";
import { BudgetItemInput } from "@/core/types";
import { Category } from "@/core/types";

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  const [mode, setMode] = useState("income");
  const { incomes, addIncome, updateIncome, deleteIncome } =
    useContext(IncomeContext);
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useContext(ExpenseContext);
  const {
    incomeCategories,
    addIncomeCategory,
    updateIncomeCategory,
    deleteIncomeCategory,
    isIncomeCategoryAtLimit,
  } = useContext(IncomeCategoryContext);
  const {
    expenseCategories,
    addExpenseCategory,
    updateExpenseCategory,
    deleteExpenseCategory,
    isExpenseCategoryAtLimit,
  } = useContext(ExpenseCategoryContext);

  const itemIncomeProps = {
    items: incomes,
    onAdd: addIncome,
    onUpdate: updateIncome,
    onDelete: deleteIncome,
  };

  const itemExpenseProps = {
    items: expenses,
    onAdd: addExpense,
    onUpdate: updateExpense,
    onDelete: deleteExpense,
  };

  const {
    isOpen: isItemDrawerOpen,
    editedItem,
    onClose,
    onSave,
    onDelete,
    onOpen,
    onEditItem,
  } = useBudgetItemDrawer(
    mode === "income" ? itemIncomeProps : itemExpenseProps,
  );

  const categories = mode === "income" ? incomeCategories : expenseCategories;

  const handleItemOpen = (mode: "income" | "expense" = "income") => {
    setMode(mode);
    onOpen();
  };

  const handleEdit = (id: string, mode: "income" | "expense" = "income") => {
    setMode(mode);
    onEditItem(id);
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

  const [isCategoryDrawerOpen, setIsCategoryDrawerOpen] = useState(false);
  const [editedCategory, setEditedCategory] = useState<Category | null>(null);

  const handleCategoryOpen = (mode: "income" | "expense" = "income") => {
    if (mode === "income" && isIncomeCategoryAtLimit) {
      addToast({
        title: "Limit reached",
        description: "You've reached the maximum number of income categories.",
        color: "warning",
      });
      return;
    }
    if (mode === "expense" && isExpenseCategoryAtLimit) {
      addToast({
        title: "Limit reached",
        description: "You've reached the maximum number of expense categories.",
        color: "warning",
      });
      return;
    }
    setMode(mode);
    setEditedCategory(null);
    setIsCategoryDrawerOpen(true);
  };

  const handleEditCategory = (
    categoryId: string,
    mode: "income" | "expense" = "income",
  ) => {
    const categories = mode === "income" ? incomeCategories : expenseCategories;
    const category = categories.find((c) => c.id === categoryId);

    setMode(mode);
    setEditedCategory(category || null);
    setIsCategoryDrawerOpen(true);
  };

  const handleCategoryCancel = () => {
    setIsCategoryDrawerOpen(false);
    setEditedCategory(null);
  };

  const handleIncomeCategorySave = (name: string) => {
    if (editedCategory) {
      updateIncomeCategory(editedCategory.id, name);
    } else {
      addIncomeCategory(name);
    }

    setIsCategoryDrawerOpen(false);
    setEditedCategory(null);
  };

  const handleIncomeCategoryDelete = () => {
    if (editedCategory) {
      deleteIncomeCategory(editedCategory.id);
    }
    setIsCategoryDrawerOpen(false);
    setEditedCategory(null);
  };

  const categoryIncomeProps = {
    categories: incomeCategories,
    onSave: handleIncomeCategorySave,
    onDelete: handleIncomeCategoryDelete,
  };

  const handleExpenseCategorySave = (name: string) => {
    if (editedCategory) {
      updateExpenseCategory(editedCategory.id, name);
    } else {
      addExpenseCategory(name);
    }
    setIsCategoryDrawerOpen(false);
    setEditedCategory(null);
  };

  const handleExpenseCategoryDelete = () => {
    if (editedCategory) {
      deleteExpenseCategory(editedCategory.id);
    }
    setIsCategoryDrawerOpen(false);
    setEditedCategory(null);
  };

  const categoryExpenseProps = {
    categories: expenseCategories,
    onSave: handleExpenseCategorySave,
    onDelete: handleExpenseCategoryDelete,
  };

  const categoryProps =
    mode === "income" ? categoryIncomeProps : categoryExpenseProps;

  return (
    <>
      <AppLayout>
        <ItemDrawerContext
          value={{
            onOpen: handleItemOpen,
            onEditItem: handleEdit,
          }}
        >
          <CategoryDrawerContext
            value={{
              onOpen: handleCategoryOpen,
              onEditCategory: handleEditCategory,
            }}
          >
            {children}
          </CategoryDrawerContext>
        </ItemDrawerContext>
      </AppLayout>
      <ItemDrawer
        isOpen={isItemDrawerOpen}
        item={editedItem}
        categories={categories}
        onCancel={handleItemCancel}
        onSave={handleItemSave}
        onClose={onClose}
        onDelete={handleItemDelete}
      />
      <CategoryDrawer
        {...categoryProps}
        isOpen={isCategoryDrawerOpen}
        category={editedCategory}
        onCancel={handleCategoryCancel}
        onClose={handleCategoryCancel}
      />
    </>
  );
}
