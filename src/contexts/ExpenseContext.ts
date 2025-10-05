import { createContext } from "react";
import { BudgetEntry, BudgetEntryInput } from "@/core/types";

export interface ExpenseContextValue {
  expenses: BudgetEntry[];
  addExpense: (input: BudgetEntryInput) => void;
  updateExpense: (id: string, input: BudgetEntryInput) => void;
  deleteExpense: (id: string) => void;
  addExpenses: (inputs: BudgetEntryInput[]) => void;
}

export const ExpenseContext = createContext<ExpenseContextValue>({
  expenses: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
  addExpenses: () => {},
});
