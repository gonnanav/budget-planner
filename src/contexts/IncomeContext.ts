import { createContext } from "react";
import { BudgetItem, BudgetItemInput } from "@/core/types";

type EnrichedBudgetItem = BudgetItem & { normalizedAmount: number };

export interface IncomeContextValue {
  incomes: EnrichedBudgetItem[];
  addIncome: (input: BudgetItemInput) => void;
  updateIncome: (id: string, input: BudgetItemInput) => void;
  deleteIncome: (id: string) => void;
  addIncomes: (inputs: BudgetItemInput[]) => void;
  isIncomeAtLimit: boolean;
}

export const IncomeContext = createContext<IncomeContextValue>({
  incomes: [],
  addIncome: () => {},
  updateIncome: () => {},
  deleteIncome: () => {},
  addIncomes: () => {},
  isIncomeAtLimit: false,
});
