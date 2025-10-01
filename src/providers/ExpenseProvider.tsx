"use client";

import { ExpenseContext, ExpenseContextValue } from "@/contexts/ExpenseContext";
import { useExpenses } from "@/hooks/useExpenses";
import { BudgetEntry } from "@/budget/core/types";

interface ExpenseProviderProps {
  children: React.ReactNode;
  initialExpenses?: BudgetEntry[];
}

export function ExpenseProvider({
  children,
  initialExpenses,
}: ExpenseProviderProps) {
  const { expenses, addExpense, updateExpense, deleteExpense } =
    useExpenses(initialExpenses);

  const value: ExpenseContextValue = {
    expenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };

  return <ExpenseContext value={value}>{children}</ExpenseContext>;
}
