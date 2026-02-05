import { createBudget } from "core/budget";
import type { Budget } from "core/types";
import { useSectionState } from "./useSectionState";

export function useBudget(): Budget {
  const income = useSectionState("income");
  const expenses = useSectionState("expenses");

  return createBudget(income, expenses);
}
