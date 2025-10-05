import { createContext } from "react";
import { BudgetEntry, BudgetEntryInput } from "@/core/types";

export interface IncomeContextValue {
  incomes: BudgetEntry[];
  addIncome: (input: BudgetEntryInput) => void;
  updateIncome: (id: string, input: BudgetEntryInput) => void;
  deleteIncome: (id: string) => void;
  addIncomes: (inputs: BudgetEntryInput[]) => void;
}

export const IncomeContext = createContext<IncomeContextValue>({
  incomes: [],
  addIncome: () => {},
  updateIncome: () => {},
  deleteIncome: () => {},
  addIncomes: () => {},
});
