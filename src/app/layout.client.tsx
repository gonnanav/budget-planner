"use client";

import { useState, useContext } from "react";
import { addToast } from "@heroui/toast";
import { useDisclosure } from "@heroui/react";
import { AppLayout } from "@/components/app-layout";
import { ItemDrawer } from "@/components/item-drawer";
import { AppActionsContext } from "@/contexts/AppActionsContext";
import { CategoryDrawer } from "@/components/category-drawer";
import { IncomeContext } from "@/contexts/IncomeContext";
import { IncomeCategoryContext } from "@/contexts/IncomeCategoryContext";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { ExpenseCategoryContext } from "@/contexts/ExpenseCategoryContext";
import { BudgetItem, BudgetItemInput } from "@/core/types";
import { Category } from "@/core/types";

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

  const {
    isOpen: isItemDrawerOpen,
    onOpen: onItemDrawerOpen,
    onClose: onItemDrawerClose,
  } = useDisclosure();

  const [itemDrawerProps, setItemDrawerProps] = useState<{
    item: BudgetItem | null;
    categories: Category[];
    onSave: (input: BudgetItemInput) => void;
    onDelete?: () => void;
  }>({
    item: null,
    categories: [],
    onSave: () => {},
  });

  const handleClickAddIncomeItem = () => {
    onItemDrawerOpen();

    setItemDrawerProps({
      item: null,
      categories: incomeCategories,
      onSave: addIncome,
    });
  };

  const handleClickAddExpenseItem = () => {
    onItemDrawerOpen();

    setItemDrawerProps({
      item: null,
      categories: expenseCategories,
      onSave: addExpense,
    });
  };

  const handleClickIncomeItem = (id: string) => {
    const item = incomes.find((income) => income.id === id);
    onItemDrawerOpen();

    setItemDrawerProps({
      item: item ?? null,
      categories: incomeCategories,
      onSave: (input) => updateIncome(id, input),
      onDelete: () => deleteIncome(id),
    });
  };

  const handleClickExpenseItem = (id: string) => {
    const item = expenses.find((expense) => expense.id === id);
    onItemDrawerOpen();

    setItemDrawerProps({
      item: item ?? null,
      categories: expenseCategories,
      onSave: (input) => updateExpense(id, input),
      onDelete: () => deleteExpense(id),
    });
  };

  const {
    isOpen: isCategoryDrawerOpen,
    onOpen: onCategoryDrawerOpen,
    onClose: onCategoryDrawerClose,
  } = useDisclosure();
  const [categoryDrawerProps, setCategoryDrawerProps] = useState<{
    category: Category | null;
    onSave: (name: string, id?: string) => void;
    onDelete?: () => void;
  }>({
    category: null,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    onSave: (_name: string) => {},
  });

  const handleClickAddIncomeCategory = () => {
    if (isIncomeCategoryAtLimit) {
      addToast({
        title: "Limit reached",
        description: "You've reached the maximum number of income categories.",
        color: "warning",
      });
      return;
    }
    onCategoryDrawerOpen();

    setCategoryDrawerProps({
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
    onCategoryDrawerOpen();

    setCategoryDrawerProps({
      category: null,
      onSave: addExpenseCategory,
    });
  };

  const handleClickIncomeCategory = (categoryId: string) => {
    const category = incomeCategories.find((c) => c.id === categoryId);
    onCategoryDrawerOpen();

    setCategoryDrawerProps({
      category: category ?? null,
      onSave: (name) => updateIncomeCategory(categoryId, name),
      onDelete: () => deleteIncomeCategory(categoryId),
    });
  };

  const handleClickExpenseCategory = (categoryId: string) => {
    const category = expenseCategories.find((c) => c.id === categoryId);
    onCategoryDrawerOpen();

    setCategoryDrawerProps({
      category: category ?? null,
      onSave: (name) => updateExpenseCategory(categoryId, name),
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
      <ItemDrawer
        {...itemDrawerProps}
        isOpen={isItemDrawerOpen}
        onCancel={onItemDrawerClose}
        onClose={onItemDrawerClose}
      />
      <CategoryDrawer
        {...categoryDrawerProps}
        isOpen={isCategoryDrawerOpen}
        onCancel={onCategoryDrawerClose}
        onClose={onCategoryDrawerClose}
      />
    </>
  );
}
