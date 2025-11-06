"use client";

import { useContext } from "react";
import { addToast } from "@heroui/toast";
import { AppLayout } from "@/components/app-layout";
import { ItemDrawer } from "@/components/item-drawer";
import { AppActionsContext } from "@/contexts/AppActionsContext";
import {
  CategoryDrawer,
  useCategoryDrawer,
  CategoryDrawerProps,
} from "@/components/category-drawer";
import { IncomeContext } from "@/contexts/IncomeContext";
import { IncomeCategoryContext } from "@/contexts/IncomeCategoryContext";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { ExpenseCategoryContext } from "@/contexts/ExpenseCategoryContext";

import { useItemDrawer } from "@/components/item-drawer";
import { ItemDrawerProps } from "@/components/item-drawer/ItemDrawer";

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
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

  const { itemDrawerProps, openItemDrawer, closeItemDrawer } = useItemDrawer();

  const handleOpenItemDrawer = ({
    item,
    categories,
    onSave,
    onDelete,
  }: Omit<ItemDrawerProps, "isOpen" | "onCancel" | "onClose">) => {
    openItemDrawer({
      item,
      categories,
      onSave: (input) => {
        onSave(input);
        closeItemDrawer();
      },
      onDelete:
        onDelete &&
        (() => {
          onDelete();
          closeItemDrawer();
        }),
      onCancel: closeItemDrawer,
      onClose: closeItemDrawer,
    });
  };

  const handleClickAddIncomeItem = () => {
    handleOpenItemDrawer({
      item: null,
      categories: incomeCategories,
      onSave: addIncome,
    });
  };

  const handleClickAddExpenseItem = () => {
    handleOpenItemDrawer({
      item: null,
      categories: expenseCategories,
      onSave: addExpense,
    });
  };

  const handleClickIncomeItem = (id: string) => {
    const item = incomes.find((income) => income.id === id);
    handleOpenItemDrawer({
      item,
      categories: incomeCategories,
      onSave: (input) => updateIncome(id, input),
      onDelete: () => deleteIncome(id),
    });
  };

  const handleClickExpenseItem = (id: string) => {
    const item = expenses.find((expense) => expense.id === id);
    handleOpenItemDrawer({
      item,
      categories: expenseCategories,
      onSave: (input) => updateExpense(id, input),
      onDelete: () => deleteExpense(id),
    });
  };

  const { categoryDrawerProps, openCategoryDrawer, closeCategoryDrawer } =
    useCategoryDrawer();

  const handleOpenCategoryDrawer = ({
    category,
    onSave,
    onDelete,
  }: Omit<CategoryDrawerProps, "isOpen" | "onCancel" | "onClose">) => {
    openCategoryDrawer({
      category,
      onSave: (name) => {
        onSave(name);
        closeCategoryDrawer();
      },
      onDelete:
        onDelete &&
        (() => {
          onDelete();
          closeCategoryDrawer();
        }),
      onCancel: closeCategoryDrawer,
      onClose: closeCategoryDrawer,
    });
  };

  const handleClickAddIncomeCategory = () => {
    if (isIncomeCategoryAtLimit) {
      addToast({
        title: "Limit reached",
        description: "You've reached the maximum number of income categories.",
        color: "warning",
      });
      return;
    }
    handleOpenCategoryDrawer({
      category: null,
      onSave: addIncomeCategory,
    });
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
    handleOpenCategoryDrawer({
      category: null,
      onSave: addExpenseCategory,
    });
  };

  const handleClickIncomeCategory = (categoryId: string) => {
    const category = incomeCategories.find((c) => c.id === categoryId);
    handleOpenCategoryDrawer({
      category: category,
      onSave: (name: string) => updateIncomeCategory(categoryId, name),
      onDelete: () => deleteIncomeCategory(categoryId),
    });
  };

  const handleClickExpenseCategory = (categoryId: string) => {
    const category = expenseCategories.find((c) => c.id === categoryId);
    handleOpenCategoryDrawer({
      category: category,
      onSave: (name: string) => updateExpenseCategory(categoryId, name),
      onDelete: () => deleteExpenseCategory(categoryId),
    });
  };

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
      <ItemDrawer {...itemDrawerProps} />
      <CategoryDrawer {...categoryDrawerProps} />
    </>
  );
}
