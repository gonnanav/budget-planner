import { createContext } from "react";
import { BudgetItem } from "@/core/types";

type EnrichedBudgetItem = BudgetItem & { normalizedAmount: number };

export interface IncomeContextValue {
  items: EnrichedBudgetItem[];
}

export const IncomeContext = createContext<IncomeContextValue>({
  items: [],
});
