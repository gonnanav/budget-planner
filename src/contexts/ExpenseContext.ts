import { createContext } from "react";
import { BudgetItem, BudgetItemInput } from "@/core/types";

type EnrichedBudgetItem = BudgetItem & { normalizedAmount: number };

export interface ExpenseContextValue {
  expenses: EnrichedBudgetItem[];
  addExpense: (input: BudgetItemInput) => void;
  updateExpense: (id: string, input: BudgetItemInput) => void;
  deleteExpense: (id: string) => void;
  addExpenses: (inputs: BudgetItemInput[]) => void;
  isExpenseAtLimit: boolean;
}

export const ExpenseContext = createContext<ExpenseContextValue>({
  expenses: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
  addExpenses: () => {},
  isExpenseAtLimit: false,
});
