import type { Budget, Loadable, SectionState, Balance } from "./types";
import { calculateBalance } from "./balance";

export function createBudget(
  income: Loadable<SectionState>,
  expenses: Loadable<SectionState>,
): Budget {
  const balance: Loadable<Balance> =
    income.status === "ready" && expenses.status === "ready"
      ? (() => {
          const balanceData = calculateBalance(
            income.data.items,
            expenses.data.items,
          );

          return {
            status: "ready",
            data: {
              status: balanceData.status,
              delta: balanceData.balance,
            },
          };
        })()
      : income.status === "error"
        ? income
        : expenses.status === "error"
          ? expenses
          : { status: "loading" };

  return {
    income,
    expenses,
    balance,
  };
}
