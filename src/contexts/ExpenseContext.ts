import { createContext } from "react";
import { BudgetEntry, BudgetEntryInput } from "@/core/types";

export interface ExpenseContextValue {
  expenses: BudgetEntry[];
  addExpense: (input: BudgetEntryInput) => void;
  updateExpense: (index: number, input: BudgetEntryInput) => void;
  deleteExpense: (index: number) => void;
}

export const ExpenseContext = createContext<ExpenseContextValue>({
  expenses: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
});
