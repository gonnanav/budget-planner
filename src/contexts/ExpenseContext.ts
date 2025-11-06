import { createContext } from "react";
import { BudgetItem, Category } from "@/core/types";

type EnrichedBudgetItem = BudgetItem & { normalizedAmount: number };
type EnrichedCategory = Category & { amount: number };

export interface ExpenseContextValue {
  items: EnrichedBudgetItem[];
  categories: EnrichedCategory[];
}

export const ExpenseContext = createContext<ExpenseContextValue>({
  items: [],
  categories: [],
});
