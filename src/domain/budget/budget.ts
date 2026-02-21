import type { Budget, Category, Item, SectionState } from "domain/types";
import { calculateBalance } from "domain/balance";
import { createCategorySummary } from "domain/categories";
import { sumItems } from "domain/items";

export function createSectionState(
  items: Item[],
  categories: Category[],
): SectionState {
  return {
    items,
    categories: categories.map((c) => createCategorySummary(c, items)),
    sum: sumItems(items),
  };
}

export function createBudget(
  income: SectionState,
  expenses: SectionState,
): Budget {
  const balanceData = calculateBalance(income.items, expenses.items);

  return {
    income,
    expenses,
    balance: {
      status: balanceData.status,
      delta: balanceData.balance,
    },
  };
}
