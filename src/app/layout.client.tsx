"use client";

import { useState, useContext } from "react";
import { addToast } from "@heroui/toast";
import { AppLayout } from "@/components/app-layout";
import { ItemDrawer } from "@/components/item-drawer";
import { AppActionsContext } from "@/contexts/AppActionsContext";
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

  const handleClickAddIncomeItem = () => {
    setMode("income");
    onOpen();
  };

  const handleClickAddExpenseItem = () => {
    setMode("expense");
    onOpen();
  };

  const handleClickIncomeItem = (id: string) => {
    setMode("income");
    onEditItem(id);
  };

  const handleClickExpenseItem = (id: string) => {
    setMode("expense");
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

  const handleClickAddIncomeCategory = () => {
    if (isIncomeCategoryAtLimit) {
      addToast({
        title: "Limit reached",
        description: "You've reached the maximum number of income categories.",
        color: "warning",
      });
      return;
    }
    setMode("income");
    setEditedCategory(null);
    setIsCategoryDrawerOpen(true);
  };

  const handleClickAddExpenseCategory = () => {
    if (isExpenseCategoryAtLimit) {
      addToast({
        title: "Limit reached",
        description: "You've reached the maximum number of expense categories.",
        color: "warning",
      });
      return;
    }
    setMode("expense");
    setEditedCategory(null);
    setIsCategoryDrawerOpen(true);
  };

  const handleClickIncomeCategory = (categoryId: string) => {
    const category = incomeCategories.find((c) => c.id === categoryId);
    setMode("income");
    setEditedCategory(category || null);
    setIsCategoryDrawerOpen(true);
  };

  const handleClickExpenseCategory = (categoryId: string) => {
    const category = expenseCategories.find((c) => c.id === categoryId);
    setMode("expense");
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
        <AppActionsContext
          value={{
            onClickAddIncomeItem: handleClickAddIncomeItem,
            onClickAddExpenseItem: handleClickAddExpenseItem,
            onClickIncomeItem: handleClickIncomeItem,
            onClickExpenseItem: handleClickExpenseItem,
            onClickAddIncomeCategory: handleClickAddIncomeCategory,
            onClickAddExpenseCategory: handleClickAddExpenseCategory,
            onClickIncomeCategory: handleClickIncomeCategory,
            onClickExpenseCategory: handleClickExpenseCategory,
          }}
        >
          {children}
        </AppActionsContext>
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
