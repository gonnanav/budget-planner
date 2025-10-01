import { createContext } from "react";
import { BudgetEntry, BudgetEntryInput } from "@/budget/core/types";

export interface IncomeContextValue {
  incomes: BudgetEntry[];
  addIncome: (input: BudgetEntryInput) => void;
  updateIncome: (index: number, input: BudgetEntryInput) => void;
  deleteIncome: (index: number) => void;
}

export const IncomeContext = createContext<IncomeContextValue>({
  incomes: [],
  addIncome: () => {},
  updateIncome: () => {},
  deleteIncome: () => {},
});
