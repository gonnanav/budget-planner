import { createBudget } from "domain/budget";
import type { Budget } from "domain/types";
import { useSectionState } from "./useSectionState";

export function useBudget(): Budget {
  const income = useSectionState("income");
  const expenses = useSectionState("expenses");

  return createBudget(income, expenses);
}
