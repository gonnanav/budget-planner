import { createContext } from "react";
import { BudgetItem, BudgetItemInput } from "@/core/types";

export interface IncomeContextValue {
  incomes: BudgetItem[];
  addIncome: (input: BudgetItemInput) => void;
  updateIncome: (id: string, input: BudgetItemInput) => void;
  deleteIncome: (id: string) => void;
  addIncomes: (inputs: BudgetItemInput[]) => void;
}

export const IncomeContext = createContext<IncomeContextValue>({
  incomes: [],
  addIncome: () => {},
  updateIncome: () => {},
  deleteIncome: () => {},
  addIncomes: () => {},
});
