import { createContext } from "react";
import { BudgetItem, BudgetItemInput } from "@/core/types";

export interface ExpenseContextValue {
  expenses: BudgetItem[];
  addExpense: (input: BudgetItemInput) => void;
  updateExpense: (id: string, input: BudgetItemInput) => void;
  deleteExpense: (id: string) => void;
  addExpenses: (inputs: BudgetItemInput[]) => void;
}

export const ExpenseContext = createContext<ExpenseContextValue>({
  expenses: [],
  addExpense: () => {},
  updateExpense: () => {},
  deleteExpense: () => {},
  addExpenses: () => {},
});
