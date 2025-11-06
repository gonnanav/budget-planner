"use client";

import { AppLayout } from "@/components/app-layout";
import { ItemDrawer } from "@/components/item-drawer";
import { AppActionsContext } from "@/contexts/AppActionsContext";
import {
  CategoryDrawer,
  useCategoryDrawer,
} from "@/components/category-drawer";
import { useIncomeCategories } from "@/hooks/useIncomeCategories";
import { useExpenseCategories } from "@/hooks/useExpenseCategories";
import { useItemDrawer } from "@/components/item-drawer";
import { useIncomes } from "@/hooks/useIncomes";
import { useExpenses } from "@/hooks/useExpenses";
import { Providers } from "@/providers";
import { itemActions } from "@/lib/item-actions";
import { categoryActions } from "@/lib/category-actions";

interface RootLayoutClientProps {
  children: React.ReactNode;
}

export function RootLayoutClient({ children }: RootLayoutClientProps) {
  const incomesValue = useIncomes();
  const { incomes, addIncome, updateIncome, deleteIncome } = incomesValue;

  const expensesValue = useExpenses();
  const { expenses, addExpense, updateExpense, deleteExpense } = expensesValue;
  const incomeCategoriesValue = useIncomeCategories(incomes);
  const {
    incomeCategories,
    addIncomeCategory,
    updateIncomeCategory,
    deleteIncomeCategory,
    isIncomeCategoryAtLimit,
  } = incomeCategoriesValue;
  const expenseCategoriesValue = useExpenseCategories(expenses);
  const {
    expenseCategories,
    addExpenseCategory,
    updateExpenseCategory,
    deleteExpenseCategory,
    isExpenseCategoryAtLimit,
  } = expenseCategoriesValue;

  const { itemDrawerProps, openItemDrawer, closeItemDrawer } = useItemDrawer();
  const {
    onClickAddItem: onClickAddIncomeItem,
    onClickItem: onClickIncomeItem,
  } = itemActions({
    items: incomes,
    categories: incomeCategories,
    onAddItem: addIncome,
    onUpdateItem: updateIncome,
    onDeleteItem: deleteIncome,
    onOpenItemDrawer: openItemDrawer,
    onCloseItemDrawer: closeItemDrawer,
  });

  const {
    onClickAddItem: onClickAddExpenseItem,
    onClickItem: onClickExpenseItem,
  } = itemActions({
    items: expenses,
    categories: expenseCategories,
    onAddItem: addExpense,
    onUpdateItem: updateExpense,
    onDeleteItem: deleteExpense,
    onOpenItemDrawer: openItemDrawer,
    onCloseItemDrawer: closeItemDrawer,
  });

  const { categoryDrawerProps, openCategoryDrawer, closeCategoryDrawer } =
    useCategoryDrawer();
  const {
    onClickAddCategory: onClickAddIncomeCategory,
    onClickCategory: onClickIncomeCategory,
  } = categoryActions({
    categories: incomeCategories,
    isAtLimit: isIncomeCategoryAtLimit,
    onAddCategory: addIncomeCategory,
    onUpdateCategory: updateIncomeCategory,
    onDeleteCategory: deleteIncomeCategory,
    onOpenCategoryDrawer: openCategoryDrawer,
    onCloseCategoryDrawer: closeCategoryDrawer,
  });

  const {
    onClickAddCategory: onClickAddExpenseCategory,
    onClickCategory: onClickExpenseCategory,
  } = categoryActions({
    categories: expenseCategories,
    isAtLimit: isExpenseCategoryAtLimit,
    onAddCategory: addExpenseCategory,
    onUpdateCategory: updateExpenseCategory,
    onDeleteCategory: deleteExpenseCategory,
    onOpenCategoryDrawer: openCategoryDrawer,
    onCloseCategoryDrawer: closeCategoryDrawer,
  });

  return (
    <Providers
      incomes={incomesValue}
      expenses={expensesValue}
      incomeCategories={incomeCategoriesValue}
      expenseCategories={expenseCategoriesValue}
    >
      <AppLayout>
        <AppActionsContext
          value={{
            onClickAddIncomeItem,
            onClickAddExpenseItem,
            onClickIncomeItem,
            onClickExpenseItem,
            onClickAddIncomeCategory,
            onClickAddExpenseCategory,
            onClickIncomeCategory,
            onClickExpenseCategory,
          }}
        >
          {children}
        </AppActionsContext>
      </AppLayout>
      <ItemDrawer {...itemDrawerProps} />
      <CategoryDrawer {...categoryDrawerProps} />
    </Providers>
  );
}
