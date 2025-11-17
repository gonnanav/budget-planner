import { createContext } from "react";
import { BudgetItem } from "@/core/types";

type EnrichedBudgetItem = BudgetItem & { normalizedAmount: number };

export interface ExpenseContextValue {
  items: EnrichedBudgetItem[];
}

export const ExpenseContext = createContext<ExpenseContextValue>({
  items: [],
});
