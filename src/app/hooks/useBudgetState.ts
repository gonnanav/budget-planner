import { createBudgetState } from "core/budget";
import type { BudgetState } from "core/types";
import { useSectionData } from "./useSectionData";

export function useBudgetState(): BudgetState {
  const income = useSectionData("income");
  const expenses = useSectionData("expenses");

  return createBudgetState(income, expenses);
}
