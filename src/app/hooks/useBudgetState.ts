import { createBudgetState } from "core/budget";
import type { BudgetState } from "core/types";
import { useSectionState } from "./useSectionState";

export function useBudgetState(): BudgetState {
  const income = useSectionState("income");
  const expenses = useSectionState("expenses");
  return createBudgetState(income, expenses);
}
