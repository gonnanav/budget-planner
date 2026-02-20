import { createBudget } from "domain/budget";
import { createCategorySummary } from "domain/categories";
import { sumItems } from "domain/items";
import type { SectionState } from "domain/types";
import { expenseCategories } from "./expense-categories";
import { expenseItems } from "./expenses";
import { incomeCategories } from "./income-categories";
import { incomeItems } from "./incomes";

const emptySectionState: SectionState = { items: [], categories: [], sum: 0 };

export const emptyBudget = createBudget(emptySectionState, emptySectionState);

const incomeSectionState: SectionState = {
  items: incomeItems,
  categories: incomeCategories.map((c) => createCategorySummary(c, incomeItems)),
  sum: sumItems(incomeItems),
};

const expenseSectionState: SectionState = {
  items: expenseItems,
  categories: expenseCategories.map((c) => createCategorySummary(c, expenseItems)),
  sum: sumItems(expenseItems),
};

export const populatedBudget = createBudget(incomeSectionState, expenseSectionState);
