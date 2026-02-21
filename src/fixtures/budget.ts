import { createBudget, createSectionState } from "domain/budget";
import { expenseCategories } from "./expense-categories";
import { expenseItems } from "./expenses";
import { incomeCategories } from "./income-categories";
import { incomeItems } from "./incomes";

export const emptyBudget = createBudget(
  createSectionState([], []),
  createSectionState([], []),
);

export const populatedBudget = createBudget(
  createSectionState(incomeItems, incomeCategories),
  createSectionState(expenseItems, expenseCategories),
);
