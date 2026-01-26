import type { BudgetState, SectionState } from "./types";
import { calculateBalance } from "./balance";

export function createBudgetState(
  income: SectionState,
  expenses: SectionState
): BudgetState {
  const isLoading = income.items.isLoading || expenses.items.isLoading;
  const balanceData = !isLoading
    ? calculateBalance(income.items.data, expenses.items.data)
    : null;

  return {
    income,
    expenses,
    balance: {
      data: balanceData
        ? { status: balanceData.status, delta: balanceData.balance }
        : { status: "balanced", delta: 0 },
      isLoading,
    },
  };
}
