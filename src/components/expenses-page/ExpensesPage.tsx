"use client";

import { useContext } from "react";
import { useDisclosure } from "@heroui/use-disclosure";
import { ExpenseContext } from "@/contexts/ExpenseContext";
import { ExpenseCategoryContext } from "@/contexts/ExpenseCategoryContext";
import { BudgetSection } from "@/components/budget-section";
import { CategoriesDrawer } from "@/components/categories-drawer";

export function ExpensesPage() {
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useContext(ExpenseContext);
  const {
    expenseCategories,
    addExpenseCategory,
    updateExpenseCategory,
    deleteExpenseCategory,
  } = useContext(ExpenseCategoryContext);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <BudgetSection
        entries={expenses}
        categories={expenseCategories}
        title="Expenses"
        itemLabel="Expense"
        addItemButtonLabel="Add expense"
        onAddEntry={addExpense}
        onUpdateEntry={updateExpense}
        onDeleteEntry={deleteExpense}
        onClickCategories={onOpen}
      />
      <CategoriesDrawer
        isOpen={isOpen}
        onClose={onClose}
        categories={expenseCategories}
        isLoading={expenseCategories === null}
        onAddCategory={addExpenseCategory}
        onChangeCategory={updateExpenseCategory}
        onDeleteCategory={deleteExpenseCategory}
      />
    </>
  );
}
