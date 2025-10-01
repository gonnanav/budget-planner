"use client";

import { IncomeContext, IncomeContextValue } from "@/contexts/IncomeContext";
import { useIncomes } from "@/hooks/useIncomes";
import { BudgetEntry } from "@/budget/core/types";

interface IncomeProviderProps {
  children: React.ReactNode;
  initialIncomes?: BudgetEntry[];
}

export function IncomeProvider({
  children,
  initialIncomes,
}: IncomeProviderProps) {
  const { incomes, addIncome, updateIncome, deleteIncome } =
    useIncomes(initialIncomes);

  const value: IncomeContextValue = {
    incomes,
    addIncome,
    updateIncome,
    deleteIncome,
  };

  return <IncomeContext value={value}>{children}</IncomeContext>;
}
