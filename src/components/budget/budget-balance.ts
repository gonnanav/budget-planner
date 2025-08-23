import type { BudgetEntry, BudgetEvaluation, BudgetStatus } from "./types";

export function budgetBalance(
  incomes: BudgetEntry[],
  expenses: BudgetEntry[],
): BudgetEvaluation {
  const totalExpenses = budgetEntriesSum(expenses);
  const totalIncomes = budgetEntriesSum(incomes);
  const balance = totalIncomes - totalExpenses;

  let status: BudgetStatus = "balanced";
  if (balance > 0) {
    status = "positive";
  } else if (balance < 0) {
    status = "negative";
  }

  return {
    balance,
    status,
  };
}

function budgetEntriesSum(entries: BudgetEntry[]): number {
  return entries.reduce((sum: number, entry) => sum + (entry ?? 0), 0);
}
