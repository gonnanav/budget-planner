import { createContext } from "react";
import { BudgetItem, Category } from "@/core/types";

type EnrichedBudgetItem = BudgetItem & { normalizedAmount: number };
type EnrichedCategory = Category & { amount: number };

export interface IncomeContextValue {
  items: EnrichedBudgetItem[];
  categories: EnrichedCategory[];
}

export const IncomeContext = createContext<IncomeContextValue>({
  items: [],
  categories: [],
});
