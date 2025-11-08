import { createContext } from "react";
import { BudgetItem, Category } from "@/core/types";

type EnrichedBudgetItem = BudgetItem & { normalizedAmount: number };
type EnrichedCategory = Category & { amount: number };

export interface ExpenseContextValue {
  items: EnrichedBudgetItem[];
  categories: EnrichedCategory[];
  onClickAddExpenseItem: () => void;
  onClickExpenseItem: (id: string) => void;
  onClickAddExpenseCategory: () => void;
  onClickExpenseCategory: (categoryId: string) => void;
}

export const ExpenseContext = createContext<ExpenseContextValue>({
  items: [],
  categories: [],
  onClickAddExpenseItem: () => {},
  onClickExpenseItem: () => {},
  onClickAddExpenseCategory: () => {},
  onClickExpenseCategory: () => {},
});
