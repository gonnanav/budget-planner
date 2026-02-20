import type { Budget, SectionState } from "../types";
import { calculateBalance } from "../balance";

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
